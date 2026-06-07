# Structured Liquidity

A live, deployable landing page for **Structured Liquidity** — an open UI design language that pairs rigid containment (sharp 90° corners, flat blurless offset shadows, strict grid) with viscous depth (semi-transparent light-reflecting glass) and semantic clarity. The page is both the specimen and the documentation of the language, with a live in-page theme tweaker.

## Run & Operate

- `pnpm --filter @workspace/structured-liquidity run dev` — run the site (Vite)
- `pnpm --filter @workspace/structured-liquidity run typecheck` — typecheck the artifact
- The site is a static Vite page; restart via the `artifacts/structured-liquidity: web` workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Static site served by Vite (React scaffold stripped — no React/Babel/UMD)
- Original design system shipped as plain HTML + CSS + vanilla JS

## Where things live

- `artifacts/structured-liquidity/index.html` — the full specimen markup (nav, hero, three pillars, six principles, 40+ component kit, showcase, footer, overlays, toast stack)
- `artifacts/structured-liquidity/public/` — the original design system, copied verbatim:
  - `structured-liquidity.css` — **token source of truth** (`:root` knobs + fixed palette), backdrop, hero
  - `structured-liquidity-components.css`, `structured-liquidity-kit.css` — component styles
  - `structured-liquidity.js` (reveal-on-scroll, nav), `structured-liquidity-kit.js` (interactive components), `liquid-word.js` (the `[data-liquid]` wordmark)
- `artifacts/structured-liquidity/src/main.ts` — **new** vanilla-TS live theme tweaker (replaces the original React/Babel panel that was coupled to a proprietary in-editor host)

## Architecture decisions

- **Faithful port, not a redesign.** The original CSS/JS are copied byte-for-byte into `public/`. Only the React/Babel runtime, the `<image-slot>` custom element, and the two `.jsx` files were dropped — all three depended on a proprietary in-editor "omelette" host bridge (`postMessage` / `__edit_mode_*`) that does not exist in a deployment.
- **Tweaker rebuilt in vanilla TS** so the "living" theme editor actually works for visitors. It writes the same CSS custom properties the page reads and persists to `localStorage` (key `sl-tweaks`).
- **Showcase drop-slot replaced** with an on-brand CSS `.verse-mock` visual (styles inline in `index.html` `<head>`), because the original `<image-slot>` only rendered a "drop a screenshot" placeholder outside the editor.
- Asset references in `index.html` are relative (no leading slash) and the artifact is served at base `/`.

## Product

A single-page specimen + reference for the Structured Liquidity design language: it explains the three pillars and six principles, demonstrates a full component kit, and lets visitors retheme it live (accent, glass blur, corner radius, border weight, flat-shadow offset, display font, dark/light mode).

## Design language tokens (the knobs the page reads)

Defined in `public/structured-liquidity.css` `:root`; overridable live by `src/main.ts`:

- `--accent` (default `#a388ee`) + `--accent-ink` (luminance-derived black/white)
- `--glass-blur` (18px), `--glass-tint` (rgb), `--glass-alpha`
- `--border-w` (2px), `--hard-x`/`--hard-y` (7px, flat offset shadow), `--radius` (0px)
- `--display` (Archivo), `--mono` (Space Mono)
- `data-mode` attribute on `<html>`: `dark` | `light`
- Tweaker ranges: blur 0–40, radius 0–40, border 0–5, shadow 0–16; accents `#a388ee #7c9cff #3dd7c8 #ffb454 #ff7a90`; fonts Archivo / Space Grotesk / Syne

## User preferences

- Port the provided design framework faithfully — it is a finished specimen, not a starting point to redesign.

## Gotchas

- The three files in `public/*.js` and `*.css` are the **original** artifacts — keep them verbatim; put any new behavior/styles in `src/main.ts` or `index.html`, not in those files.
- Content blocks use a `reveal` class animated on scroll by `structured-liquidity.js`. Deep-linking to a hash (e.g. `#showcase`) and screenshotting immediately can capture before the reveal fires — scroll the live page to verify.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
