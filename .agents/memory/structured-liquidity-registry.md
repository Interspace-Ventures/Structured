---
name: Structured Liquidity shadcn registry
description: How the SL React port ships its components as a shadcn-installable registry, and the rules for keeping it valid.
---

# Structured Liquidity shadcn registry

The SL artifact is a React + Tailwind v4 port that publishes its `src/components/ui/*` as a
shadcn-installable registry served at `/r/*.json` (index at `/registry.json`).

## How it's built
- Generator: `artifacts/structured-liquidity/scripts/build-registry.mjs`, run via
  `pnpm --filter @workspace/structured-liquidity run registry`. Pure Node, no shadcn CLI/network.
- It emits a base style item `r/structured-liquidity.json` (`registry:style`) that ships the SL
  `cssVars` + the verbatim `public/structured-liquidity*.css` + `structured-liquidity-kit.js` as
  `registry:file`s, plus one `registry:ui` item per `src/components/ui/*.tsx`.
- Per-component `dependencies` (npm) and `registryDependencies` (internal) are **derived by parsing
  each file's imports** — not hand-maintained. Every UI item also depends on the base style so its
  CSS comes along.

## Rules (why)
- **The registry is generated — never hand-edit `public/registry.json` or `public/r/*.json`.** Change
  source + rerun the generator, or they drift from the components.
- **`public/*.css` and `*.js` stay verbatim** because the base item ships them directly to consumers;
  editing them changes what `npx shadcn add` installs.
- Cross-item URLs use `REGISTRY_BASE_URL` (default the canonical replit.app domain). The in-page
  Install button (`src/components/site/InstallButton.tsx`) instead builds its copied command from
  `window.location.origin`, so the copied command always matches wherever the site is served.
- **How to apply:** when adding/removing a UI component or changing its imports, rerun the registry
  script; when deploying from a fork/non-canonical host, set `REGISTRY_BASE_URL` before generating.
