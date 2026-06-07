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
