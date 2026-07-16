/* ============================================================
   Structured Liquidity — shadcn registry generator.

   Emits a shadcn-compatible registry from source so the design
   language is installable with `npx shadcn@latest add <url>`:

     public/registry.json        — the registry index (shadcn schema)
     public/r/structured-liquidity.json — base style item: the SL
                                   tokens (cssVars) + the three
                                   distributable stylesheets + kit JS
     public/r/<component>.json   — one registry:ui item per
                                   src/components/ui/*.tsx, with npm
                                   deps + internal registryDependencies
                                   resolved from its imports

   No network or shadcn CLI dependency — pure Node. Run via
   `pnpm --filter @workspace/structured-liquidity run registry`.

   The base URL used for cross-item registryDependencies is taken
   from REGISTRY_BASE_URL (falls back to the canonical published
   domain). The in-page Install button copies a command built from
   window.location.origin, so the copied command always matches
   wherever the registry is being served.
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const UI_DIR = join(ROOT, "src/components/ui");
const PUBLIC = join(ROOT, "public");
/* Where the registry index + r/ items are written. Defaults to public/;
   the drift check (check-registry.mjs) overrides it with a temp dir via
   REGISTRY_OUT_DIR so it can regenerate without mutating committed files.
   Source stylesheets are always read from public/. */
const WRITE_DIR = process.env.REGISTRY_OUT_DIR || PUBLIC;
const OUT_DIR = join(WRITE_DIR, "r");

const BASE_URL = (process.env.REGISTRY_BASE_URL || "https://structured.glass").replace(/\/+$/, "");
const itemUrl = (name) => `${BASE_URL}/r/${name}.json`;

const BASE_NAME = "structured-liquidity";
const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const REG_SCHEMA = "https://ui.shadcn.com/schema/registry.json";

/* ---- helpers ---------------------------------------------------------- */

const titleCase = (s) =>
  s
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOtp\b/, "OTP")
    .replace(/\bAi\b/, "AI");

/* bare npm package name from an import specifier */
const pkgName = (spec) => {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
  return spec.split("/")[0];
};

/* peers a consumer already has via their shadcn/React setup */
const PEERS = new Set(["react", "react-dom", "react/jsx-runtime"]);

/* parse a .tsx for its import specifiers */
const importsOf = (src) => {
  const specs = new Set();
  const re = /\bfrom\s+["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) specs.add(m[1]);
  // side-effect imports: import "x"
  const re2 = /\bimport\s+["']([^"']+)["']/g;
  while ((m = re2.exec(src))) specs.add(m[1]);
  return [...specs];
};

/* ---- build per-component registry:ui items ---------------------------- */

const files = readdirSync(UI_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

const componentNames = new Set(files.map((f) => basename(f, ".tsx")));
const items = [];
const uiItems = [];

for (const file of files) {
  const name = basename(file, ".tsx");
  const content = readFileSync(join(UI_DIR, file), "utf8");
  const specs = importsOf(content);

  const dependencies = new Set();
  const registryDependencies = new Set([itemUrl(BASE_NAME)]);

  for (const spec of specs) {
    if (spec.startsWith("@/components/ui/")) {
      const dep = spec.slice("@/components/ui/".length).split("/")[0];
      if (componentNames.has(dep) && dep !== name) registryDependencies.add(itemUrl(dep));
    } else if (spec.startsWith("@/lib/utils")) {
      registryDependencies.add("utils");
    } else if (spec.startsWith("@/") || spec.startsWith(".")) {
      // other internal module — skip (its file ships with this item if local)
      continue;
    } else {
      const pkg = pkgName(spec);
      if (!PEERS.has(spec) && !PEERS.has(pkg)) dependencies.add(pkg);
    }
  }

  const item = {
    $schema: ITEM_SCHEMA,
    name,
    type: "registry:ui",
    title: titleCase(name),
    description: `Structured Liquidity ${titleCase(name)} — React component driving the SL class system.`,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files: [
      {
        path: `registry/ui/${file}`,
        content,
        type: "registry:ui",
        target: `components/ui/${file}`,
      },
    ],
  };
  if (!item.dependencies.length) delete item.dependencies;

  uiItems.push({ name, item });
  items.push({
    name,
    type: "registry:ui",
    title: item.title,
    description: item.description,
  });
}

/* ---- build the base style item --------------------------------------- */

const CSS_FILES = [
  "structured-liquidity.css",
  "structured-liquidity-components.css",
  "structured-liquidity-kit.css",
];
const JS_FILES = ["structured-liquidity-kit.js"];

const cssVars = {
  theme: {
    "accent": "#a388ee",
    "accent-ink": "#000000",
    "bg": "#272933",
    "bg-2": "#1f2028",
    "ink": "#e6e6e6",
    "ink-dim": "#9da0ab",
    "edge": "0 0 0",
    "hard-shadow": "#000000",
    "neg": "#3c3f4b",
    "neg-ink": "#f0f0f2",
    "glass-blur": "18px",
    "glass-tint": "255 255 255",
    "glass-alpha": "0.07",
    "border-w": "2px",
    "hard-x": "7px",
    "hard-y": "7px",
    "radius": "0px",
    "display": '"Archivo","Helvetica Neue",system-ui,sans-serif',
    "body": '"Outfit","Helvetica Neue",system-ui,sans-serif',
    "mono": '"Space Mono",ui-monospace,"SFMono-Regular",monospace',
  },
};

const baseFiles = [
  ...CSS_FILES.map((f) => ({
    path: `registry/styles/${f}`,
    content: readFileSync(join(PUBLIC, f), "utf8"),
    type: "registry:file",
    target: `styles/${f}`,
  })),
  ...JS_FILES.map((f) => ({
    path: `registry/styles/${f}`,
    content: readFileSync(join(PUBLIC, f), "utf8"),
    type: "registry:file",
    target: `styles/${f}`,
  })),
];

const baseItem = {
  $schema: ITEM_SCHEMA,
  name: BASE_NAME,
  type: "registry:style",
  title: "Structured Liquidity",
  description:
    "The Structured Liquidity design language base: theme tokens plus the three distributable stylesheets and the kit interaction script. Install this first — every component depends on it.",
  dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react"],
  registryDependencies: ["utils"],
  cssVars,
  files: baseFiles,
};

/* ---- write everything ------------------------------------------------- */

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

writeFileSync(join(OUT_DIR, `${BASE_NAME}.json`), JSON.stringify(baseItem, null, 2) + "\n");
for (const { name, item } of uiItems) {
  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(item, null, 2) + "\n");
}

const registry = {
  $schema: REG_SCHEMA,
  name: BASE_NAME,
  homepage: BASE_URL,
  items: [
    {
      name: BASE_NAME,
      type: "registry:style",
      title: baseItem.title,
      description: baseItem.description,
    },
    ...items,
  ],
};
writeFileSync(join(WRITE_DIR, "registry.json"), JSON.stringify(registry, null, 2) + "\n");

console.log(
  `registry: wrote ${uiItems.length + 1} items to public/r/ + public/registry.json (base ${BASE_URL})`,
);
