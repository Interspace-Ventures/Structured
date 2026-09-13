---
name: structured-liquidity
description: Apply the Structured Liquidity UI design language — Neobrutalist structure, Liquid Motion, and Scientific Modern Clarity. Use when building or restyling any UI that should follow Structured Liquidity, when the user references the language by name, or when adopting its tokens/components in a new project.
---

# Structured Liquidity

**Neobrutalist structure. Liquid motion. Scientific modern clarity.**

1. **Neobrutalist structure:** How the interface is physically framed—buttons, borders, navigation, footers, body containers, panels, square geometry, and selective flat shadows. It makes boundaries and actions tangible before effects are added.
2. **Liquid Motion:** How the system behaves—continuity, layered neutral glass, and purposeful motion that make state and believable mass perceptible without becoming the only carrier of meaning. Every interaction has a complete reduced-motion state.
3. **Scientific Modern Clarity:** How information is organized and meaning is communicated—rational grids, disciplined hierarchy, measured typography, captions, labeling, evidence, and purposeful whitespace. Swiss modernism and the International Typographic Style are the informing tradition: make information legible, ordered, and unmistakable. Every screen remains complete and useful without relying on color, glass, or motion.

Together these three tenets form the Structured Liquidity trifecta, represented by the three visible faces of the cube. Each tenet owns the clarity of its part of the interface. The living specimen, machine-readable tokens, and component registry are served by the `structured-liquidity` artifact.

## The non-negotiable rules

Follow these literally — they are what keep generated output on-brand:

1. **Square corners.** `border-radius: var(--radius)` (default `0`). Only raise deliberately.
2. **Flat offset shadows, used selectively.** `box-shadow: var(--hard-x) var(--hard-y) 0 0 var(--hard-shadow)`. Blur is always `0`. Reserve shadows for tactile affordances and deliberately layered cutout surfaces; flat information containers can rely on borders, rules, and alignment.
3. **Load-bearing borders.** `var(--border-w) solid rgb(var(--edge))`. The edge is black in both light and dark mode.
4. **Exactly one accent.** `--accent` carries all emphasis. Never add a competing hue.
5. **Liquid is movement, not a gradient treatment.** Default information surfaces are flat. Express liquidity through moving selection markers, menu and popover settling, tab changes, scroll continuity, and transitions between areas. Use neutral translucency or `backdrop-filter` only at moving state boundaries such as navigation, menus, and overlays—not on every card.
6. **Destructive is gray, not red.** Destructive _containers_ use `--neg`. Error _text_ may warn in color.
7. **Fixed type roles.** display (`--display`, Inter) = headings/buttons/brand; body (`--body`, Inter) = reading copy; mono (`--mono`, Space Mono) = labels/data/captions/eyebrows.
8. **Leading icons.** Nav links and buttons take a leading Lucide icon, then the label.
9. **Motion proves mass.** On press/hover, nudge the element ~1px toward its shadow and grow the offset.
10. **Communicate with scientific modern clarity.** Use a rational grid, exact alignment, asymmetric balance, measured line lengths, purposeful whitespace, and compact mono captions for sources, state, and evidence. Swiss modernism and the International Typographic Style are the reference tradition.
11. **Monochrome carries information.** The accent identifies selection, progression, or one key relationship; it does not decorate the page.

## Tokens

Apply these as CSS custom properties on `:root` (light-mode defaults):

```css
:root {
  --accent: #a388ee;
  --accent-ink: #000000;
  --bg: #f2f0ea;
  --bg-2: #ffffff;
  --ink: #111111;
  --ink-dim: #5d5d59;
  --edge: 0 0 0;
  --hard-shadow: #000000;
  --neg: #242424;
  --neg-ink: #ffffff;
  --glass-blur: 14px;
  --glass-tint: 255 255 255;
  --glass-alpha: 0.72;
  --border-w: 2px;
  --hard-x: 5px;
  --hard-y: 5px;
  --radius: 0px;
  --display: "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;
  --body: "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;
  --mono: "Space Mono", "SFMono-Regular", ui-monospace, monospace;
  --text-display-xl: clamp(4.2rem, 10.5vw, 9.5rem);
  --text-display-lg: clamp(2.6rem, 5.5vw, 5.25rem);
  --measure-reading: 62ch;
  --measure-caption: 48ch;
  --grid-gutter: clamp(1rem, 2.5vw, 2.5rem);
  --section-space: clamp(4rem, 9vw, 9rem);
}
```

Dark mode has one color-responsive atmospheric palette; there is no separate black mode. Set `data-mode="dark"` on `<html>` and derive `--bg:color-mix(in srgb,var(--accent) 8%,#0d0a11)` plus `--bg-2:color-mix(in srgb,var(--accent) 14%,#100d14)`, with `--ink:#f6f2f8; --ink-dim:#b9b0bf; --neg:#343434; --neg-ink:#fff; --glass-alpha:0.08`. Changing the single accent must retune the dark page field automatically: purple becomes deep aubergine, green becomes deep green, yellow becomes deep ochre. Tactile components may remain charcoal or near-black above that field.

The canonical machine-readable set is `design-tokens.json` (W3C Design Tokens format; each token's `$extensions.cssVar` gives the exact variable name).

## Type layout

Three roles — header / body / detail (display / body / mono). Inter carries both sans-serif roles; use scale, weight, measure, and alignment for hierarchy. Use Space Mono only for labels, data, code, captions, and eyebrows. Prefer one dominant statement, a 12-column or similarly disciplined grid, short reading measures, and figure captions that identify evidence and state.

## Motion contract

The rigid frame never wobbles or morphs. Motion belongs inside it and must explain state, continuity, or spatial relationship. Prefer a shared marker that visibly travels between menu options, tabs, filters, navbar actions, and page areas over per-item gradient fills or decorative sheen. Use one liquid easing family; reserve ambient motion for a single focal specimen; provide a complete static state under `prefers-reduced-motion`. If the interface communicates the same thing without the animation, the motion is optional polish, not a dependency.

## Components

The specimen ships a **shadcn-installable registry** served at `/r/*.json`. Two ways to adopt, depending on the target project:

### Installation gate for agents

Before making the first UI edit in a target project, run:

```bash
npx shadcn@latest add https://structured.glass/r/structured-liquidity-agent.json
```

Verify that the theme styles and `.agents/skills/structured-liquidity/SKILL.md` landed. Do not spend early iterations approximating the language by hand.

**A. React + Tailwind project (preferred).** Use the shadcn CLI. Install the whole language (tokens + the three stylesheets + the kit script) first, then any component:

```bash
npx shadcn@latest add https://structured.glass/r/structured-liquidity.json   # base style — do this first
npx shadcn@latest add https://structured.glass/r/button.json                  # then any component
```

Each `registry:ui` item is a plain React component (no Radix) that emits the SL classes and declares the base style as a `registryDependency`, so the CSS comes along. The registry index lives at `/registry.json`.

### Portfolio-grid default

Use the installable `portfolio-card` component for company, investment, and venture grids. Its information hierarchy is persistent: logo or identity mark, company name, one concise description, state or category tags, and the primary action are visible without hover. Hover and press may reinforce tactility, but must never reveal information that is otherwise unavailable, especially on touch devices.

```bash
npx shadcn@latest add https://structured.glass/r/portfolio-card.json
```

Use `PortfolioGrid` with `PortfolioCard` and its anatomy exports. Put `PortfolioCardTags` inside `PortfolioCardMedia` so state and category labels overlay the image plate instead of changing the body height. Keep card bodies aligned within the grid, use a consistent media plate for logo normalization, and use the action only when the destination is real. Unavailable or pre-launch companies render as non-link cards with their status exposed.

**B. Any stack (plain HTML/CSS).** Include `structured-liquidity.css`, `structured-liquidity-components.css`, `structured-liquidity-kit.css`, and `structured-liquidity-kit.js`; load Inter and Space Mono; then use the SL classes directly. Core kit: `sl-btn`, `sl-badge`, `sl-toggle`/`sl-toggle-group`, `sl-switch`, `sl-check`, `sl-radio-item` (inside a `[data-radio-group]`), `sl-input`/`sl-label`, `sl-slider`, `sl-progress`, `sl-ava`, `sl-tabs` (`.tablist` buttons + `.panel` nodes), and overlays (`sl-overlay` + `sl-dialog`/`sl-sheet`). In plain HTML, interactive components are wired by `structured-liquidity-kit.js` via `data-toggle-aria`, `data-toggle-group`, `data-radio-group`, `data-open-overlay`, `data-close-overlay`.

## Anatomy of a stateful glass surface inside a rigid frame

```html
<div class="glass kit-cell">
  <span class="kit-cap">Title</span>
  <p>Use this treatment when the surface communicates state or depth.</p>
</div>
```

```css
/* if you are not using the kit CSS, the stateful glass recipe is: */
.stateful-glass {
  border: var(--border-w) solid rgb(var(--edge));
  border-radius: var(--radius);
  box-shadow: var(--hard-x) var(--hard-y) 0 0 var(--hard-shadow);
  background: rgba(var(--glass-tint), var(--glass-alpha));
  backdrop-filter: blur(var(--glass-blur)) saturate(150%);
}
```
