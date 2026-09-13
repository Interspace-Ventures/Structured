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
     public/r/<template>.json    — one registry:block item per
                                   src/components/templates/*.tsx

   No network or shadcn CLI dependency — pure Node. Run via
   `pnpm --filter @workspace/structured-liquidity run registry`.

   The base URL used for cross-item registryDependencies is taken
   from REGISTRY_BASE_URL (falls back to the canonical published
   domain). The in-page Install button copies a command built from
   window.location.origin, so the copied command always matches
   wherever the registry is being served.
   ============================================================ */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const REPO_ROOT = join(ROOT, "..", "..");
const UI_DIR = join(ROOT, "src/components/ui");
const TEMPLATE_DIR = join(ROOT, "src/components/templates");
const PUBLIC = join(ROOT, "public");
/* Where the registry index + r/ items are written. Defaults to public/;
   the drift check (check-registry.mjs) overrides it with a temp dir via
   REGISTRY_OUT_DIR so it can regenerate without mutating committed files.
   Source stylesheets are always read from public/. */
const WRITE_DIR = process.env.REGISTRY_OUT_DIR || PUBLIC;
const OUT_DIR = join(WRITE_DIR, "r");

const BASE_URL = (
  process.env.REGISTRY_BASE_URL || "https://structured.glass"
).replace(/\/+$/, "");
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
      if (componentNames.has(dep) && dep !== name)
        registryDependencies.add(itemUrl(dep));
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

/* ---- build reusable registry:block templates ------------------------- */

const templateFiles = readdirSync(TEMPLATE_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .sort();
const templateItems = [];

for (const file of templateFiles) {
  const name = basename(file, ".tsx");
  const content = readFileSync(join(TEMPLATE_DIR, file), "utf8");
  const specs = importsOf(content);
  const dependencies = new Set();
  const registryDependencies = new Set([itemUrl(BASE_NAME)]);

  for (const spec of specs) {
    if (spec.startsWith("@/components/ui/")) {
      const dep = spec.slice("@/components/ui/".length).split("/")[0];
      if (componentNames.has(dep)) registryDependencies.add(itemUrl(dep));
    } else if (spec.startsWith("@/lib/utils")) {
      registryDependencies.add("utils");
    } else if (spec.startsWith("@/") || spec.startsWith(".")) {
      continue;
    } else {
      const pkg = pkgName(spec);
      if (!PEERS.has(spec) && !PEERS.has(pkg)) dependencies.add(pkg);
    }
  }

  const item = {
    $schema: ITEM_SCHEMA,
    name,
    type: "registry:block",
    title: titleCase(name),
    description: `Structured Liquidity ${titleCase(name)} — production-tested page structures composed from registry primitives.`,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files: [
      {
        path: `registry/templates/${file}`,
        content,
        type: "registry:block",
        target: `components/templates/${file}`,
      },
    ],
  };
  if (!item.dependencies.length) delete item.dependencies;

  templateItems.push({ name, item });
  items.push({
    name,
    type: "registry:block",
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
    accent: "#a388ee",
    "accent-ink": "#000000",
    bg: "#f2f0ea",
    "bg-2": "#ffffff",
    ink: "#111111",
    "ink-dim": "#5d5d59",
    edge: "0 0 0",
    "hard-shadow": "#000000",
    neg: "#242424",
    "neg-ink": "#ffffff",
    "glass-blur": "14px",
    "glass-tint": "255 255 255",
    "glass-alpha": "0.72",
    "border-w": "2px",
    "hard-x": "5px",
    "hard-y": "5px",
    radius: "0px",
    display: '"Inter","Helvetica Neue",Arial,system-ui,sans-serif',
    body: '"Inter","Helvetica Neue",Arial,system-ui,sans-serif',
    mono: '"Space Mono","SFMono-Regular",ui-monospace,monospace',
    "text-display-xl": "clamp(4.2rem, 10.5vw, 9.5rem)",
    "text-display-lg": "clamp(2.6rem, 5.5vw, 5.25rem)",
    "measure-reading": "62ch",
    "measure-caption": "48ch",
    "grid-gutter": "clamp(1rem, 2.5vw, 2.5rem)",
    "section-space": "clamp(4rem, 9vw, 9rem)",
    "clarity-gap": "clamp(1.25rem, 3vw, 3rem)",
    "rule-hairline": "1px",
    "ease-liquid": "cubic-bezier(.22,1,.36,1)",
    "ease-liquid-over": "cubic-bezier(.34,1.4,.5,1)",
    "motion-fast": "160ms",
    motion: "340ms",
    "motion-slow": "500ms",
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
    "The Structured Liquidity design language base: Neobrutalist structure, Liquid Motion, and Scientific Modern Clarity. Includes theme tokens, three distributable stylesheets, and the kit interaction script. Install this first — every component depends on it.",
  dependencies: [
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
    "lucide-react",
  ],
  registryDependencies: ["utils"],
  cssVars,
  files: baseFiles,
};

const agentItem = {
  $schema: ITEM_SCHEMA,
  name: "structured-liquidity-agent",
  type: "registry:item",
  title: "Structured Liquidity Agent Bundle",
  description:
    "Install the Neobrutalist structure, Liquid Motion, and Scientific Modern Clarity language plus its persistent local agent skill before the first UI edit.",
  registryDependencies: [itemUrl(BASE_NAME)],
  files: [
    {
      path: "registry/rules/structured-liquidity/SKILL.md",
      content: readFileSync(
        join(
          REPO_ROOT,
          ".agents",
          "skills",
          "structured-liquidity",
          "SKILL.md",
        ),
        "utf8",
      ),
      type: "registry:file",
      target: ".agents/skills/structured-liquidity/SKILL.md",
    },
  ],
};

/* ---- write everything ------------------------------------------------- */

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

writeFileSync(
  join(OUT_DIR, `${BASE_NAME}.json`),
  JSON.stringify(baseItem, null, 2) + "\n",
);
writeFileSync(
  join(OUT_DIR, `${agentItem.name}.json`),
  JSON.stringify(agentItem, null, 2) + "\n",
);
for (const { name, item } of uiItems) {
  writeFileSync(
    join(OUT_DIR, `${name}.json`),
    JSON.stringify(item, null, 2) + "\n",
  );
}
for (const { name, item } of templateItems) {
  writeFileSync(
    join(OUT_DIR, `${name}.json`),
    JSON.stringify(item, null, 2) + "\n",
  );
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
    {
      name: agentItem.name,
      type: agentItem.type,
      title: agentItem.title,
      description: agentItem.description,
    },
    ...items,
  ],
};
writeFileSync(
  join(WRITE_DIR, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
);

console.log(
  `registry: wrote ${uiItems.length + templateItems.length + 2} items to public/r/ + public/registry.json (base ${BASE_URL})`,
);
