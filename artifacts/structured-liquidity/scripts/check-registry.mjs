/* ============================================================
   Structured Liquidity — registry validation check.

   Guards the published shadcn registry (public/registry.json +
   public/r/*.json) against two failure modes:

     1. DRIFT — a component's imports changed but the generator
        was not rerun, so the committed registry no longer matches
        source. We regenerate into a temp dir and diff; any
        difference fails (run `pnpm run registry` to fix).

     2. SCHEMA — an emitted file does not conform to the shadcn
        registry-item / registry schemas, so `npx shadcn add`
        could break. We validate every committed file against the
        vendored schemas (scripts/schemas/*.schema.json) with ajv.

   Pure Node + ajv, no network. Run via
   `pnpm --filter @workspace/structured-liquidity run registry:check`.
   ============================================================ */
import { readFileSync, readdirSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import Ajv from "ajv";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PUBLIC = join(ROOT, "public");
const SCHEMA_DIR = join(HERE, "schemas");

const ITEM_SCHEMA_URL = "https://ui.shadcn.com/schema/registry-item.json";

const errors = [];
const fail = (msg) => errors.push(msg);

/* ---- 1. drift detection ---------------------------------------------- */

const tmp = mkdtempSync(join(tmpdir(), "sl-registry-"));
try {
  const res = spawnSync(process.execPath, [join(HERE, "build-registry.mjs")], {
    cwd: ROOT,
    env: { ...process.env, REGISTRY_OUT_DIR: tmp },
    encoding: "utf8",
  });
  if (res.status !== 0) {
    fail(`generator failed (exit ${res.status}):\n${res.stderr || res.stdout}`);
  } else {
    // Compare the freshly generated tree (tmp) against the committed tree (public).
    const rel = (dir) => {
      const out = [];
      const idx = join(dir, "registry.json");
      if (existsSync(idx)) out.push("registry.json");
      const rDir = join(dir, "r");
      if (existsSync(rDir)) {
        for (const f of readdirSync(rDir).filter((f) => f.endsWith(".json"))) {
          out.push(join("r", f));
        }
      }
      return out;
    };
    const committed = new Set(rel(PUBLIC));
    const fresh = new Set(rel(tmp));

    for (const f of fresh) {
      if (!committed.has(f)) {
        fail(`drift: ${f} would be added by the generator but is not committed`);
        continue;
      }
      const a = readFileSync(join(PUBLIC, f), "utf8");
      const b = readFileSync(join(tmp, f), "utf8");
      if (a !== b) fail(`drift: ${f} is stale (differs from generator output)`);
    }
    for (const f of committed) {
      if (!fresh.has(f)) {
        fail(`drift: ${f} is committed but the generator no longer emits it`);
      }
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

/* ---- 2. schema validation -------------------------------------------- */

// validateSchema:false — the vendored schemas declare draft-07, whose
// meta-schema ajv v8 does not register by default; we only need to compile
// and run them, not meta-validate them.
const ajv = new Ajv({ strict: false, allErrors: true, validateSchema: false });
const loadSchema = (file) => {
  const s = JSON.parse(readFileSync(join(SCHEMA_DIR, file), "utf8"));
  delete s.$schema;
  return s;
};
const itemSchema = loadSchema("registry-item.schema.json");
const registrySchema = loadSchema("registry.schema.json");

// The registry schema $refs the item schema by its canonical URL; register it.
ajv.addSchema(itemSchema, ITEM_SCHEMA_URL);
const validateItem = ajv.compile(itemSchema);
const validateRegistry = ajv.compile(registrySchema);

const fmt = (validate) =>
  (validate.errors || [])
    .map((e) => `${e.instancePath || "/"} ${e.message}`)
    .join("; ");

// registry index
const indexPath = join(PUBLIC, "registry.json");
if (!existsSync(indexPath)) {
  fail("schema: public/registry.json is missing");
} else {
  const index = JSON.parse(readFileSync(indexPath, "utf8"));
  if (!validateRegistry(index)) fail(`schema: registry.json — ${fmt(validateRegistry)}`);
}

// every item under r/
const rDir = join(PUBLIC, "r");
if (!existsSync(rDir)) {
  fail("schema: public/r/ is missing");
} else {
  for (const f of readdirSync(rDir).filter((f) => f.endsWith(".json")).sort()) {
    const item = JSON.parse(readFileSync(join(rDir, f), "utf8"));
    if (!validateItem(item)) fail(`schema: r/${f} — ${fmt(validateItem)}`);
  }
}

/* ---- report ---------------------------------------------------------- */

if (errors.length) {
  console.error(`registry check FAILED (${errors.length} problem(s)):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error(`\nFix drift with: pnpm --filter @workspace/structured-liquidity run registry`);
  process.exit(1);
}

const itemCount = readdirSync(rDir).filter((f) => f.endsWith(".json")).length;
console.log(`registry check OK — index + ${itemCount} items match source and validate against the shadcn schemas`);
