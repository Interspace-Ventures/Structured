import assert from "node:assert/strict";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(fileURLToPath(new URL("../", import.meta.url)));
const configPath = resolve(packageRoot, "visual-vocabulary.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const baselinePath = resolve(packageRoot, config.baseline);

const normalize = (value) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s*!important$/, "");
const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(child)));
    else if (config.extensions.includes(extname(entry.name))) files.push(child);
  }
  return files;
}

const tokenSource = await readFile(
  resolve(packageRoot, config.tokenSource),
  "utf8",
);
for (const [token, value] of Object.entries({
  ...config.typeSizes,
  ...config.fontWeights,
})) {
  const declaration = new RegExp(
    `${escapePattern(token)}\\s*:\\s*${escapePattern(value)}\\s*;`,
    "i",
  );
  assert.match(
    tokenSource,
    declaration,
    `Missing visual-vocabulary token ${token}: ${value}`,
  );
}
for (const [token, family] of Object.entries(config.typefaceRoles)) {
  const declaration = new RegExp(
    `${escapePattern(token)}\\s*:\\s*([^;]+);`,
    "i",
  ).exec(tokenSource);
  assert(declaration, `Missing visual-vocabulary typeface role ${token}`);
  assert.match(
    declaration[1],
    new RegExp(escapePattern(family), "i"),
    `${token} must resolve to ${family}`,
  );
}
for (const token of config.colorRoles) {
  assert.match(
    tokenSource,
    new RegExp(`${escapePattern(token)}\\s*:`, "i"),
    `Missing semantic color role ${token}`,
  );
}
assert(
  new Set(
    Object.values(config.typefaceRoles).map((family) => family.toLowerCase()),
  ).size <= config.maxTypefaceFamilies,
  `Visual vocabulary exceeds ${config.maxTypefaceFamilies} actual typefaces`,
);

const declarations =
  /(^|[;{])\s*(--[\w-]+|font|font-family|font-size|font-weight|color|background(?:-color)?|border(?:-(?:top|right|bottom|left))?-color|outline-color|fill|stroke)\s*:\s*([^;{}]+)/gim;
const literalColor =
  /#[0-9a-f]{3,8}\b|(?:rgb|hsl)a?\([^)]*\)|(?:oklch|lab|lch)\([^)]*\)|\b(?:black|white|red|orange|yellow|green|blue|purple|pink|gray|grey)\b/gi;
const allowedFamilyVars = Object.keys(config.typefaceRoles)
  .map((token) => `var(${token}`)
  .concat(config.additionalTypefaceVariables ?? []);
const findings = {};
const add = (file, kind, value) => {
  const key = `${file}::${kind}::${normalize(value)}`;
  findings[key] = (findings[key] ?? 0) + 1;
};

for (const root of config.scanRoots) {
  for (const file of await walk(resolve(packageRoot, root))) {
    const source = (await readFile(file, "utf8")).replace(
      /\/\*[\s\S]*?\*\//g,
      "",
    );
    const name = relative(packageRoot, file);
    for (const match of source.matchAll(declarations)) {
      const property = match[2].toLowerCase();
      const value = normalize(match[3]);
      if (property.startsWith("--text-") && !(property in config.typeSizes))
        add(name, "unapproved-size-token", value);
      if (property.startsWith("--weight-") && !(property in config.fontWeights))
        add(name, "unapproved-weight-token", value);
      if (
        property.startsWith("--") &&
        /(font|display|body|mono)/.test(property) &&
        !(property in config.typefaceRoles)
      )
        add(name, "additional-typeface-token", value);
      if (
        property === "font-family" &&
        !allowedFamilyVars.some((role) => value.includes(role)) &&
        !/^(inherit|unset)$/.test(value)
      )
        add(name, "font-family", value);
      if (
        property === "font-size" &&
        !/var\(--text-[\w-]+\)/.test(value) &&
        !/^(0|inherit|unset)$/.test(value)
      )
        add(name, "font-size", value);
      if (
        property === "font-weight" &&
        !/var\(--weight-[\w-]+\)/.test(value) &&
        !/^(inherit|unset)$/.test(value)
      )
        add(name, "font-weight", value);
      if (
        property === "font" &&
        (!/var\(--text-[\w-]+\)/.test(value) ||
          !allowedFamilyVars.some((role) => value.includes(role)))
      )
        add(name, "font-shorthand", value);
      for (const color of value.match(literalColor) ?? [])
        add(name, "literal-color", color.toLowerCase());
    }
  }
}

const sorted = Object.fromEntries(
  Object.entries(findings).sort(([a], [b]) => a.localeCompare(b)),
);
if (process.argv.includes("--write-baseline")) {
  await writeFile(
    baselinePath,
    `${JSON.stringify({ version: 1, findings: sorted }, null, 2)}\n`,
  );
  console.log(
    `Visual-vocabulary baseline recorded with ${Object.values(sorted).reduce((sum, count) => sum + count, 0)} legacy declarations.`,
  );
  process.exit(0);
}

const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const allKeys = new Set([
  ...Object.keys(baseline.findings),
  ...Object.keys(sorted),
]);
const changes = [...allKeys].filter(
  (key) => (baseline.findings[key] ?? 0) !== (sorted[key] ?? 0),
);
if (changes.length) {
  console.error(
    "Visual-vocabulary baseline changed. New raw declarations are blocked; intentional cleanup must refresh the baseline.",
  );
  for (const key of changes.slice(0, 30))
    console.error(
      `  ${baseline.findings[key] ?? 0} -> ${sorted[key] ?? 0}  ${key}`,
    );
  process.exit(1);
}

console.log(
  `Visual vocabulary passed: ${config.maxTypefaceFamilies} base typefaces, ${Object.keys(config.typeSizes).length} size tiers, ${Object.keys(config.fontWeights).length} weights, ${config.colorRoles.length} color roles; legacy debt did not grow.`,
);
