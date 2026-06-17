/* ============================================================
   STRUCTURED LIQUIDITY — live Tweaks panel (vanilla port).

   The original specimen drove these knobs from a React/Babel
   panel coupled to an in-editor host bridge. This is a faithful,
   dependency-free reimplementation: a floating panel that writes
   the same CSS custom properties the whole page reads from, so a
   visitor can slide between pure liquidity and pure structure in
   real time. Values persist to localStorage.
   ============================================================ */

import catalog from "./catalog.json";

import {
  createIcons,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  ArrowUp,
  Ban,
  Bold,
  Bot,
  Check,
  Code,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Ghost,
  Info,
  Italic,
  LayoutGrid,
  Library,
  Link,
  Minus,
  Palette,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Square,
  Trash2,
  TriangleAlert,
  Type,
  Underline,
  Volume2,
} from "lucide";

type Mode = "dark" | "light";

interface Tweaks {
  accent: string;
  blur: number;
  border: number;
  shadow: number;
  radius: number;
  font: "Archivo" | "Space Grotesk" | "Syne";
  mode: Mode;
}

const DEFAULTS: Tweaks = {
  accent: "#a388ee",
  blur: 18,
  border: 2,
  shadow: 7,
  radius: 0,
  font: "Archivo",
  mode: "dark",
};

const FONTS: Record<Tweaks["font"], string> = {
  Archivo: '"Archivo", "Helvetica Neue", system-ui, sans-serif',
  "Space Grotesk": '"Space Grotesk", system-ui, sans-serif',
  Syne: '"Syne", system-ui, sans-serif',
};

const ACCENTS = ["#a388ee", "#7c9cff", "#3dd7c8", "#ffb454", "#ff7a90"];
const STORAGE_KEY = "sl-tweaks";

// accent -> readable ink for text sitting on the accent fill
function inkFor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#000000" : "#ffffff";
}

function load(): Tweaks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore malformed storage */
  }
  return { ...DEFAULTS };
}

function save(t: Tweaks): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch {
    /* storage may be unavailable; tweaks still apply for the session */
  }
}

function apply(t: Tweaks): void {
  const root = document.documentElement.style;
  root.setProperty("--accent", t.accent);
  root.setProperty("--accent-ink", inkFor(t.accent));
  root.setProperty("--glass-blur", t.blur + "px");
  root.setProperty("--border-w", t.border + "px");
  root.setProperty("--hard-x", t.shadow + "px");
  root.setProperty("--hard-y", t.shadow + "px");
  root.setProperty("--radius", t.radius + "px");
  root.setProperty("--display", FONTS[t.font] || FONTS.Archivo);
  document.documentElement.setAttribute("data-mode", t.mode);
}

const PANEL_CSS = `
  .twk-panel{position:fixed;right:18px;bottom:74px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 110px);display:none;flex-direction:column;
    background:rgba(var(--glass-tint),0.12);color:var(--ink);
    -webkit-backdrop-filter:blur(24px) saturate(150%);backdrop-filter:blur(24px) saturate(150%);
    border:var(--border-w) solid rgb(var(--edge));
    box-shadow:var(--hard-x) var(--hard-y) 0 0 var(--hard-shadow);
    font:12px/1.4 var(--mono);overflow:hidden}
  .twk-panel.open{display:flex;animation:twk-in .26s cubic-bezier(.2,.9,.2,1) both}
  @keyframes twk-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @media (prefers-reduced-motion:reduce){.twk-panel.open{animation:none}}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:12px 10px 12px 16px;border-bottom:1px solid rgba(var(--glass-tint),.14)}
  .twk-hd b{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .twk-x{appearance:none;border:0;background:transparent;color:var(--ink-dim);
    width:24px;height:24px;cursor:pointer;font-size:13px;line-height:1}
  .twk-x:hover{color:var(--ink)}
  .twk-body{padding:6px 16px 16px;display:flex;flex-direction:column;gap:12px;
    overflow-y:auto;overflow-x:hidden;min-height:0}
  .twk-sect{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    color:var(--accent);padding:8px 0 0}
  .twk-sect:first-child{padding-top:0}
  .twk-row{display:flex;flex-direction:column;gap:6px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:var(--ink-dim)}
  .twk-val{color:var(--ink);font-variant-numeric:tabular-nums}
  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:22px;margin:4px 0;
    background:transparent;outline:none;cursor:pointer}
  .twk-slider::-webkit-slider-runnable-track{height:8px;box-sizing:border-box;
    border:2px solid rgb(var(--edge));border-radius:var(--radius);
    background:rgba(var(--glass-tint),.22)}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;margin-top:-5px;
    width:16px;height:16px;background:var(--accent);border:2px solid rgb(var(--edge));
    box-shadow:2px 2px 0 0 var(--hard-shadow);cursor:pointer}
  .twk-slider::-moz-range-track{height:8px;box-sizing:border-box;
    border:2px solid rgb(var(--edge));border-radius:var(--radius);
    background:rgba(var(--glass-tint),.22)}
  .twk-slider::-moz-range-thumb{width:16px;height:16px;background:var(--accent);
    border:2px solid rgb(var(--edge));box-shadow:2px 2px 0 0 var(--hard-shadow);cursor:pointer}
  .twk-seg{display:flex;border:1px solid rgba(var(--glass-tint),.2)}
  .twk-seg button{appearance:none;flex:1;border:0;background:transparent;color:var(--ink-dim);
    font:inherit;padding:6px 4px;cursor:pointer;text-transform:capitalize}
  .twk-seg button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);font-weight:700}
  .twk-field{appearance:none;width:100%;box-sizing:border-box;padding:6px 8px;
    border:1px solid rgba(var(--glass-tint),.2);background:rgba(var(--glass-tint),.06);
    color:var(--ink);font:inherit;outline:none;cursor:pointer}
  .twk-chips{display:flex;gap:6px}
  .twk-chip{flex:1;height:30px;border:2px solid transparent;cursor:pointer;padding:0}
  .twk-chip[aria-pressed="true"]{border-color:var(--ink)}
  .twk-foot{padding:0 16px 16px}
  .twk-reset{width:100%;appearance:none;border:1px solid rgba(var(--glass-tint),.2);
    background:transparent;color:var(--ink-dim);font:inherit;padding:7px;cursor:pointer;
    text-transform:uppercase;letter-spacing:.06em;font-size:10px}
  .twk-reset:hover{color:var(--ink);border-color:rgba(var(--glass-tint),.4)}
`;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  html?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/* ============================================================
   LIVING LIQUID — dynamic, non-repeating wordmark fill.

   The original liquid-word.js fills "Liquidity" with a single
   sine wave translated by CSS keyframes (a clean, repeating
   loop). This takes ownership of the hero wordmark and drives
   the surface from a rAF loop that superimposes several
   incommensurate travelling waves with drifting amplitudes,
   a slow wandering level, scroll-driven slosh, and rising
   bubbles — so the liquid never settles into the same shape
   twice. liquid-word.js still renders the logo cube; we only
   pull the hero out of its hands (by dropping data-liquid) and
   re-apply the .is-liquid look inline so theming still flows
   from --accent / --edge.
   ============================================================ */
const SVGNS = "http://www.w3.org/2000/svg";

function svgEl(name: string, attrs: Record<string, string> = {}): SVGElement {
  const node = document.createElementNS(SVGNS, name) as SVGElement;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

interface WaveComp {
  k: number; // spatial angular frequency (rad/px)
  sp: number; // temporal speed (rad/s)
  amp: number; // base amplitude (px)
  br: number; // amplitude-breathing depth (0..1)
  brsp: number; // breathing speed (rad/s)
  ph: number; // spatial phase
  bph: number; // breathing phase
}

interface Bubble {
  x0: number;
  r: number;
  speed: number;
  phase: number;
  wob: number;
}

let relayoutLiquid: () => void = () => {};

function initLiquidWord(): void {
  const span = document.querySelector<HTMLElement>(
    ".wordmark .glas[data-liquid]",
  );
  if (!span) return;

  // Take the hero away from liquid-word.js and re-apply the is-liquid look,
  // which normally keys off [data-liquid].is-liquid in the stylesheet.
  span.removeAttribute("data-liquid");
  const s = span.style;
  s.setProperty("display", "inline-block");
  s.setProperty("position", "relative");
  s.setProperty("color", "transparent");
  s.setProperty("-webkit-text-stroke", "0");
  s.setProperty("background", "none");
  s.setProperty("text-shadow", "none");

  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // bubble tint (themed off --accent) — injected once
  if (!document.getElementById("lw-live-style")) {
    const st = document.createElement("style");
    st.id = "lw-live-style";
    st.textContent =
      ".lw-bubble{fill:color-mix(in srgb, white 80%, var(--accent));}";
    document.head.appendChild(st);
  }

  const hero: HTMLElement = span;
  let raf = 0;
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);

  function build(): void {
    cancelAnimationFrame(raf);
    const old = hero.querySelector("svg.liquid-svg");
    if (old) old.remove();

    const cs = getComputedStyle(hero);
    const w = hero.offsetWidth;
    const h = hero.offsetHeight;
    if (!w || !h) return;
    const fs = parseFloat(cs.fontSize);

    const makeText = (): SVGElement => {
      const t = svgEl("text", {
        x: "0",
        y: (h * 0.5).toFixed(1),
        "dominant-baseline": "central",
        textLength: w.toFixed(1),
        lengthAdjust: "spacingAndGlyphs",
        "font-family": cs.fontFamily,
        "font-weight": cs.fontWeight,
        "font-size": String(fs),
      });
      (t as SVGTextElement).style.fontStretch = cs.fontStretch;
      (t as SVGTextElement).style.letterSpacing = cs.letterSpacing;
      t.textContent = (hero.textContent || "").trim();
      return t;
    };

    const uid = "lwx-" + Math.random().toString(36).slice(2, 8);
    const svg = svgEl("svg", {
      class: "liquid-svg",
      viewBox: `0 0 ${w} ${h}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
    });

    const defs = svgEl("defs");
    const clip = svgEl("clipPath", { id: uid });
    clip.appendChild(makeText());
    defs.appendChild(clip);
    svg.appendChild(defs);

    const g = svgEl("g", { "clip-path": `url(#${uid})` });
    // glass tint sits INSIDE the clip group so it fills the letterforms,
    // not a full rectangle behind the word (matches liquid-word.js)
    g.appendChild(
      svgEl("rect", {
        class: "lw-glass",
        x: "0",
        y: "0",
        width: String(w),
        height: String(h),
      }),
    );
    const back = svgEl("path", { class: "lw-wave-back" });
    const front = svgEl("path", { class: "lw-wave-front" });
    const shine = svgEl("path", { class: "lw-shine" });
    // we animate via JS — silence the CSS keyframe translation
    [back, front, shine].forEach((p) => (p as SVGElement).setAttribute("style", "animation:none"));
    g.append(back, front, shine);

    // rising bubbles, only visible while submerged
    const bubbleEls: SVGElement[] = [];
    const bubbles: Bubble[] = [];
    const nB = Math.max(5, Math.min(10, Math.round(w / 70)));
    for (let i = 0; i < nB; i++) {
      const b: Bubble = {
        x0: rnd(0.04, 0.96) * w,
        r: rnd(0.012, 0.03) * h,
        speed: rnd(0.06, 0.16),
        phase: Math.random(),
        wob: rnd(0.8, 2.0),
      };
      bubbles.push(b);
      const c = svgEl("circle", { class: "lw-bubble", r: b.r.toFixed(2) });
      g.appendChild(c);
      bubbleEls.push(c);
    }
    svg.appendChild(g);

    const outline = makeText();
    outline.setAttribute("class", "lw-outline");
    svg.appendChild(outline);

    hero.appendChild(svg);
    hero.classList.add("is-liquid");

    // ---- surface model ----
    const restLevel = h * 0.46;
    const comps: WaveComp[] = [
      { cyc: 1.3, sp: 0.55, amp: 0.05, br: 0.35, brsp: 0.13 },
      { cyc: 2.7, sp: -0.85, amp: 0.032, br: 0.5, brsp: 0.19 },
      { cyc: 4.6, sp: 1.25, amp: 0.022, br: 0.6, brsp: 0.27 },
      { cyc: 7.9, sp: -1.8, amp: 0.012, br: 0.7, brsp: 0.4 },
    ].map((c) => ({
      k: (2 * Math.PI * c.cyc) / w,
      sp: c.sp,
      amp: c.amp * h,
      br: c.br,
      brsp: c.brsp,
      ph: Math.random() * Math.PI * 2,
      bph: Math.random() * Math.PI * 2,
    }));

    const drift = (t: number): number =>
      h * 0.03 * Math.sin(0.17 * t) + h * 0.02 * Math.sin(0.0723 * t + 1.3);

    let slosh = 0;
    const surf = (x: number, t: number, dy: number, tph: number): number => {
      let y = restLevel + dy + drift(t);
      for (const c of comps) {
        const amp = c.amp * (1 + c.br * Math.sin(c.brsp * t + c.bph));
        y += amp * Math.sin(c.k * x + (c.sp + tph) * t + c.ph);
      }
      y += slosh * (x / w - 0.5); // tilt with scroll momentum
      return y;
    };

    const step = Math.max(2, w / 72);
    const bottom = h * 1.6;
    const wavePath = (t: number, dy: number, tph: number): string => {
      let d = "M 0 " + surf(0, t, dy, tph).toFixed(2);
      for (let x = step; x <= w; x += step) {
        d += " L " + x.toFixed(2) + " " + surf(x, t, dy, tph).toFixed(2);
      }
      d += " L " + w.toFixed(2) + " " + surf(w, t, dy, tph).toFixed(2);
      d += " L " + w.toFixed(2) + " " + bottom.toFixed(2);
      d += " L 0 " + bottom.toFixed(2) + " Z";
      return d;
    };
    const shinePath = (t: number): string => {
      let d = "M 0 " + (surf(0, t, -h * 0.012, 0) ).toFixed(2);
      for (let x = step; x <= w; x += step) {
        d += " L " + x.toFixed(2) + " " + surf(x, t, -h * 0.012, 0).toFixed(2);
      }
      return d;
    };

    if (reduce) {
      back.setAttribute("d", wavePath(0, h * 0.05, 0.7));
      front.setAttribute("d", wavePath(0, 0, 0));
      shine.setAttribute("d", shinePath(0));
      bubbleEls.forEach((c) => c.setAttribute("opacity", "0"));
      return;
    }

    const t0 = performance.now();
    let lastScroll = window.scrollY || 0;
    let sloshV = 0;
    const cap = h * 0.13;

    const frame = (now: number): void => {
      const t = (now - t0) / 1000;

      // scroll momentum -> slosh tilt
      const y = window.scrollY || 0;
      const dv = y - lastScroll;
      lastScroll = y;
      sloshV += dv * 0.5;
      sloshV += -slosh * 0.08;
      sloshV *= 0.85;
      slosh += sloshV;
      if (slosh > cap) slosh = cap;
      else if (slosh < -cap) slosh = -cap;

      front.setAttribute("d", wavePath(t, 0, 0));
      back.setAttribute("d", wavePath(t, h * 0.05, 0.7));
      shine.setAttribute("d", shinePath(t));

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const prog = (t * b.speed + b.phase) % 1;
        const by = h * 1.04 - prog * h * 0.92;
        const bx = b.x0 + Math.sin(t * b.wob + b.phase * 6.28) * w * 0.012;
        const sLvl = surf(bx, t, 0, 0);
        const el = bubbleEls[i];
        if (by > sLvl + b.r) {
          // submerged: fade in from bottom, fade out near surface
          const depth = (by - sLvl) / h;
          const op = Math.max(0, Math.min(0.6, depth * 2.2)) * (1 - prog * 0.3);
          el.setAttribute("cx", bx.toFixed(2));
          el.setAttribute("cy", by.toFixed(2));
          el.setAttribute("opacity", op.toFixed(3));
        } else {
          el.setAttribute("opacity", "0");
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  }

  relayoutLiquid = build;
  build();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => build());
  }
  let rt = 0;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = window.setTimeout(build, 160);
  });
  // defensively stop the loop when the page is hidden/unloaded
  window.addEventListener("pagehide", () => cancelAnimationFrame(raf));
}

/* Partner icon library (Lucide). Hydrate every [data-lucide] placeholder in the
   static markup into an inline SVG. Leading icons are the design-language default
   for navbars and buttons, so the placeholders live directly in index.html. */
/* Build the equalizer bars for any [data-waveform] container (media controls
   internalized from universe.audio). data-bars = bar count, data-played = how
   many leading bars are "played" (solid accent) vs upcoming (dim). Heights come
   from layered sines so it reads like an audio envelope, not a bar chart. The
   bars are static (no animation) so the waveform reads as a calm seek display. */
function mountWaveform(): void {
  document.querySelectorAll<HTMLElement>("[data-waveform]").forEach((el) => {
    const bars = Math.max(1, Math.min(200, Number(el.dataset.bars) || 40));
    const played = Math.max(0, Math.min(bars, Number(el.dataset.played) || 0));
    el.replaceChildren();
    for (let i = 0; i < bars; i += 1) {
      const bar = document.createElement("span");
      bar.className = i < played ? "wf-bar" : "wf-bar is-future";
      const env = Math.abs(Math.sin(i * 0.45) * 0.6 + Math.sin(i * 0.17 + 1) * 0.4);
      bar.style.setProperty("--h", `${(22 + env * 70).toFixed(1)}%`);
      bar.style.setProperty("--d", `${(-(i % 7) * 0.13).toFixed(2)}s`);
      el.appendChild(bar);
    }
  });
}

function mountIcons(): void {
  createIcons({
    icons: {
      AlignCenter,
      AlignLeft,
      AlignRight,
      ArrowRight,
      ArrowUp,
      Ban,
      Bold,
      Bot,
      Check,
      Code,
      Compass,
      Copy,
      Download,
      ExternalLink,
      FileText,
      Ghost,
      Info,
      Italic,
      LayoutGrid,
      Library,
      Link,
      Minus,
      Palette,
      Pause,
      Play,
      Plus,
      Radio,
      Repeat,
      Shuffle,
      SkipBack,
      SkipForward,
      Sparkles,
      Square,
      Trash2,
      TriangleAlert,
      Type,
      Underline,
      Volume2,
    },
    attrs: { "aria-hidden": "true", "stroke-width": "2.25" },
  });
}

/* Copy-to-clipboard for the "Adopt / Build with AI" section. Each .sl-copy
   button names its source element via data-copy; we copy that element's text
   and flash a "Copied" state. Falls back to a selection+execCommand copy when
   the async clipboard API is unavailable. */
function mountCopy(): void {
  document.querySelectorAll<HTMLButtonElement>(".sl-copy[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const sel = btn.getAttribute("data-copy");
      const target = sel ? document.querySelector<HTMLElement>(sel) : null;
      if (!target) return;
      const text = target.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        try {
          document.execCommand("copy");
        } catch {
          /* clipboard unavailable; nothing more we can do */
        }
        selection?.removeAllRanges();
      }
      const label = btn.querySelector<HTMLElement>(".copy-label");
      const prev = label?.textContent ?? "Copy";
      if (label) label.textContent = "Copied";
      btn.classList.add("copied");
      window.setTimeout(() => {
        if (label) label.textContent = prev;
        btn.classList.remove("copied");
      }, 1400);
    });
  });
}

/* Components gallery: collapse the per-category kit groups into a single
   filtered gallery, where chips toggle which component cards are shown
   (in the spirit of a portfolio filter). The verbatim kit markup and styles
   are untouched — we relocate the existing cells and tag each with its
   category, so if this script never runs the grouped layout still renders. */
function mountGallery(): void {
  const groups = document.querySelector<HTMLElement>("#components .kit-groups");
  if (!groups) return;

  // Component taxonomy comes from the catalog (src/catalog.json) — the single
  // source of truth for the component inventory and how the gallery is
  // organized. The filter-chip order is the catalog's category order
  // (alphabetical); a cell is categorised by its first (primary) caption, and
  // each component's `cap` must match its .kit-cap text in index.html.
  const CATS: { key: string; label: string }[] = catalog.categories;
  const labelOf = (k: string): string =>
    CATS.find((c) => c.key === k)?.label ?? k;

  const CAT_OF: Record<string, string> = Object.fromEntries(
    catalog.components.map((c) => [c.cap, c.category] as const),
  );

  // Secondary axis: cross-cutting "kind" facets (orthogonal to category), so a
  // component can be found by what it *is* (category) and by how it *behaves*
  // (kind). Both axes AND-combine. Order/labels come from catalog.facets.
  const FACETS: { key: string; label: string }[] = catalog.facets;
  const KINDS_OF: Record<string, string[]> = Object.fromEntries(
    catalog.components.map((c) => [c.cap, c.kinds] as const),
  );

  const grid = document.createElement("div");
  grid.className = "kit-grid gallery";
  const present = new Set<string>();
  const presentFacets = new Set<string>();

  // Order the gallery alphabetically by category label, then by component name,
  // so it reads consistently regardless of the markup's source ordering. Keyed
  // off each cell's primary caption (read before it gets the category prefix).
  const primaryCap = (cell: HTMLElement): string =>
    cell.querySelector<HTMLElement>(".kit-cap")?.textContent?.trim() ?? "";
  const cells = Array.from(groups.querySelectorAll<HTMLElement>(".kit-cell"));
  cells.sort((a, b) => {
    const la = labelOf(CAT_OF[primaryCap(a)] ?? "other").toLowerCase();
    const lb = labelOf(CAT_OF[primaryCap(b)] ?? "other").toLowerCase();
    return la === lb
      ? primaryCap(a).toLowerCase().localeCompare(primaryCap(b).toLowerCase())
      : la.localeCompare(lb);
  });

  cells.forEach((cell) => {
    const cap = cell.querySelector<HTMLElement>(".kit-cap");
    const capText = cap?.textContent?.trim() ?? "";
    const key = CAT_OF[capText] ?? "other";
    if (import.meta.env.DEV && capText && !(capText in CAT_OF)) {
      console.warn(
        `[catalog] component "${capText}" is missing from src/catalog.json — add it so it's tracked and categorised.`,
      );
    }
    cell.setAttribute("data-cat", key);
    present.add(key);
    const kinds = KINDS_OF[capText] ?? [];
    if (kinds.length) cell.setAttribute("data-kinds", kinds.join(" "));
    kinds.forEach((k) => presentFacets.add(k));
    // Prefix the primary caption with its category as a breadcrumb, e.g.
    // "Navigation › Menubar" (the chevron marks the category › component
    // hierarchy; a component's own caption may still carry an em-dash
    // sub-label, e.g. "Data › Stat — metric display").
    // Guarded so a re-run doesn't stack the prefix; skips capless spacers.
    if (cap && capText && cap.dataset.cat !== key) {
      cap.textContent = `${labelOf(key)} › ${capText}`;
      cap.dataset.cat = key;
    }
    grid.appendChild(cell);
  });

  const makeChip = (
    key: string,
    label: string,
    active = false,
  ): HTMLButtonElement => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "kit-filter" + (active ? " active" : "");
    b.dataset.filter = key;
    b.setAttribute("aria-pressed", active ? "true" : "false");
    b.textContent = label;
    return b;
  };

  // Two chip rows: a primary "Type" axis (category) and a secondary "Kind"
  // axis (cross-cutting facet). Each row is its own toggle group; an "All"
  // chip clears that axis. Markup degrades gracefully if this never runs.
  const makeRow = (axis: string, axisLabel: string): HTMLElement => {
    const row = document.createElement("div");
    row.className =
      "kit-filter-row " + (axis === "cat" ? "is-primary" : "is-secondary");
    const lbl = document.createElement("span");
    lbl.className = "kit-filter-axis";
    lbl.textContent = axisLabel;
    const b = document.createElement("div");
    b.className = "kit-filters";
    b.dataset.axis = axis;
    b.setAttribute("role", "group");
    b.setAttribute("aria-label", `Filter components by ${axisLabel.toLowerCase()}`);
    row.append(lbl, b);
    return row;
  };

  const catRow = makeRow("cat", "Type");
  const catBar = catRow.querySelector<HTMLElement>(".kit-filters")!;
  catBar.appendChild(makeChip("all", "All", true));
  CATS.forEach((c) => {
    if (present.has(c.key)) catBar.appendChild(makeChip(c.key, c.label));
  });

  const facetRow = makeRow("kind", "Kind");
  const facetBar = facetRow.querySelector<HTMLElement>(".kit-filters")!;
  facetBar.appendChild(makeChip("all", "All", true));
  FACETS.forEach((f) => {
    if (presentFacets.has(f.key)) facetBar.appendChild(makeChip(f.key, f.label));
  });

  // Live count of how many cards the current filters show — makes a filter
  // change unmistakable (esp. for the secondary axis) and announces to AT.
  const count = document.createElement("p");
  count.className = "kit-result-count";
  count.setAttribute("aria-live", "polite");
  count.setAttribute("aria-atomic", "true");

  const filters = document.createElement("div");
  filters.className = "kit-filterbars";
  filters.append(catRow, facetRow, count);

  groups.replaceWith(filters, grid);

  const updateCount = (): void => {
    const total = grid.querySelectorAll(".kit-cell").length;
    const shown = grid.querySelectorAll(".kit-cell:not(.is-hidden)").length;
    count.innerHTML =
      shown === total
        ? `<b>${total}</b> components`
        : `<b>${shown}</b> of ${total} shown`;
  };
  updateCount();

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const PLAY_MS = 440;
  let flipRun = 0; // bumped per filter; stale cleanups no-op against the latest

  const clearFlip = (c: HTMLElement): void => {
    c.style.transition = "";
    c.style.transform = "";
    c.style.opacity = "";
    c.style.willChange = "";
  };

  // Active selection per axis ("all" = no constraint on that axis); a card is
  // shown only when it satisfies both.
  let activeCat = "all";
  let activeKind = "all";

  const matches = (c: HTMLElement): boolean => {
    if (activeCat !== "all" && c.getAttribute("data-cat") !== activeCat)
      return false;
    if (activeKind !== "all") {
      const kinds = (c.getAttribute("data-kinds") ?? "").split(" ");
      if (!kinds.includes(activeKind)) return false;
    }
    return true;
  };

  const setActive = (b: HTMLElement, val: string): void => {
    b.querySelectorAll<HTMLButtonElement>(".kit-filter").forEach((x) => {
      const on = x.dataset.filter === val;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  // The secondary "Kind" chips depend on the primary "Type": a kind is only
  // meaningful if some component of the active Type has it, so chips that don't
  // apply just drop off. If the currently-active Kind becomes inapplicable, fall
  // back to "all" so the gallery never filters down to nothing.
  const syncKindChips = (): void => {
    const avail = new Set<string>();
    grid.querySelectorAll<HTMLElement>(".kit-cell").forEach((c) => {
      if (activeCat !== "all" && c.getAttribute("data-cat") !== activeCat)
        return;
      (c.getAttribute("data-kinds") ?? "")
        .split(" ")
        .filter(Boolean)
        .forEach((k) => avail.add(k));
    });
    facetBar
      .querySelectorAll<HTMLButtonElement>(".kit-filter")
      .forEach((chip) => {
        const key = chip.dataset.filter ?? "";
        if (key === "all") return; // the reset chip always stays
        chip.hidden = !avail.has(key);
      });
    if (activeKind !== "all" && !avail.has(activeKind)) {
      activeKind = "all";
      setActive(facetBar, "all");
    }
  };

  const applyFilter = (): void => {
    const cells = Array.from(grid.querySelectorAll<HTMLElement>(".kit-cell"));

    if (reduceMotion) {
      cells.forEach((c) => c.classList.toggle("is-hidden", !matches(c)));
      updateCount();
      return;
    }

    const run = ++flipRun;

    // Settle any in-flight FLIP first so the "first" measurement reads real
    // flow positions, not mid-animation transforms (fixes rapid re-filtering).
    cells.forEach((c) => {
      c.style.transition = "none";
      c.style.transform = "";
      c.style.opacity = "";
    });
    void grid.offsetHeight;

    // FLIP: measure where the kept cards are now, re-pack the masonry, then
    // play each card from its old spot to its new one so matching components
    // slot into place instead of the layout teleporting.
    const first = new Map<HTMLElement, DOMRect>();
    cells.forEach((c) => {
      if (!c.classList.contains("is-hidden"))
        first.set(c, c.getBoundingClientRect());
    });

    cells.forEach((c) => c.classList.toggle("is-hidden", !matches(c)));
    updateCount();

    const last = new Map<HTMLElement, DOMRect>();
    cells.forEach((c) => {
      if (!c.classList.contains("is-hidden"))
        last.set(c, c.getBoundingClientRect());
    });

    cells.forEach((c) => {
      const lr = last.get(c);
      if (!lr) return; // filtered out — drop without animating
      const fr = first.get(c);
      if (fr) {
        const dx = fr.left - lr.left;
        const dy = fr.top - lr.top;
        if (dx || dy) c.style.transform = `translate(${dx}px, ${dy}px)`;
      } else {
        // newly matched — fade/rise into its slot
        c.style.transform = "translateY(10px) scale(0.985)";
        c.style.opacity = "0";
      }
      c.style.willChange = "transform, opacity";
    });

    void grid.offsetHeight; // commit the inverted state before playing

    cells.forEach((c) => {
      if (!last.has(c)) return;
      c.style.transition =
        "transform .44s cubic-bezier(.2,.7,.2,1), opacity .34s ease";
      c.style.transform = "";
      c.style.opacity = "1";
    });

    // Deterministic cleanup (doesn't depend on a transitionend that may never
    // fire for cards that didn't move); a newer run cancels this one.
    window.setTimeout(() => {
      if (run !== flipRun) return;
      cells.forEach(clearFlip);
    }, PLAY_MS + 80);
  };

  filters.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".kit-filter",
    );
    if (!btn || !btn.dataset.filter || btn.classList.contains("active")) return;
    const axis = btn.closest<HTMLElement>(".kit-filters")?.dataset.axis;
    if (axis === "cat") {
      activeCat = btn.dataset.filter;
      setActive(catBar, activeCat);
      syncKindChips();
    } else if (axis === "kind") {
      activeKind = btn.dataset.filter;
      setActive(facetBar, activeKind);
    } else {
      return;
    }
    applyFilter();
  });
}

/* Autocomplete: a text input with a live-filtered suggestion list. Reuses the
   kit's .sl-pop-wrap/.sl-menu dropdown, but manages its own open state and stops
   the field's clicks from reaching the kit's document-level close-all-menus
   handler. Degrades to a plain input if this never runs. */
function mountAutocomplete(): void {
  document
    .querySelectorAll<HTMLElement>("[data-autocomplete]")
    .forEach((wrap, wi) => {
      const input = wrap.querySelector<HTMLInputElement>(".sl-input");
      const menu = wrap.querySelector<HTMLElement>(".sl-menu");
      if (!input || !menu) return;
      const items = Array.from(
        menu.querySelectorAll<HTMLElement>(".item"),
      ).filter((i) => !i.classList.contains("ac-empty"));
      const empty = menu.querySelector<HTMLElement>(".ac-empty");

      // Wire up combobox semantics so the listbox is keyboard-navigable.
      menu.id = menu.id || `ac-menu-${wi}`;
      input.setAttribute("aria-controls", menu.id);
      items.forEach((it, i) => {
        it.id = it.id || `${menu.id}-opt-${i}`;
      });

      let active = -1; // index into `items` of the highlighted option, or -1

      const visible = (): HTMLElement[] =>
        items.filter((it) => it.style.display !== "none");

      const highlight = (it: HTMLElement | null): void => {
        items.forEach((x) => {
          x.classList.remove("active");
          x.removeAttribute("aria-selected");
        });
        if (it) {
          it.classList.add("active");
          it.setAttribute("aria-selected", "true");
          input.setAttribute("aria-activedescendant", it.id);
          it.scrollIntoView({ block: "nearest" });
        } else {
          input.removeAttribute("aria-activedescendant");
        }
      };

      const open = (): void => {
        menu.classList.add("open");
        input.setAttribute("aria-expanded", "true");
      };
      const close = (): void => {
        menu.classList.remove("open");
        input.setAttribute("aria-expanded", "false");
        active = -1;
        highlight(null);
      };
      const filter = (): void => {
        const q = input.value.trim().toLowerCase();
        let n = 0;
        items.forEach((it) => {
          const hit = (it.textContent ?? "").toLowerCase().includes(q);
          it.style.display = hit ? "" : "none";
          if (hit) n++;
        });
        if (empty) empty.style.display = n ? "none" : "flex";
        active = -1;
        highlight(null);
      };
      const pick = (it: HTMLElement): void => {
        input.value = it.textContent ?? "";
        filter();
        close();
      };

      const openFiltered = (): void => {
        filter();
        open();
      };
      input.addEventListener("click", (e) => {
        e.stopPropagation(); // keep the kit's document closer from firing
        openFiltered();
      });
      input.addEventListener("focus", openFiltered);
      input.addEventListener("input", openFiltered);
      input.addEventListener("blur", () => window.setTimeout(close, 120));
      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          if (!menu.classList.contains("open")) openFiltered();
          const vis = visible();
          if (!vis.length) return;
          const cur = active >= 0 ? vis.indexOf(items[active]) : -1;
          const next =
            e.key === "ArrowDown"
              ? (cur + 1) % vis.length
              : (cur - 1 + vis.length) % vis.length;
          active = items.indexOf(vis[next]);
          highlight(vis[next]);
        } else if (e.key === "Enter") {
          if (active >= 0 && items[active].style.display !== "none") {
            e.preventDefault();
            pick(items[active]);
          }
        } else if (e.key === "Escape") {
          close();
        }
      });

      items.forEach((it) => {
        it.addEventListener("mousedown", (e) => {
          e.preventDefault(); // hold focus so blur doesn't pre-empt the pick
          pick(it);
        });
      });
    });
}

/* Demo form: validates the email + terms checkbox on submit and reveals an
   inline error or success note. The checkbox toggling is the kit's job
   (data-toggle-aria); here we only read its state. */
function mountDemoForm(): void {
  document
    .querySelectorAll<HTMLFormElement>("[data-demo-form]")
    .forEach((form) => {
      const email = form.querySelector<HTMLInputElement>('input[name="email"]');
      const err = form.querySelector<HTMLElement>("[data-err]");
      const agreeErr = form.querySelector<HTMLElement>("[data-agree-err]");
      const agree = form.querySelector<HTMLElement>("[data-agree]");
      const ok = form.querySelector<HTMLElement>("[data-ok]");
      if (!email) return;

      const reset = (): void => {
        if (err) err.hidden = true;
        if (agreeErr) agreeErr.hidden = true;
        if (ok) ok.hidden = true;
      };
      email.addEventListener("input", reset);
      agree?.addEventListener("click", reset);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const agreed = agree?.getAttribute("aria-checked") === "true";
        if (err) err.hidden = validEmail;
        if (agreeErr) agreeErr.hidden = agreed;
        if (ok) ok.hidden = !(validEmail && agreed);
      });
    });
}

/* Carousel: the verbatim kit ships a CSS-only scroll-snap strip with no
   controls, which reads as broken on desktop (no buttons, ends mid-slide).
   Inject prev/next arrows + clickable dots and page one slide at a time.
   Degrades to a plain horizontal scroller if this never runs. */
function mountCarousel(): void {
  document.querySelectorAll<HTMLElement>(".sl-carousel-wrap").forEach((wrap) => {
    if (wrap.classList.contains("is-enhanced")) return;
    const track = wrap.querySelector<HTMLElement>(".sl-carousel");
    if (!track) return;
    const view = track;
    const slides = Array.from(view.querySelectorAll<HTMLElement>(".slide"));
    if (slides.length < 2) return;
    // Past this point controls are guaranteed; hide the native scrollbar.
    wrap.classList.add("is-enhanced");

    const prev = el("button", { class: "sl-carousel-btn prev", type: "button", "aria-label": "Previous slide" });
    prev.textContent = "‹";
    const next = el("button", { class: "sl-carousel-btn next", type: "button", "aria-label": "Next slide" });
    next.textContent = "›";
    const dots = el("div", { class: "sl-carousel-dots" });
    const dotBtns = slides.map((_, i) => {
      const d = el("button", { type: "button", "aria-label": `Go to slide ${i + 1}` });
      d.addEventListener("click", () => go(i));
      dots.appendChild(d);
      return d;
    });
    wrap.append(prev, next, dots);

    const base = slides[0].offsetLeft;
    let current = 0;

    function go(i: number): void {
      const idx = Math.max(0, Math.min(slides.length - 1, i));
      current = idx; // optimistic, so rapid clicks step instead of stalling
      view.scrollTo({ left: slides[idx].offsetLeft - base, behavior: "smooth" });
    }
    prev.addEventListener("click", () => go(current - 1));
    next.addEventListener("click", () => go(current + 1));

    function update(): void {
      const top = `${Math.round(view.clientHeight / 2 - 17)}px`;
      prev.style.top = top;
      next.style.top = top;
      const center = view.scrollLeft + view.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((s, i) => {
        const c = s.offsetLeft - base + s.clientWidth / 2;
        const dist = Math.abs(c - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      current = best;
      dotBtns.forEach((d, i) => d.classList.toggle("is-active", i === best));
      prev.disabled = best === 0;
      next.disabled = best === slides.length - 1;
    }

    let ticking = false;
    view.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    });
    window.addEventListener("resize", update);
    update();
  });
}

/* Marquee: the kit ships a static wrapped run of languages. Wrap it in a
   track, append a trailing separator + a full duplicate run (so the seam
   reads continuously), then let CSS stream it left at -50%. Skipped under
   reduced-motion and degrades to the static wrapped layout if JS never runs
   (the animation is gated on the .is-streaming class added here). */
function mountMarquee(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>(".sl-marquee").forEach((m) => {
    const track = m.querySelector<HTMLElement>(".sl-marquee-track");
    if (!track || track.dataset.streaming) return;
    track.dataset.streaming = "1";
    const sep = el("span", { class: "di", "aria-hidden": "true" });
    sep.textContent = "✦";
    track.appendChild(sep);
    Array.from(track.children).forEach((node) => {
      const clone = node.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("role");
      track.appendChild(clone);
    });
    m.classList.add("is-streaming");
  });
}

/* Number field: clamp the value, wire the −/+ steppers and ↑/↓ arrow keys.
   Behaviour lives here (not the verbatim kit JS); styles are inline in index.html. */
function mountNumberFields(): void {
  document.querySelectorAll<HTMLElement>("[data-numfield]").forEach((nf) => {
    const input = nf.querySelector<HTMLInputElement>(".nf-input");
    if (!input) return;
    const min = Number(nf.dataset.min ?? "-Infinity");
    const max = Number(nf.dataset.max ?? "Infinity");
    const step = Number(nf.dataset.step ?? "1");
    const clamp = (n: number): number => Math.min(max, Math.max(min, n));
    const read = (): number => {
      const v = parseFloat(input.value);
      return Number.isFinite(v) ? v : 0;
    };
    const write = (n: number): void => {
      const v = clamp(n);
      input.value = String(v);
      input.setAttribute("aria-valuenow", String(v));
    };
    nf.querySelectorAll<HTMLButtonElement>("[data-nf]").forEach((btn) => {
      btn.addEventListener("click", () => {
        write(read() + (btn.dataset.nf === "inc" ? step : -step));
      });
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        write(read() + step);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        write(read() - step);
      }
    });
    input.addEventListener("blur", () => write(read()));
  });
}

/** Liquid motion layer — press ripples, flowing tab marker, hover refraction.
 *  CSS lives in index.html's inline <style> (gated on prefers-reduced-motion);
 *  this only wires the pointer coordinates / FLIP geometry. */
const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function mountRipples(): void {
  if (prefersReducedMotion()) return;
  document.addEventListener("pointerdown", (e) => {
    const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn, .sl-btn");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.4;
    const span = document.createElement("span");
    span.className = "sl-ripple";
    span.setAttribute("aria-hidden", "true");
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    target.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  });
}

function mountTabFlow(): void {
  if (prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>(".sl-tabs").forEach((tabs) => {
    const list = tabs.querySelector<HTMLElement>(".tablist");
    if (!list) return;
    const btns = Array.from(list.querySelectorAll<HTMLButtonElement>("button"));
    if (!btns.length) return;
    tabs.classList.add("is-flowing");
    const marker = document.createElement("span");
    marker.className = "sl-tab-marker";
    marker.setAttribute("aria-hidden", "true");
    list.insertBefore(marker, list.firstChild);
    const move = (): void => {
      const active = btns.find((b) => b.getAttribute("aria-selected") === "true") ?? btns[0];
      list.style.setProperty("--tab-x", `${active.offsetLeft}px`);
      list.style.setProperty("--tab-w", `${active.offsetWidth}px`);
    };
    btns.forEach((b) => b.addEventListener("click", () => requestAnimationFrame(move)));
    move();
    window.addEventListener("resize", move);
    void document.fonts.ready.then(move);
  });
}

function mountRefraction(): void {
  if (prefersReducedMotion()) return;
  let raf = 0;
  let pending: { el: HTMLElement; x: number; y: number } | null = null;
  const flush = (): void => {
    raf = 0;
    if (!pending) return;
    pending.el.style.setProperty("--mx", `${pending.x}%`);
    pending.el.style.setProperty("--my", `${pending.y}%`);
  };
  document.addEventListener("pointermove", (e) => {
    const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".kit-cell, .show-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    pending = {
      el: card,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
    if (!raf) raf = requestAnimationFrame(flush);
  });
}

/* Accent pour: floods the freshly-picked accent across the viewport from the
   click point like liquid filling in, then drains. The page has already switched
   accent underneath (apply() ran first); this is the celebratory flourish. */
function accentPour(x: number, y: number, hex: string): void {
  if (prefersReducedMotion()) return;
  // diameter must reach the farthest viewport corner from the origin
  const far = Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  );
  const node = document.createElement("span");
  node.className = "sl-accent-pour";
  node.setAttribute("aria-hidden", "true");
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  // oversize a touch so the morphing/rotating liquid blob still covers the corners
  node.style.width = `${far * 2.5}px`;
  node.style.height = `${far * 2.5}px`;
  node.style.background = hex;
  document.body.appendChild(node);
  node.addEventListener("animationend", () => node.remove());
}

/* Hero cube parallax: the glass cube leans toward the pointer (rigid tile holds —
   the hero cube's tile is stripped, so only the liquid mark tilts). Writes --rx/--ry
   that the CSS transform reads; reduced-motion / touch skip it. */
function mountHeroTilt(): void {
  if (prefersReducedMotion()) return;
  const cube = document.querySelector<HTMLElement>(".hero-cube");
  if (!cube) return;
  const MAX = 12;
  let raf = 0;
  let rx = 0;
  let ry = 0;
  const flush = (): void => {
    raf = 0;
    cube.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    cube.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const r = cube.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    ry = Math.max(-MAX, Math.min(MAX, dx * 2 * MAX));
    rx = Math.max(-MAX, Math.min(MAX, -dy * 2 * MAX));
    if (!raf) raf = requestAnimationFrame(flush);
  });
}

/* Demo-only navigation: the component-kit demos (sidebar, navbar, nav menu,
   breadcrumb) use placeholder href="#" links purely to illustrate the component.
   Left alone, clicking them jumps the whole page to the top. Suppress that, and
   where the component has an active-route concept, move the highlight in-place. */
function mountDemoNav(): void {
  document.querySelectorAll<HTMLAnchorElement>('.kit-cell a[href="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const sidebar = a.closest<HTMLElement>(".sl-sidebar-demo");
      if (sidebar) {
        sidebar.querySelectorAll(".sb a.active").forEach((el) => el.classList.remove("active"));
        a.classList.add("active");
        return;
      }
      if (a.closest(".nb-links")) {
        const links = a.closest<HTMLElement>(".nb-links");
        links?.querySelectorAll("a[aria-current]").forEach((el) => el.removeAttribute("aria-current"));
        a.setAttribute("aria-current", "page");
      }
      // nav-menu flyout + breadcrumb have no active concept — navigation is just suppressed
    });
  });
}

function init(): void {
  mountGallery();
  mountCarousel();
  mountMarquee();
  mountNumberFields();
  mountRipples();
  mountTabFlow();
  mountRefraction();
  mountHeroTilt();
  mountWaveform();
  mountIcons();
  mountCopy();
  mountAutocomplete();
  mountDemoForm();
  mountDemoNav();
  const state = load();
  apply(state);

  const set = <K extends keyof Tweaks>(key: K, value: Tweaks[K]): void => {
    state[key] = value;
    apply(state);
    save(state);
    render();
    if (key === "font") requestAnimationFrame(() => relayoutLiquid());
  };

  const style = document.createElement("style");
  style.textContent = PANEL_CSS;
  document.head.appendChild(style);

  // Launcher
  const fab = el(
    "button",
    { class: "sl-tweaks-fab", "aria-label": "Open theme tweaks" },
    `<span class="knob-ic"></span>Mods`,
  );
  document.body.appendChild(fab);

  // Panel shell
  const panel = el("div", { class: "twk-panel", role: "dialog", "aria-label": "Theme tweaks" });
  const head = el("div", { class: "twk-hd" }, `<b>Mods</b>`);
  const close = el("button", { class: "twk-x", "aria-label": "Close" }, "✕");
  head.appendChild(close);
  const body = el("div", { class: "twk-body" });
  const foot = el("div", { class: "twk-foot" });
  const reset = el("button", { class: "twk-reset" }, "Reset to defaults");
  foot.appendChild(reset);
  panel.append(head, body, foot);
  document.body.appendChild(panel);

  let open = false;
  const toggle = (next: boolean): void => {
    open = next;
    panel.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", String(open));
  };
  fab.addEventListener("click", () => toggle(!open));
  close.addEventListener("click", () => toggle(false));
  reset.addEventListener("click", () => {
    Object.assign(state, DEFAULTS);
    apply(state);
    save(state);
    render();
  });

  function sliderRow(
    label: string,
    key: "blur" | "radius" | "border" | "shadow",
    min: number,
    max: number,
  ): HTMLElement {
    const row = el("div", { class: "twk-row" });
    row.appendChild(
      el(
        "div",
        { class: "twk-lbl" },
        `<span>${label}</span><span class="twk-val">${state[key]}px</span>`,
      ),
    );
    const input = el("input", {
      type: "range",
      class: "twk-slider",
      min: String(min),
      max: String(max),
      value: String(state[key]),
    });
    input.addEventListener("input", () => set(key, Number(input.value)));
    row.appendChild(input);
    return row;
  }

  function render(): void {
    body.innerHTML = "";

    body.appendChild(el("div", { class: "twk-sect" }, "Liquidity"));
    body.appendChild(sliderRow("Glass blur", "blur", 0, 40));
    body.appendChild(sliderRow("Corner radius", "radius", 0, 40));

    body.appendChild(el("div", { class: "twk-sect" }, "Structure"));
    body.appendChild(sliderRow("Border weight", "border", 0, 5));
    body.appendChild(sliderRow("Flat shadow", "shadow", 0, 16));

    body.appendChild(el("div", { class: "twk-sect" }, "Voice"));

    // Display font
    const fontRow = el("div", { class: "twk-row" });
    fontRow.appendChild(el("div", { class: "twk-lbl" }, `<span>Display font</span>`));
    const select = el("select", { class: "twk-field" }) as HTMLSelectElement;
    (Object.keys(FONTS) as Tweaks["font"][]).forEach((f) => {
      const opt = el("option", { value: f }, f) as HTMLOptionElement;
      if (f === state.font) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => set("font", select.value as Tweaks["font"]));
    fontRow.appendChild(select);
    body.appendChild(fontRow);

    // Accent chips
    const accRow = el("div", { class: "twk-row" });
    accRow.appendChild(el("div", { class: "twk-lbl" }, `<span>Accent</span>`));
    const chips = el("div", { class: "twk-chips" });
    ACCENTS.forEach((hex) => {
      const chip = el("button", {
        class: "twk-chip",
        style: `background:${hex}`,
        "aria-pressed": String(hex === state.accent),
        "aria-label": `Accent ${hex}`,
      });
      chip.addEventListener("click", (e) => {
        set("accent", hex);
        let x = e.clientX;
        let y = e.clientY;
        if (!x && !y) {
          // keyboard-activated: pour from the chip's own centre
          const r = chip.getBoundingClientRect();
          x = r.left + r.width / 2;
          y = r.top + r.height / 2;
        }
        accentPour(x, y, hex);
      });
      chips.appendChild(chip);
    });
    accRow.appendChild(chips);
    body.appendChild(accRow);

    // Mode segmented control
    const modeRow = el("div", { class: "twk-row" });
    modeRow.appendChild(el("div", { class: "twk-lbl" }, `<span>Mode</span>`));
    const seg = el("div", { class: "twk-seg", role: "radiogroup" });
    (["dark", "light"] as Mode[]).forEach((m) => {
      const btn = el("button", { "aria-pressed": String(m === state.mode) }, m);
      btn.addEventListener("click", () => set("mode", m));
      seg.appendChild(btn);
    });
    modeRow.appendChild(seg);
    body.appendChild(modeRow);
  }

  render();
}

// Claim the hero wordmark before liquid-word.js's DOMContentLoaded handler
// fires (module scripts run after parse but before that event), so the
// original skips it and only our living-liquid renderer drives it.
initLiquidWord();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
