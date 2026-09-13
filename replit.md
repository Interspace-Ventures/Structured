# Structured Liquidity

A live, deployable specimen + landing page for **Structured Liquidity** — **Neobrutalist structure. Liquid motion. Scientific modern clarity.** Neobrutalist structure owns the physical frame of the interface: buttons, borders, navigation, footers, body containers, panels, square geometry, and selective flat shadows. Liquid Motion makes system behavior perceptible through shared markers and transitions between navbar actions, menu options, tabs, filters, overlays, and page areas without becoming the only carrier of meaning; default information surfaces remain flat, gradients are not shorthand for liquidity, and every interaction has a complete reduced-motion state. Scientific Modern Clarity organizes information and communicates meaning through rational grids, disciplined hierarchy, measured typography, captions, labeling, evidence, and purposeful whitespace. Swiss modernism and the International Typographic Style are the informing tradition: information should be legible, ordered, and unmistakable, and every screen remains complete without relying on color, glass, or motion. These three tenets form the Structured Liquidity trifecta, represented by the cube's three visible faces. The page is both the specimen and the documentation of the language, with a live in-page theme tweaker, and it **dogfoods its own React components**. It also publishes those components as a **shadcn-installable registry** at `/r/*.json`. Structured Liquidity is an Interspace Venture (est. 2026); the source is on GitHub at https://github.com/heyinterspace/Structured.

## Run & Operate

- `pnpm --filter @workspace/structured-liquidity run dev` — run the site (Vite)
- `pnpm --filter @workspace/structured-liquidity run typecheck` — typecheck the artifact
- `pnpm --filter @workspace/structured-liquidity run registry` — regenerate the shadcn registry (`public/r/*.json` + `public/registry.json`) from source
- `pnpm --filter @workspace/structured-liquidity run registry:check` — verify the committed registry before publishing: fails on **drift** (regenerates into a temp dir and diffs against the committed files) and on **schema violations** (validates every emitted file against the vendored shadcn registry-item / registry schemas). Registered as the `registry` validation check (see the `validation` skill); run it alongside `typecheck` in the normal verify flow.
- The site is a static Vite + React page; restart via the `artifacts/structured-liquidity: web` workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **React 19 + Tailwind v4**, built and served by Vite (artifact base `/`)
- The original framework-agnostic SL CSS is kept **verbatim** and imported by the Tailwind entry, so pixel fidelity is guaranteed; React components emit the same SL class names the CSS already styles
- Icons: **`lucide-react`** (the design-language partner icon set). The vanilla `lucide` package is no longer used.

## Where things live

- `artifacts/structured-liquidity/index.html` — minimal React shell (`<div id="root">` + `<script src="/src/main.tsx">`)
- `artifacts/structured-liquidity/src/main.tsx`, `src/App.tsx` — entry + page composition (Nav, Hero, Tenets, Components/gallery, Templates, Showcase, Adopt, FooterCta, Footer, Tweaker, Toaster, overlays)
- `artifacts/structured-liquidity/src/index.css` — Tailwind entry: `@theme` + imports of the SL styles in `src/styles/` (`10-tokens-base.css`, `20-components.css`, `30-kit.css`, `40-inline.css`)
- `artifacts/structured-liquidity/src/components/ui/*` — ~64 shadcn-style SL components (Button, Badge, Input, Select, Tabs, Accordion, Dialog, …). **Plain React + `lucide-react`, no Radix** — each emits SL classes and uses `cn()` from `src/lib/utils.ts`.
- `artifacts/structured-liquidity/src/components/templates/*` — installable page structures distilled from the production portfolio: marketing site, data dashboard, guided flow, and immersive app.
- `artifacts/structured-liquidity/src/components/site/*` — the page sections, the bespoke visuals (`liquid.tsx` = `LiquidWord` + `Hypercube`, ported from `liquid-word.js`), `Tweaker.tsx` (live theme editor), `InstallButton.tsx` (copies the shadcn install command), and `kit/Kit*.tsx` (the grouped component gallery cells).
- `artifacts/structured-liquidity/src/lib/behaviors.ts` — imperative behaviors ported from the legacy kit JS: `bindGallery()` (re-parents the rendered `.kit-cell`s into a flat, filterable, FLIP-animated `.kit-grid.gallery` with Type×Kind chips and breadcrumb caps, deriving its taxonomy from `catalog.json`) plus reveal-on-scroll / nav behaviors. Entered via `initBehaviors()`.
- `artifacts/structured-liquidity/src/catalog.json` — the **single source of truth** for the gallery taxonomy: `categories` + `components` (each `name`, `cap`, `category`, `status`, `tags`/facets). Each component's `cap` must match its `.kit-cap` text; in dev, any uncatalogued `.kit-cap` logs a console warning.
- `artifacts/structured-liquidity/scripts/build-registry.mjs` — the registry generator (see below).
- `artifacts/structured-liquidity/public/` — verbatim original CSS/JS + agent-accessibility data + the generated registry:
  - `structured-liquidity.css` (token source of truth), `structured-liquidity-components.css`, `structured-liquidity-kit.css`, `structured-liquidity-kit.js`, `liquid-word.js`, `structured-liquidity.js` — the **original** artifacts (these are also the files shipped by the base registry item)
  - `llms.txt`, `design-tokens.json` — agent-discoverable spec + W3C Design Tokens (each token carries its CSS var)
  - `registry.json` + `r/*.json` — **generated** shadcn registry (do not hand-edit; run the `registry` script)
- `.agents/skills/structured-liquidity/SKILL.md` — Replit Skill so an agent can apply the design language in any project.

## The registry (shadcn-installable)

`scripts/build-registry.mjs` emits a shadcn-compatible registry from source — no network or shadcn CLI dependency at build time:

- `public/r/structured-liquidity.json` — the **base style item** (`registry:style`): the SL theme tokens (`cssVars`) + the three distributable stylesheets + the kit script (as `registry:file`s). Install this first.
- `public/r/<component>.json` — one `registry:ui` item per `src/components/ui/*.tsx`, with npm `dependencies` and internal `registryDependencies` resolved by parsing each file's imports; every component depends on the base style so its CSS comes along.
- `public/r/site-templates.json` — the `registry:block` item containing the four production-tested page templates.
- `public/registry.json` — the registry index (shadcn `registry.json` schema).

`scripts/check-registry.mjs` (`run registry:check`) guards the published output: it sets `REGISTRY_OUT_DIR` to a temp dir, reruns the generator there, and diffs against the committed `public/registry.json` + `public/r/*.json` (drift), then validates every committed file against the vendored shadcn schemas in `scripts/schemas/*.schema.json` using `ajv` (a devDependency). It is registered as the `registry` validation check.

Cross-item URLs use `REGISTRY_BASE_URL` (default `https://structured.glass`). The in-page **Install** buttons (`InstallButton.tsx`, used in Nav/Hero/FooterCta) copy `npx shadcn@latest add <window.location.origin>/r/structured-liquidity.json` to the clipboard and fire a toast, so the copied command always matches wherever the site is served; a separate **Source** link points at GitHub. The `#adopt` ("For AI") section surfaces the registry, the install command, the AI prompt, the `:root` tokens, and `llms.txt` / `design-tokens.json`.

## Architecture decisions

- **Faithful visual port, not a redesign.** The original CSS/JS are kept byte-for-byte (`public/` + copied into `src/styles/`). React components reproduce the legacy markup's class names so the existing CSS styles them unchanged; the vanilla kit-JS behaviors are reimplemented with React state (gallery FLIP/filtering stays imperative in `behaviors.ts`).
- **Components are plain React (no Radix).** They are class-driven wrappers, which keeps each registry item self-contained (only `lucide-react` where icons are used + the base style).
- **Tweaker is React** (`Tweaker.tsx`): writes the same CSS custom properties the page reads, persists to `localStorage` (key `sl-tweaks`); a font change dispatches a window resize so `LiquidWord` rebuilds.
- **Showcase is a scalable product-card grid** (`.show-grid` of `.show-card`): each card is a clickable `<a class="show-card glass">` with a real screenshot from `public/`; description + Visit CTA reveal on hover/focus (persistent bottom panel on touch). Add a product = one `.show-card` + its screenshot.
- Asset references are relative; the artifact is served at base `/`.
- Public sites built with the framework must include a visible footer attribution to `https://structured.glass`; use `FrameworkAttribution` or the plain HTML recipe in `ATTRIBUTION.md`. Immersive full-viewport apps may put it in a persistent information panel.
- Navigation, body surface, and footer chrome share `--shell-w`. The body remains an independent near-background surface, while tenant layouts may set a narrower internal reading measure.

## Product

A single-page specimen + reference for the Structured Liquidity design language: it explains the trifecta in order—Neobrutalist structure as the physical frame, Liquid Motion as behavior, Scientific Modern Clarity as information and communication—demonstrates a curated component gallery backed by the full registry, lets visitors retheme it live, and lets them install it via shadcn. The cube's three visible faces represent the trifecta; there is no fourth group.

## Design language tokens (the knobs the page reads)

Defined in `src/styles/10-tokens-base.css` / `public/structured-liquidity.css` `:root`; overridable live by `Tweaker.tsx`:

- `--accent` (default `#a388ee`) + `--accent-ink` (luminance-derived black/white)
- `--glass-blur` (18px), `--glass-tint` (rgb), `--glass-alpha`
- `--border-w` (2px), `--hard-x`/`--hard-y` (7px, flat offset shadow), `--radius` (0px)
- `--display` and `--body` (Inter), `--mono` (Space Mono)
- `data-mode` attribute on `<html>`: `dark` | `light`
- Tweaker ranges: blur 0–40, radius 0–40, border 0–5, shadow 0–16; accents `#a388ee #7c9cff #3dd7c8 #ffb454 #ff7a90`; typography stays fixed.
- **Canonical font roles** (Header · Body · Detail): `Inter · Inter · Space Mono`. Use Inter across hierarchy and reading; reserve mono for labels, evidence, data, and code.

## User preferences

- Port the provided design framework faithfully — it is a finished specimen, not a starting point to redesign.
- Avoid red. Do not use red (or reddish/pink) colors in the UI; prefer the theme accent (`var(--accent)`) or a neutral (`--neg`) instead.

## Gotchas

- **`public/*.css` and `*.js` are the original artifacts — keep them verbatim.** They are also what the base registry item ships, so editing them changes what consumers install. Put new behavior/styles in `src/` (`behaviors.ts`, `Tweaker.tsx`, the components), not in those files.
- **The registry is generated.** Never hand-edit `public/registry.json` or `public/r/*.json`; change source + rerun `pnpm --filter @workspace/structured-liquidity run registry`. A component's npm `dependencies` and `registryDependencies` are derived from its `import`s.
- **Icons are the design-language default for navbars & buttons:** add a leading `lucide-react` icon, then the label. Use `lucide-react`, not the vanilla `lucide` package.
- Content blocks use a `reveal` class animated on scroll. Deep-linking to a hash (e.g. `#showcase`) and screenshotting immediately can capture before the reveal fires — scroll the live page to verify.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
