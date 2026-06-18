---
name: Structured Liquidity motion layer
description: How the tactile "liquid glass" interaction motion is built on the SL specimen, and the two non-obvious traps when extending it.
---

# Liquid motion layer

Tactile interaction motion (press ripples, liquid toggles/switch sheen, flowing tab marker, settling menus/dialogs/accordion, hover refraction) lives entirely in `index.html`'s inline `<style>` (gated under `@media (prefers-reduced-motion: no-preference)`) + three `mount*()` fns in `src/main.ts` (`mountRipples`, `mountTabFlow`, `mountRefraction`, each early-returns under `prefers-reduced-motion: reduce`). The verbatim `public/*` stays untouched — see the verbatim-public rule in `structured-liquidity.md`.

## Governing principle (content decision)
The rigid **container** never bounces/squishes/morphs (sharp corners, flat offset shadow, grid hold). Only the **liquid inside** reacts — ripple, flood, settle with viscous overshoot, catch light. One shared easing token set (`--ease-liquid`, `--ease-liquid-over`, `--motion*`) so every motion feels like the same material.
**Why:** generic bouncy UI or Apple's blurry-blob "Liquid Glass" both break "structured containment"; the frame must stay firm or the language loses its identity.
**Adoption note:** this motion is specimen-only — it can't go in the distributable `public` CSS (verbatim rule), so do NOT document it in `registry.json`/SKILL.md.

## Trap 1 — `mix-blend-mode: plus-lighter` blows out over a vivid backdrop
A pointer-tracked hover sheen using `mix-blend-mode: plus-lighter` on `.glass`/`.kit-cell` cards looks fine on dark areas but turns into an intense saturated glow where the page's blue/purple backdrop gradient shows through the semi-transparent glass — plus-lighter *adds* the backdrop's color, compounding it. Fix: use a **normal-blend, low-alpha white** radial (`rgba(255,255,255,.07)`, ~200px) — predictable everywhere, never washes out content.
**How to apply:** any additive/blend-mode glow layered over SL's translucent glass must be reasoned about against the backdrop *behind* the glass, not just the glass color. Headless screenshots DO render this, so verify with a screenshot where the synthetic cursor lands on a card over the bright backdrop region.

## Trap 2 — flowing tab marker must keep `aria-selected` as truth + fall back gracefully
The "accent glides between tabs" effect: JS adds `.is-flowing` + a `.sl-tab-marker` span to `.sl-tabs .tablist`, sets `--tab-x`/`--tab-w` from the active button's `offsetLeft`/`offsetWidth`; CSS (scoped to `.is-flowing`) makes the active button background **transparent** so only the JS marker supplies the accent.
**Why scoped to `.is-flowing` (JS-added):** the transparent-active-bg rule only exists once JS has added the class and is about to position the marker — so a no-JS / reduced-motion visitor keeps the verbatim accent button background (the marker fn early-returns under reduced motion). Never make the active bg transparent unconditionally.
**A11y:** the marker is purely visual (`aria-hidden`); the verbatim kit JS still owns `aria-selected`, so AT semantics are unaffected.
**How to apply:** recompute marker geometry on `click` (via rAF, after kit JS flips `aria-selected`), `resize`, and `document.fonts.ready` (font swap changes button widths).

## A11y — a mobile bottom tab bar is navigation, not an ARIA tabs widget
The kit's phone-frame "tab bar" (`.mn-tabs`/`.mn-tab`) has no associated tabpanels, so it must be a `<nav aria-label>` of buttons with `aria-current="page"` on the active one — NOT `role="tablist"`/`role="tab"`/`aria-selected` (which over-claims and implies arrow-key roving + `aria-controls` panels). This is the opposite of the in-page `.sl-tabs` flowing-marker tabs (Trap 2), which *do* switch panels and legitimately own `aria-selected`. Distinguish by whether selecting swaps a panel.
**How to apply:** active state is class-driven (`.is-active` → visual) + `aria-current` (semantics); the JS toggles both. Add `:focus-visible{outline:2px solid var(--accent);outline-offset:3px}` (the specimen's focus convention, from `.show-card`) to interactive controls in new kit cells.

## Pattern — accent-pour ripple (celebratory flood on accent change)
Picking an accent chip in the tweaker switches `--accent` as before, then `accentPour(x,y,hex)` appends a transient `<span class="sl-accent-pour">` to `<body>` (diameter = ~2.5× the farthest viewport-corner distance from the click) that self-removes on `animationend`. CSS in the `prefers-reduced-motion: no-preference` block; JS helper early-returns under reduced motion. Keyboard activation (Enter on chip) gives `clientX/Y === 0` → fall back to the chip's `getBoundingClientRect()` centre so the pour doesn't launch from the top-left corner.
**Fluidity (user feedback "doesn't look fluid"):** a single uniform expanding disc that just scales+fades reads mechanical. To make it feel like liquid: (1) **morph `border-radius`** across keyframes (asymmetric `% / %` blob values) so the spreading edge undulates; (2) use the **viscous-overshoot** easing (`--ease-liquid-over`), not the plain settle; (3) a **wide soft feather** via `mask-image:radial-gradient(circle,#000 30%,rgba(0,0,0,.5) 58%,transparent 80%)` instead of a hard edge; (4) a `::before` "leading meniscus" (`background:inherit` to pick up the inline accent, `filter:brightness`, runs slightly ahead) for depth. Oversize the node (×2.5) so the morphing/rotating blob still covers the corners. The single `animationend` listener still works — element + `::before` animations share the same duration.

## Pattern — hero cube parallax tilt
`mountHeroTilt()` listens on **document** `pointermove` (skips `pointerType === "touch"`), rAF-throttles, and writes `--rx`/`--ry` (clamped ±12deg) onto `.hero-cube`; CSS `transform:perspective(1100px) rotateX(var(--rx)) rotateY(var(--ry))` reads them.
**Why tilting the whole `.hero-cube` is OK here (doesn't break the rigid-frame rule):** this specific element's tile is already stripped in `index.html` (`border:0;background:none;box-shadow:none`), so there is no rigid frame to morph — only the liquid mark leans. Do NOT copy this onto a glyph/tile that still has its container chrome; tilt the inner glass, not the tile, in that case.

## Gotcha — `public/opengraph.jpg` silently drifts during dev/e2e
The binary `public/opengraph.jpg` gets rewritten by the dev server / e2e run even when you never touch it, breaking the verbatim-`public/*` contract. Restore byte-for-byte with `git --no-optional-locks show HEAD:<path> > <path>` (plain `git checkout`/`restore` and any op touching `.git/index.lock` are blocked for the main agent). Always re-run `git --no-optional-locks status --porcelain` at the end and confirm only `index.html` + `src/main.ts` remain modified.
