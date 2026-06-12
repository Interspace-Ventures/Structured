# Structured Liquidity

A live, deployable landing page for **Structured Liquidity** — an open UI design language that pairs rigid containment (sharp 90° corners, flat blurless offset shadows, strict grid) with viscous depth (semi-transparent light-reflecting glass) and semantic clarity. The page is both the specimen and the documentation of the language, with a live in-page theme tweaker. Structured Liquidity is an Interspace Venture (est. 2026); the source is on GitHub at https://github.com/heyinterspace/Structured — the in-page **Install** CTAs link there.

## Run & Operate

- `pnpm --filter @workspace/structured-liquidity run dev` — run the site (Vite)
- `pnpm --filter @workspace/structured-liquidity run typecheck` — typecheck the artifact
- The site is a static Vite page; restart via the `artifacts/structured-liquidity: web` workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Static site served by Vite (React scaffold stripped — no React/Babel/UMD)
- Original design system shipped as plain HTML + CSS + vanilla JS
- Icons: **Lucide** (the vanilla `lucide` package, not `lucide-react`) — the design-language partner icon set

## Where things live

- `artifacts/structured-liquidity/index.html` — the full specimen markup (nav, hero, three pillars with their working rules, 40+ component kit, showcase, footer, overlays, toast stack)
- `artifacts/structured-liquidity/public/` — the original design system, copied verbatim:
  - `structured-liquidity.css` — **token source of truth** (`:root` knobs + fixed palette), backdrop, hero
  - `structured-liquidity-components.css`, `structured-liquidity-kit.css` — component styles
  - `structured-liquidity.js` (reveal-on-scroll, nav), `structured-liquidity-kit.js` (interactive components), `liquid-word.js` (the `[data-liquid]` wordmark)
  - **agent-accessibility data files (new, not original):** `llms.txt` (AI-discoverable spec, served at `/llms.txt`), `design-tokens.json` (W3C Design Tokens format — every token carries its CSS var in `$extensions.cssVar`), `registry.json` (16 copy-paste component recipes). These are *data*, not the verbatim CSS/JS — safe to edit.
- `artifacts/structured-liquidity/src/main.ts` — **new** vanilla-TS live theme tweaker (replaces the original React/Babel panel that was coupled to a proprietary in-editor host) + Lucide icon hydration (`createIcons` over `[data-lucide]` placeholders) + `mountCopy()` (clipboard for the `#adopt` copy buttons) + `mountGallery()` (builds the component filter chips + masonry grid, deriving its taxonomy from the catalog)
- `artifacts/structured-liquidity/src/catalog.json` — **new** the **single source of truth** for the component inventory and how the live gallery is organized: `categories` (the alphabetical filter-chip order) + `components` (each with `name`, `cap`, `category`, `status`, `tags`). `mountGallery()` in `src/main.ts` builds its `CATS`/`CAT_OF` from this file, so editing the catalog reorganizes the rendered gallery (no backend). Each component's `cap` must match its `.kit-cap` text in `index.html`; in dev, any uncatalogued `.kit-cap` logs a console warning.
- `.agents/skills/structured-liquidity/SKILL.md` — **new** Replit Skill so an agent can apply the design language in any project (the hard rules, `:root` tokens, font pairings, component class list).

## Architecture decisions

- **Faithful port, not a redesign.** The original CSS/JS are copied byte-for-byte into `public/`. Only the React/Babel runtime, the `<image-slot>` custom element, and the two `.jsx` files were dropped — all three depended on a proprietary in-editor "omelette" host bridge (`postMessage` / `__edit_mode_*`) that does not exist in a deployment.
- **Tweaker rebuilt in vanilla TS** so the "living" theme editor actually works for visitors. It writes the same CSS custom properties the page reads and persists to `localStorage` (key `sl-tweaks`).
- **Showcase is a scalable product-card grid** (`.show-grid` of `.show-card`, styles inline in `index.html` `<head>`), replacing the original `<image-slot>` "drop a screenshot" placeholder. Each card is one clickable `<a class="show-card glass">` (browser-bar + real screenshot from `public/` + always-visible foot: avatar/name/tag/badge); the description + Visit CTA reveal on hover/focus, and show as a persistent bottom panel on touch (`@media (hover:none)`). Grid auto-flows 1→4 across. Add a product = copy one `.show-card` block + drop its screenshot in `public/`.
- Asset references in `index.html` are relative (no leading slash) and the artifact is served at base `/`.

## Product

A single-page specimen + reference for the Structured Liquidity design language: it explains the three pillars (each with its working rules), demonstrates a full component kit, and lets visitors retheme it live (accent, glass blur, corner radius, border weight, flat-shadow offset, display font, dark/light mode).

## Agent accessibility (make the language adoptable by AI)

So the design language gets incorporated into more designs, it ships in machine-readable formats plus an on-page guide:

- `public/llms.txt`, `public/design-tokens.json`, `public/registry.json` — served at the site root for AI tools to read directly.
- `.agents/skills/structured-liquidity/SKILL.md` — a Replit Skill any agent can load to apply the language.
- On-page `#adopt` section (in `index.html`, before the footer CTA; nav link "For AI") — resource cards linking the three files, a paste-ready AI prompt + a `:root` token block (each with a copy button wired by `mountCopy()` in `src/main.ts`), and the recommended font pairings.
- **Recommended font pairings** — three sets, each with a Header · Body · Detail role (Detail = the monospace face for labels/data/code): `Archivo · Outfit · Space Mono` (Set 01 Canonical, default), `Syne · Inter · IBM Plex Mono` (Set 02 Editorial), `Bricolage Grotesque · Plus Jakarta Sans · JetBrains Mono` (Set 03 Modern). Rules: never two header faces; never body copy in the header face; detail mono only for labels/data/code. Choices grounded in neobrutalist/brutalist font references.

## Design language tokens (the knobs the page reads)

Defined in `public/structured-liquidity.css` `:root`; overridable live by `src/main.ts`:

- `--accent` (default `#a388ee`) + `--accent-ink` (luminance-derived black/white)
- `--glass-blur` (18px), `--glass-tint` (rgb), `--glass-alpha`
- `--border-w` (2px), `--hard-x`/`--hard-y` (7px, flat offset shadow), `--radius` (0px)
- `--display` (Archivo, headings/buttons/brand — controlled by the live tweaker), `--mono` (Space Mono), `--body` (Outfit — body/paragraph copy; defined in `index.html`'s inline `<style>`, not in `public/`)
- `data-mode` attribute on `<html>`: `dark` | `light`
- Tweaker ranges: blur 0–40, radius 0–40, border 0–5, shadow 0–16; accents `#a388ee #7c9cff #3dd7c8 #ffb454 #ff7a90`; fonts Archivo / Space Grotesk / Syne

## User preferences

- Port the provided design framework faithfully — it is a finished specimen, not a starting point to redesign.

## Gotchas

- The three files in `public/*.js` and `*.css` are the **original** artifacts — keep them verbatim; put any new behavior/styles in `src/main.ts` or `index.html`, not in those files.
- **Icons are the design-language default for navbars & buttons:** add a leading `<i data-lucide="kebab-name"></i>` inside nav links / `.btn` / `.sl-btn`, import the icon in `src/main.ts` and add it to the `mountIcons()` map, then it hydrates on load. Use the vanilla `lucide` package — `lucide-react` (still listed in `package.json` from the stripped React scaffold) is unused and will NOT work here.
- Content blocks use a `reveal` class animated on scroll by `structured-liquidity.js`. Deep-linking to a hash (e.g. `#showcase`) and screenshotting immediately can capture before the reveal fires — scroll the live page to verify.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
