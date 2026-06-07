---
name: structured-liquidity
description: Apply the Structured Liquidity UI design language — rigid containers (sharp 90° corners, flat blurless offset shadows, solid load-bearing borders) holding semi-transparent liquid glass, with one accent and strict type roles. Use when building or restyling any UI that should follow Structured Liquidity, when the user references the language by name, or when adopting its tokens/components in a new project.
---

# Structured Liquidity

An open UI design language: **rigid containment** + **liquid depth** + **semantic clarity**. The living specimen, the machine-readable token set, and the component registry are served by the `structured-liquidity` artifact. This skill is the short version an agent needs to produce on-brand output.

## The non-negotiable rules

Follow these literally — they are what keep generated output on-brand:

1. **Square corners.** `border-radius: var(--radius)` (default `0`). Only raise deliberately.
2. **Flat offset shadows.** `box-shadow: var(--hard-x) var(--hard-y) 0 0 var(--hard-shadow)`. The blur radius is always `0`. Never use a soft/blurred shadow on a structural element.
3. **Load-bearing borders.** `var(--border-w) solid rgb(var(--edge))`. The edge is black in both light and dark mode.
4. **Exactly one accent.** `--accent` carries all emphasis. Never add a competing hue.
5. **Glass is depth, not color.** Liquid glass = `backdrop-filter: blur(var(--glass-blur))` over `rgba(var(--glass-tint), var(--glass-alpha))`. Keep it neutral/translucent.
6. **Destructive is gray, not red.** Destructive *containers* use `--neg`. Error *text* may warn in color.
7. **Fixed type roles.** display (`--display`, Archivo) = headings/buttons/brand; mono (`--mono`, Space Mono) = labels/data/captions/eyebrows; body (`--body`, Outfit) = reading copy.
8. **Leading icons.** Nav links and buttons take a leading Lucide icon, then the label.
9. **Motion proves mass.** On press/hover, nudge the element ~1px toward its shadow and grow the offset.

## Tokens

Apply these as CSS custom properties on `:root` (dark-mode defaults):

```css
:root{
  --accent:#a388ee; --accent-ink:#000000;
  --bg:#272933; --bg-2:#1f2028; --ink:#e6e6e6; --ink-dim:#9da0ab;
  --edge:0 0 0; --hard-shadow:#000000; --neg:#3c3f4b; --neg-ink:#f0f0f2;
  --glass-blur:18px; --glass-tint:255 255 255; --glass-alpha:0.07;
  --border-w:2px; --hard-x:7px; --hard-y:7px; --radius:0px;
  --display:"Archivo","Helvetica Neue",system-ui,sans-serif;
  --body:"Outfit","Helvetica Neue",system-ui,sans-serif;
  --mono:"Space Mono",ui-monospace,"SFMono-Regular",monospace;
}
```

Light mode: set `data-mode="light"` on `<html>` and override `--bg:#dfe5f2; --bg-2:#fff; --ink:#000; --ink-dim:#5b5f6b; --neg:#16171c; --neg-ink:#fff; --glass-alpha:0.55`.

The canonical machine-readable set is `design-tokens.json` (W3C Design Tokens format; each token's `$extensions.cssVar` gives the exact variable name).

## Recommended font pairings

Three roles — header / body / detail (display / body / mono). Never pair two header faces; never set body copy in the header face; use the detail mono only for labels/data/code.

- **Set 01 · Canonical — Archivo · Outfit · Space Mono** — canonical default.
- **Set 02 · Editorial — Syne · Inter · IBM Plex Mono** — expressive/editorial.
- **Set 03 · Modern — Bricolage Grotesque · Plus Jakarta Sans · JetBrains Mono** — quirky contemporary.

## Components

Pull markup from `registry.json` rather than inventing class names. Core kit: `sl-btn`, `sl-badge`, `sl-toggle`/`sl-toggle-group`, `sl-switch`, `sl-check`, `sl-radio-item` (inside a `[data-radio-group]`), `sl-input`/`sl-label`, `sl-slider`, `sl-progress`, `sl-ava`, `sl-tabs` (`.tablist` buttons + `.panel` nodes), and overlays (`sl-overlay` + `sl-dialog`/`sl-sheet`). Interactive components are wired by `structured-liquidity-kit.js` via `data-toggle-aria`, `data-toggle-group`, `data-radio-group`, `data-open-overlay`, `data-close-overlay`.

To adopt in a project: include `structured-liquidity.css`, `structured-liquidity-components.css`, `structured-liquidity-kit.css`, and `structured-liquidity-kit.js`; load the three font families; then use the documented classes.

## Anatomy of a rigid container holding glass

```html
<div class="glass kit-cell">
  <span class="kit-cap">Title</span>
  <p>Body copy inside a rigid container holding liquid glass.</p>
</div>
```

```css
/* if you are not using the kit CSS, the container recipe is: */
.container{
  border:var(--border-w) solid rgb(var(--edge));
  border-radius:var(--radius);
  box-shadow:var(--hard-x) var(--hard-y) 0 0 var(--hard-shadow);
  background:rgba(var(--glass-tint),var(--glass-alpha));
  backdrop-filter:blur(var(--glass-blur)) saturate(150%);
}
```
