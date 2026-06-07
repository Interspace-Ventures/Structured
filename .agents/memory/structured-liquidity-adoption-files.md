---
name: Structured Liquidity adoption files
description: Constraints for the agent-accessibility data files (llms.txt, design-tokens.json, registry.json) and skill that document the Structured Liquidity design language.
---

# Structured Liquidity — agent-accessibility files

The artifact ships machine-readable adoption files in `public/` (served at site root): `llms.txt`, `design-tokens.json` (W3C Design Tokens format, each token has `$extensions.cssVar`), `registry.json` (copy-paste component recipes). Plus a Replit skill at `.agents/skills/structured-liquidity/`.

## The distributable kit is only the 3 public CSS files + kit JS

`registry.json` and the skill tell adopters to include `structured-liquidity.css`, `structured-liquidity-components.css`, `structured-liquidity-kit.css`, `structured-liquidity-kit.js`, then use the documented classes. So **every component documented there MUST be styled by those files.**

**Do NOT document these in the registry/skill — they are styled ONLY in `index.html`'s inline `<style>`, not in any public CSS file:** `sl-navbar` (+`nb-brand`/`nb-links`/`nb-right`), `sl-input-group` (+`ig-addon`), `sl-drawer` (+`dr-grip`). Documenting them as drop-in recipes misleads adopters (they'd render unstyled).

**Why:** the original public CSS/JS are kept byte-for-byte verbatim and must never be edited, so inline-only patterns can't be promoted into the distributable kit without breaking the verbatim constraint.

## Interactive component DOM contracts (wired by `structured-liquidity-kit.js`)

When writing recipes, match the real contracts the kit JS keys off — easy to get wrong:
- **Tabs:** `.sl-tabs > .tablist > button[aria-selected]` plus sibling `.panel` nodes; active panel carries `.show`.
- **Radio group:** the `[data-radio-group]` wrapper is required; exclusivity only runs inside it, over `.sl-radio-item[aria-checked]`.
- **Checkbox:** `.sl-check[data-toggle-aria="checked"]` must contain `<span class="sl-box"><svg class="tick">…</svg></span>` or the checked state won't render.
- Other toggles use `data-toggle-aria` (`checked`/`pressed`); toggle groups use `data-toggle-group`; overlays use `data-open-overlay`/`data-close-overlay`.

**How to apply:** verify any new registry markup against `structured-liquidity-kit.js` selectors and the real markup in `index.html` before publishing — invented class names (e.g. `.tab on` for tabs) silently produce broken/unstyled output.
