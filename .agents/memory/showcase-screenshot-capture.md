---
name: Showcase screenshot capture on Replit
description: How to capture external website screenshots at a controlled viewport/zoom for the Structured Liquidity showcase cards (and why the obvious tools fail).
---

# Capturing showcase card screenshots at a controlled scale

The showcase cards (`index.html` `.show-card`) display a website screenshot in a fixed
16:10 box via `object-fit:cover; object-position:center top` — full image HEIGHT is shown,
sides cropped ~5%. So perceived "card content size" is driven entirely by the **content
scale of the source screenshot**, not the card (all cards are identical size). Full-bleed
sites with large type read bigger than centered max-width sites at the same capture width.

## To make one card's content match the others, recapture it zoomed-out
Render the site at viewport 1920x1080 with `document.documentElement.style.zoom` < 1
(e.g. `0.78` for a "little smaller" match), `deviceScaleFactor: 1`, clip to 1920x1080.
`zoom` keeps output exactly 1920x1080 (no resize, no mobile-breakpoint reflow) while
fitting more CSS px — equivalent to a wider viewport. Write straight to
`artifacts/structured-liquidity/public/<name>.png`. No markup change needed.

## Browser that actually works here (this is the non-obvious part)
- The `external_url` screenshot tool gives a FIXED 1920-wide capture — no viewport/zoom control.
- Playwright's **bundled** chromium fails to launch on this NixOS env: exit code **127**
  (missing shared libs; `playwright install-deps` cannot fix it).
- **What works:** install `chromium` as a nix system dependency via `installSystemDependencies`,
  then drive it with `playwright-core` using `executablePath` = the nix store chromium path
  (`command -v chromium`) and `args:['--no-sandbox']`. This is a one-time capture tool —
  uninstall after (`uninstallSystemDependencies`) to keep scope clean. Note the uninstall
  leaves a benign empty `replit.nix` + a `[nix] channel` line in `.replit`; both are
  tool-managed and cannot be hand-edited/reverted (the editor guard blocks it).
