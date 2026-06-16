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

## Pattern — accent-pour ripple (celebratory flood on accent change)
Picking an accent chip in the tweaker switches `--accent` as before, then `accentPour(x,y,hex)` appends a transient `<span class="sl-accent-pour">` to `<body>`: a `position:fixed` circle whose diameter = 2× the farthest viewport-corner distance from the click, masked with a `radial-gradient` so it reads as liquid filling in, then self-removes on `animationend`. CSS in the `prefers-reduced-motion: no-preference` block; JS helper early-returns under reduced motion. Keyboard activation (Enter on chip) gives `clientX/Y === 0` → fall back to the chip's `getBoundingClientRect()` centre so the pour doesn't launch from the top-left corner.

## Pattern — hero cube parallax tilt
`mountHeroTilt()` listens on **document** `pointermove` (skips `pointerType === "touch"`), rAF-throttles, and writes `--rx`/`--ry` (clamped ±12deg) onto `.hero-cube`; CSS `transform:perspective(1100px) rotateX(var(--rx)) rotateY(var(--ry))` reads them.
**Why tilting the whole `.hero-cube` is OK here (doesn't break the rigid-frame rule):** this specific element's tile is already stripped in `index.html` (`border:0;background:none;box-shadow:none`), so there is no rigid frame to morph — only the liquid mark leans. Do NOT copy this onto a glyph/tile that still has its container chrome; tilt the inner glass, not the tile, in that case.

## Gotcha — `public/opengraph.jpg` silently drifts during dev/e2e
The binary `public/opengraph.jpg` gets rewritten by the dev server / e2e run even when you never touch it, breaking the verbatim-`public/*` contract. Restore byte-for-byte with `git --no-optional-locks show HEAD:<path> > <path>` (plain `git checkout`/`restore` and any op touching `.git/index.lock` are blocked for the main agent). Always re-run `git --no-optional-locks status --porcelain` at the end and confirm only `index.html` + `src/main.ts` remain modified.
