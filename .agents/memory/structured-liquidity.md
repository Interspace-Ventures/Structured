---
name: Structured Liquidity design language
description: The durable decisions behind the SL specimen port — what it is, and the host-coupling trap to avoid when reusing it.
---

# Structured Liquidity

An open UI design language ("rigid containment + viscous glass + semantic clarity") shipped as a live specimen at `artifacts/structured-liquidity`. Token reference, file map, and pillars are documented in `replit.md` — don't duplicate them; read there.

## The non-obvious trap (why the port isn't a verbatim copy)
The original framework's "live tweaks" panel and its `<image-slot>` showcase element were **React/Babel components coupled to a proprietary in-editor "omelette" host bridge** (`window.parent.postMessage` + `__edit_mode_*` / `__activate_edit_mode`). That host **does not exist in a deployment**, so a verbatim copy yields an invisible tweaks panel and an empty "drop a screenshot" slot in production.

**Decision:** keep the plain CSS/JS verbatim in `public/`, but rebuild the tweaker in vanilla TS (`src/main.ts`) and replace the image-slot with a static CSS visual.

**Why:** preserves the "living" theme editor for real visitors without the missing host.

**How to apply:** if you ever re-import omelette/host-coupled artifacts (anything referencing `__edit_mode_*`, `__activate_edit_mode`, or `window.parent.postMessage` to a host), expect it to be dead outside the editor — reimplement the behavior standalone. Don't edit the verbatim files in `public/`; extend via `index.html` or `src/main.ts`.

## Overriding `liquid-word.js` without editing it
The hero "Liquidity" wordmark is driven by a richer JS renderer in `src/main.ts` (multi-wave, non-repeating, bubbles) that *takes the hero away from* the verbatim `liquid-word.js`.

**The trick:** `liquid-word.js` claims `.glas[data-liquid]` from a `DOMContentLoaded` handler; a `type=module` script's top-level code runs *after parse but before* `DOMContentLoaded`. So `main.ts` removes the `data-liquid` attribute at module top-level → the original skips the hero (still renders the `.glyph` logo cube). Because the `.glas[data-liquid].is-liquid` stylesheet rule no longer matches, re-apply that look via inline styles (`color:transparent`, no text-stroke/bg/shadow) and add the `is-liquid` class.

**Why:** lets us evolve one specific behavior while keeping `public/*.js` byte-for-byte verbatim and avoiding duplicate SVGs / timer races.

**How to apply:** reuse the same CSS classes (`lw-glass`, `lw-wave-back/front`, `lw-shine`, `lw-outline`) so theming keeps flowing from `--accent`/`--edge`; keep the glass rect *inside* the clip group (clipped to letters, not a full rectangle); silence the CSS keyframes on JS-animated paths via inline `animation:none`; rebuild on `fonts.ready`/resize/font-tweak and cancel the rAF on `pagehide`.

## Screenshotting reveal-gated content deep in the page
Deep-linking to a hash (`/#anchor`) and screenshotting lands on blank space for content far down the page: the scroll-reveal keeps `.reveal{opacity:0}` and the deep-anchor jump doesn't reliably trigger the IntersectionObserver before capture (there is a ~1800ms fallback that reveals all, but screenshots fire sooner).

**The trick (temp inline `<style>` in `index.html`, removed after):** force `.reveal{opacity:1!important;transform:none!important}`, set `html{scroll-behavior:auto!important}`, then *pull the target to the top of its section* by hiding its siblings — e.g. `#components .kit-group{display:none!important}` + `#components #TARGET, #components #TARGET ~ .kit-group{display:block!important}`. So it fits one viewport at the section anchor.

**Why:** static screenshots can't scroll; forcing reveal alone isn't enough because the deep-anchor scroll still lands on emptiness.

**Gotcha:** specificity — `#components .kit-group` (id+class) outranks a bare `#TARGET` (id only) even with `!important`, so the target itself stays hidden; qualify it as `#components #TARGET` to win. Strip all temp rules + any temp `id` afterward (grep `TEMP-VERIFY`).
