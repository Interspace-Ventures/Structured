import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(ROOT, "src/adopters.json"), "utf8"));
const registryItems = new Set(
  readdirSync(join(ROOT, "public/r"))
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, "")),
);

const allowedLifecycle = new Set(["live", "staging"]);
const allowedRouteStatus = new Set(["verified", "private", "domain-pending", "concept"]);
const ids = new Set();
const domains = new Set();
const errors = [];

for (const project of registry.projects ?? []) {
  const label = project.id || project.name || "unknown project";
  if (!project.id || !project.name || !project.domain) {
    errors.push(`${label}: id, name, and domain are required`);
  }
  if (ids.has(project.id)) errors.push(`${label}: duplicate id`);
  if (domains.has(project.domain)) errors.push(`${label}: duplicate domain`);
  ids.add(project.id);
  domains.add(project.domain);

  if (!allowedLifecycle.has(project.lifecycle)) {
    errors.push(`${label}: invalid lifecycle "${project.lifecycle}"`);
  }
  if (!allowedRouteStatus.has(project.routeStatus)) {
    errors.push(`${label}: invalid routeStatus "${project.routeStatus}"`);
  }
  if (project.routeStatus === "verified" && !project.href) {
    errors.push(`${label}: verified routes require href`);
  }
  if (project.lifecycle === "live" && !project.repository) {
    errors.push(`${label}: live projects require a repository`);
  }
  if (project.shot && !existsSync(join(ROOT, "public", project.shot))) {
    errors.push(`${label}: screenshot "${project.shot}" is missing`);
  }
  for (const item of project.absorbedComponents ?? []) {
    if (!registryItems.has(item)) {
      errors.push(`${label}: absorbed component "${item}" is not in public/r`);
    }
  }
}

if (!registry.reviewedAt) errors.push("reviewedAt is required");
if (!registry.projects?.length) errors.push("at least one adopter is required");

if (errors.length) {
  console.error(`Adopter registry failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

const live = registry.projects.filter((project) => project.lifecycle === "live").length;
const staging = registry.projects.length - live;
console.log(
  `Adopter registry valid: ${registry.projects.length} projects (${live} live, ${staging} staging), reviewed ${registry.reviewedAt}.`,
);
