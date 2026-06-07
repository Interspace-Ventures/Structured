/* ============================================================
   STRUCTURED LIQUIDITY — live Tweaks panel (vanilla port).

   The original specimen drove these knobs from a React/Babel
   panel coupled to an in-editor host bridge. This is a faithful,
   dependency-free reimplementation: a floating panel that writes
   the same CSS custom properties the whole page reads from, so a
   visitor can slide between pure liquidity and pure structure in
   real time. Values persist to localStorage.
   ============================================================ */

import {
  createIcons,
  ArrowRight,
  ArrowUp,
  Ban,
  Bot,
  Code,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Ghost,
  LayoutGrid,
  Library,
  Palette,
  Play,
  Plus,
  Radio,
  Sparkles,
  Square,
  Trash2,
  Type,
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
  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:18px;margin:4px 0;
    background:transparent;outline:none;cursor:pointer}
  .twk-slider::-webkit-slider-runnable-track{height:4px;
    background:rgba(var(--glass-tint),.25)}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;margin-top:-7px;
    width:14px;height:14px;background:var(--accent);border:2px solid rgb(var(--edge));cursor:pointer}
  .twk-slider::-moz-range-track{height:4px;background:rgba(var(--glass-tint),.25)}
  .twk-slider::-moz-range-thumb{width:12px;height:12px;background:var(--accent);
    border:2px solid rgb(var(--edge));cursor:pointer}
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
function mountIcons(): void {
  createIcons({
    icons: {
      ArrowRight,
      ArrowUp,
      Ban,
      Bot,
      Code,
      Compass,
      Copy,
      Download,
      ExternalLink,
      FileText,
      Ghost,
      LayoutGrid,
      Library,
      Palette,
      Play,
      Plus,
      Radio,
      Sparkles,
      Square,
      Trash2,
      Type,
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

  // Map the original (sometimes near-duplicate) group names to a tight,
  // non-redundant set of filters.
  const CAT: Record<string, { key: string; label: string }> = {
    Actions: { key: "actions", label: "Actions" },
    Navigation: { key: "navigation", label: "Navigation" },
    "Forms & inputs": { key: "forms", label: "Forms" },
    "Data display": { key: "data", label: "Data" },
    "Navigation & disclosure": { key: "disclosure", label: "Disclosure" },
    "Overlays & feedback": { key: "overlays", label: "Overlays" },
    "Layout & structure": { key: "layout", label: "Layout" },
    "Fields & controls": { key: "forms", label: "Forms" },
    "Content & data": { key: "data", label: "Data" },
    "Menus & overlays": { key: "overlays", label: "Overlays" },
  };

  const order: string[] = [];
  const labels: Record<string, string> = {};
  const grid = document.createElement("div");
  grid.className = "kit-grid gallery";

  groups.querySelectorAll<HTMLElement>(".kit-group").forEach((group) => {
    const name = group.querySelector(".kg-name")?.textContent?.trim() ?? "";
    const cat = CAT[name] ?? { key: "other", label: name || "Other" };
    if (!order.includes(cat.key)) {
      order.push(cat.key);
      labels[cat.key] = cat.label;
    }
    group.querySelectorAll<HTMLElement>(".kit-cell").forEach((cell) => {
      cell.setAttribute("data-cat", cat.key);
      grid.appendChild(cell);
    });
  });

  const bar = document.createElement("div");
  bar.className = "kit-filters";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Filter components by type");

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

  bar.appendChild(makeChip("all", "All", true));
  order.forEach((k) => bar.appendChild(makeChip(k, labels[k] ?? k)));

  groups.replaceWith(bar, grid);

  const applyFilter = (f: string): void => {
    bar.querySelectorAll<HTMLButtonElement>(".kit-filter").forEach((x) => {
      const on = x.dataset.filter === f;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    grid.querySelectorAll<HTMLElement>(".kit-cell").forEach((cell) => {
      const show = f === "all" || cell.getAttribute("data-cat") === f;
      cell.classList.toggle("is-hidden", !show);
    });
  };

  bar.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".kit-filter",
    );
    if (!btn || !btn.dataset.filter) return;
    applyFilter(btn.dataset.filter);
  });
}

function init(): void {
  mountGallery();
  mountIcons();
  mountCopy();
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
      chip.addEventListener("click", () => set("accent", hex));
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
