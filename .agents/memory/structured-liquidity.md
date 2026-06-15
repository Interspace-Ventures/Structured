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

**Verbatim-public guard covers BINARIES too, not just `*.css`/`*.js`:** `public/opengraph.jpg` has silently drifted (tooling/editor re-encoded it). When verifying the constraint, check the WHOLE `public/` dir (`git --no-optional-locks status --porcelain public/`), and restore any unintended change — including binaries — with `git --no-optional-locks show HEAD:<path> > <path>` (checkout/restore are sandbox-blocked).

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

## Components section is a runtime-built filtered gallery
The `#components` section ships as the original per-category `.kit-group` blocks in `index.html`, but `mountGallery()` in `src/main.ts` rewrites it at runtime into one `.kit-grid.gallery` with `.kit-filters` chips (toggle `.is-hidden` per `data-cat`).

**Why:** keeps the verbatim `public/*` kit untouched and degrades gracefully (grouped layout still renders if JS fails); moving existing cells via `appendChild` preserves the kit-JS listeners (kit.js attaches on `DOMContentLoaded` before main.ts's handler runs).

**How to apply:** the Type filter chips and each cell's category are NOT derived from the markup's `.kit-group` names — they come from `src/catalog.json` (`categories` order + per-component `category`, keyed by caption). Edit the catalog, not a map in `mountGallery()`, to re-file or reorder components. Chip styling is inline in `index.html` (`.kit-filters`/`.kit-filter`).

**Gallery filtering is TWO orthogonal axes (AND-combined):** `src/catalog.json` carries a primary axis (`categories` + per-component `category`) AND a secondary axis (top-level `facets` + per-component `kinds[]`). `mountGallery()` renders two chip rows ("Type" = category, "Kind" = facet), tags each cell with `data-cat` + `data-kinds`, and a card shows only when it satisfies BOTH active chips (each row has its own "All" reset). So when comparing against another component library (e.g. coss.com/ui/particles, which also uses a type list + cross-cutting state chips), missing-component gaps go in `categories`/`components`, cross-cutting concerns go in `facets`/`kinds` — adding a facet there auto-renders a new Kind chip; no JS edit needed.

**Two filter rows MUST read as a hierarchy, or users think the secondary one is broken:** a working secondary axis still feels dead if it looks identical to the primary (same chip + same accent-fill active state). The fix that landed: the secondary "Kind" row is visually subordinate — `makeRow()` tags rows `.is-primary`/`.is-secondary`; CSS gives Kind a hollow accent axis-marker (vs filled), smaller/flatter chips (no flat offset shadow), and an accent-OUTLINE active state (tinted bg `color-mix(... accent 16%)` + accent text/border) vs the Type row's solid accent FILL — distinct hierarchy while honoring the language's ONE-accent rule (don't reach for a 2nd color). Also add a live `aria-live` result count (`<b>N</b> of TOTAL shown`) updated in BOTH `applyFilter` branches (reduce-motion + FLIP) so any filter change is unmistakable. **Why:** the user reported the secondary filter "doesn't seem to be doing anything" purely because of weak visual feedback, not a logic bug.

**Secondary "Kind" chips are DEPENDENT on the primary "Type" (drop off when N/A):** per a follow-up request, `syncKindChips()` (called in the Type click branch before `applyFilter()`) hides each non-"All" Kind chip whose facet has no component of the active Type (`chip.hidden = true`, which also drops it from the a11y tree; the "All" chip always stays), and resets `activeKind` to "all" if the active kind just became inapplicable — so the gallery never filters to zero. Returning Type to "All" un-hides every Kind chip; an active kind that's STILL applicable under the new Type is intentionally NOT reset.

## Reusing the verbatim `.sl-menu` for a NEW custom dropdown (autocomplete, etc.)
A new dropdown (built inline in `index.html`, wired in a `mount*()` in `main.ts`) can reuse the kit's `.sl-pop-wrap`/`.sl-menu` styling, but the verbatim kit JS owns two behaviors that will fight you:
- A **document-level `closeAllMenus` on ANY click** (`document.addEventListener("click", …)`); the kit's own `[data-pop]` triggers survive it via `e.stopPropagation()`. So your opener (e.g. the input's `click`) MUST also `stopPropagation`, or the menu closes on the very click that opens it.
- The kit's command-palette filter only binds to `.sl-cmd-search` inputs, so a plain `.sl-input` won't get its filtering for free — implement filtering yourself (toggle each `.item`'s inline `display`, mirroring the kit's own `it.style.display` approach; the `.item` class beats `[hidden]`, so use inline display, not the `hidden` attr).

**How to apply:** open on focus/click/input; close on `blur` with a ~120ms delay; on option `mousedown` call `e.preventDefault()` (holds input focus so blur doesn't pre-empt the pick) then set value + close. For keyboard a11y make it a real combobox: `role=combobox`/`aria-controls`/`aria-expanded` on the input, give options ids, and on Arrow/Enter/Escape move an `.active` highlight (`.item.active` already styles to the accent in the verbatim kit CSS) + `aria-activedescendant`. Mirror this for any inline-built form widget; per the adoption-files rule these NEW inline components go in `catalog.json` (for the live gallery) but NOT in `registry.json`/SKILL.md.

## Partner icon library = Lucide (vanilla, not lucide-react)
Leading icons are the design-language **default** for navbars and buttons. They are real inline SVGs from the vanilla `lucide` package, hydrated from `<i data-lucide="kebab-name">` placeholders by `createIcons()` in `src/main.ts` (`mountIcons()`), called at the top of `init()`.

**Why:** the SL language mirrors shadcn, whose canonical icon partner is Lucide. The site is plain HTML/CSS/JS, so the vanilla `lucide` package fits; the React-era deps (`lucide-react`, radix, react, etc.) still listed in `package.json` are leftovers from the stripped scaffold and are **unused / non-functional** here.

**How to apply:** to add an icon — drop `<i data-lucide="name"></i>` as the first child of the nav link / `.btn` / `.sl-btn`, then `import { Name }` and add it to the `mountIcons()` icons map (PascalCase). Sizing/alignment is one inline `<style>` block in `index.html` (`.btn svg`, `.sl-btn svg`, `.nav .links a` made inline-flex). `.btn`/`.sl-btn` already are inline-flex with a gap, so icons align for free.

## Cube logo (`.glyph`) reuse gotchas
The hypercube mark = base `.glyph` glass tile + SVG hypercube/liquid added by `liquid-word.js buildCube()` (sets `.is-cube`, removes the CSS `::before` liquid). To make the mark identical everywhere, style `.glyph.is-cube` globally (light `--ink` shell/edge strokes + accent innerglass) instead of scoping to `.brand` — the base tile then stays on nav/footer/CTA/hero alike.

**Gotcha 1 — sizing:** `.glyph` is a `<span>` (display:inline); its `width/height:var(--s)` only take effect when it's a flex/grid *item*. It renders elsewhere only because `.brand`/CTA parents are flex. A new instance in a plain block collapses to a sliver — wrap it in a `display:flex` container.

**Gotcha 2 — big sizes:** cube strokes use `vector-effect:non-scaling-stroke`, so a blown-up cube gets hair-thin wireframe. For a large hero cube, override `vector-effect:none` (strokes then scale with the square viewBox) and set explicit stroke-widths. Make the override win specificity with `.hero-cube.is-cube .lw-cube-*` (ties the global 3-class rule, later in source).

## Carousel (and other CSS-only kit stubs) need JS wired in main.ts
The verbatim kit ships several components as static CSS-only stubs — e.g. the Carousel was a bare `.sl-carousel` scroll-snap strip with no buttons/dots, which reads as broken on desktop. Their *styles* live inline in `index.html` (NOT in `public/*.css`), so edit those freely; add the *behavior* (prev/next + dots, scroll-snap paging, active-state on a rAF-throttled scroll handler) in a `mount*()` in `src/main.ts` called from `init()` after `mountGallery()` (the gallery relocates cells via appendChild but keeps them intact).

**Gotcha — graceful degradation when hiding a native affordance:** if your JS enhancement *removes* a built-in affordance (e.g. hiding the scrollbar because you added buttons), gate the hiding behind a class the JS adds (`.sl-carousel-wrap.is-enhanced .sl-carousel{scrollbar-width:none}`), not unconditional CSS. Otherwise a no-JS visitor loses both the controls *and* the scrollbar and can't reach later slides.

**Why:** matches the project's standing rule that the page must still work if `main.ts` never runs (same reason `mountGallery` keeps the grouped fallback).

**How to apply:** TS narrowing of a null-checked `const` does NOT carry into nested closures — alias it (`const view = track;`) after the guard. Add an idempotency guard (skip if already `.is-enhanced`) and update the index optimistically in the paging fn so rapid clicks step instead of stalling on the async scroll handler.

**Marquee (same pattern):** the Menubar–marquee was a static `flex-wrap:wrap` run; to stream it, wrap items in a `.sl-marquee-track`, gate `nowrap`+`@keyframes translateX(0→-50%)` behind a JS-added `.is-streaming` (no-JS keeps the wrapped static list). Seamless loop needs the track to hold exactly TWO identical units — in `mountMarquee()` append a trailing separator, then clone the run via `Array.from(track.children)` (snapshot BEFORE appending, or clones grow infinitely), marking clones `aria-hidden`+role-stripped; bail under `prefers-reduced-motion`. Put `role="presentation"` on the track so the `role=list`→`listitem` semantics pass through the wrapper div.

**Cube outline color:** all `.glyph.is-cube` cubes (nav/hero/CTA/footer) share one stroke rule, inline in index.html — NOT in verbatim public CSS (public already strokes them black via `rgb(var(--edge))`). The inline override historically recolored them to `var(--ink)` (white-on-dark). To make cubes black again use `rgb(var(--edge))` (and `color-mix(in srgb, rgb(var(--edge)) 80%, transparent)` for inner edges); `--edge` is the raw triplet `0 0 0` in both modes. Changing this one rule retints every cube at once, so nav logo and hero cube stay matched.

**Hero cube as background watermark (gotchas):** (1) `.glyph` is an inline `<span>` with NO `display` of its own — it only gets its `width/height` (`--s`) by being a flex item. If you change its wrapper off flex (e.g. to `display:block`), the glyph collapses to 0×0 and the cube vanishes; fix by setting `display:block` on the glyph itself. (2) The `.reveal` scroll-in class ends at `transform:none` (and starts `opacity:0`), which clobbers any layout `transform` (e.g. `translateY(-50%)` centering) on the element — strip `reveal` from elements you position with transforms. (3) Container-less on the dark hero: the 22% inner-glass fill + black edges are invisible without the tile backdrop — raise `.lw-cube-innerglass` fill (~50% accent) so the mark reads. Anchor the absolute cube to `.hero` (position:relative + overflow:hidden), NOT to `.hero-grid`, and keep copy above via z-index.

**Component gallery taxonomy:** the single source of truth is `src/catalog.json` (`categories` + `components` each with `name`/`cap`/`category`/`status`/`tags`); `mountGallery()` builds its `CATS`/`CAT_OF` from it, so categories are assigned per-component by the catalog's caption(`cap`)→category map, NOT by the markup's `.kit-group` nesting (the original groups had odd placements e.g. Menubar under Actions, Marquee under Navigation). Non-obvious DOM contract to respect when editing categories: some `.kit-cell`s hold TWO `.kit-cap`s (a primary + a secondary that "rides along" — e.g. Command/combobox lives inside the Select cell, Tooltip·hover card inside the Avatar cell), and a few cells are capless layout spacers. Categorization keys off the FIRST cap only; spacers fall to `data-cat="other"` and show only under "All". When adding a component, add an entry to `src/catalog.json` whose `cap` matches the new primary `.kit-cap` EXACTLY (mind unicode: em dash —, middot ·, `&`) — otherwise it silently becomes "other" (a dev-only `console.warn` flags any uncatalogued cap).

**Styled scrollbars (gotcha):** style them in `index.html` inline `<style>`, not the verbatim public CSS. DON'T set `scrollbar-width`/`scrollbar-color` globally on `*` — modern Chrome then switches to the native thin scrollbar and IGNORES every `::-webkit-scrollbar` rule, leaving a default grey bar (this was the bug). Instead: drive Chrome+Safari purely via `::-webkit-scrollbar*` pseudo-elements, and feed Firefox the standard `scrollbar-width`/`scrollbar-color` only inside `@supports not selector(::-webkit-scrollbar){ html{...} }`. Also: `--glass-tint` is a SPACE-separated triplet (`255 255 255`), so use modern `rgb(var(--glass-tint) / 0.06)` slash syntax for scrollbar colours (legacy `rgba(...,a)` parses inconsistently in the `scrollbar-color` shorthand). Headless screenshots don't render OS scrollbars, so they can't verify this — reason about it instead.

**Pillars are three orthogonal axes (content decision):** the framework is exactly THREE pillars — Structured Containment (structure), Liquid Depth (material), Semantic Clarity (function). "Tactile Glass" is NOT a fourth pillar — it's a vivid restatement of the material axis, so it folds into Liquid Depth (which already names it). Keep the hero tenet tags in lockstep with the three pillar headings (don't reintroduce a 4th). **Why:** swapping Tactile Glass in for Semantic Clarity yields two material pillars and drops the function/readability principle; also the name "Structured Liquidity" deliberately echoes through Pillar 01 *Structured* / Pillar 02 *Liquid*, so renaming those breaks the echo.

## Showcase = product-card grid (mode-aware overlay gotcha)
The Showcase renders `.show-grid` of `.show-card` cards (each a single `<a class="show-card glass">` = browser-bar + screenshot + always-visible foot with avatar/name/tag/badge). The description + Visit CTA live in a `.show-card-veil` overlay revealed on `:hover`/`:focus-visible`; on touch it becomes a persistent bottom gradient panel via `@media (hover:none)` (touch has no hover state before navigation). CTA is a `<span>`, never a nested `<a>`. Add a product = copy one card block + drop its screenshot in `public/`.

**Gotcha — mode-aware text overlays must key off `--bg`, NOT `--glass-tint`:** `--glass-tint` is white (`255 255 255`) in BOTH dark and light modes, so a glass-tinted scrim under `var(--ink)` text washes out in dark mode (light text on near-white). Base any text-bearing overlay on the mode-aware page bg: `rgba(39,41,51,.x)` (dark `#272933`) + a `[data-mode="light"]` override `rgba(223,229,242,.x)` (light `#dfe5f2`), with `var(--ink)` text.

**Gotcha — `.wrap` caps at `min(1200px,92vw)`:** an `auto-fit, minmax(MIN,1fr)` grid only reaches N columns if `N*MIN + (N-1)*gap ≤ 1200`. For 4-across at a 1.2rem gap, MIN must be ≤ ~270px (used 260px). Cap a lone card with `max-width` + `margin-inline:auto` so a single item doesn't stretch full-width.

**Rendered component order is governed by the gallery JS, not the HTML kit-groups:** `mountGallery()` in `src/main.ts` REPLACES the `#components .kit-groups` markup (its category headers are never shown) with filter chips + one flat masonry grid (`column-count:3`), using a caption-keyed taxonomy (`CAT_OF` map → `CATS` chip list) that is built from `src/catalog.json` (the single source of truth). So any request to reorder/regroup the *visible* components is driven by `src/catalog.json` (categories order + per-component category) plus the cell sort in `src/main.ts`, not by the HTML. The HTML kit-group order only affects the no-JS fallback. **Why:** the two taxonomies legitimately differ (e.g. HTML files Badge under "Actions" but the gallery files it under "Data"), so editing only the HTML looks correct in source but does nothing to the rendered page.

**Lucide has NO brand icons (e.g. `Github`):** the vanilla `lucide` package dropped all brand glyphs, so `import { Github }` fails typecheck (`TS2305 has no exported member 'Github'`). Icons are the design-language default for nav/buttons here, so when a button needs a brand mark, fall back to a generic semantic icon (e.g. `download` for an "Install"→GitHub CTA) rather than chasing a brand icon. **How to apply:** before adding any `data-lucide="x"` + import, confirm `x` exists in `node_modules/lucide/dist/lucide.d.ts`.
