/* ============================================================
   STRUCTURED LIQUIDITY — live Tweaks panel (vanilla port).

   The original specimen drove these knobs from a React/Babel
   panel coupled to an in-editor host bridge. This is a faithful,
   dependency-free reimplementation: a floating panel that writes
   the same CSS custom properties the whole page reads from, so a
   visitor can slide between pure liquidity and pure structure in
   real time. Values persist to localStorage.
   ============================================================ */

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
  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:4px 0;
    background:rgba(var(--glass-tint),.2);outline:none;cursor:pointer}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;background:var(--accent);border:2px solid rgb(var(--edge));cursor:pointer}
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

function init(): void {
  const state = load();
  apply(state);

  const set = <K extends keyof Tweaks>(key: K, value: Tweaks[K]): void => {
    state[key] = value;
    apply(state);
    save(state);
    render();
  };

  const style = document.createElement("style");
  style.textContent = PANEL_CSS;
  document.head.appendChild(style);

  // Launcher
  const fab = el(
    "button",
    { class: "sl-tweaks-fab", "aria-label": "Open theme tweaks" },
    `<span class="knob-ic"></span>Tweak`,
  );
  document.body.appendChild(fab);

  // Panel shell
  const panel = el("div", { class: "twk-panel", role: "dialog", "aria-label": "Theme tweaks" });
  const head = el("div", { class: "twk-hd" }, `<b>Modifications</b>`);
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
