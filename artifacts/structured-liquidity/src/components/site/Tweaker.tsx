import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/* ============================================================
   Live theme tweaker — React port of the original vanilla panel.
   Writes the same CSS custom properties the SL
   stylesheet reads, persists to localStorage ("sl-tweaks"), and
   pours an accent ripple when a swatch is picked. The grouped FAB
   dock (mode toggle + "Mods") opens the popover panel. Panel /
   chrome styling lives in src/styles/40-inline.css.
   ============================================================ */

type Mode = "dark" | "light";

interface Tweaks {
  accent: string;
  blur: number;
  border: number;
  shadow: number;
  radius: number;
  mode: Mode;
}

const DEFAULTS: Tweaks = {
  accent: "#a388ee",
  blur: 18,
  border: 2,
  shadow: 7,
  radius: 0,
  mode: "light",
};

const ACCENTS = ["#a388ee", "#7c9cff", "#3dd7c8", "#ffb454", "#ff7a90"];
const STORAGE_KEY = "sl-tweaks-v2";

/* accent -> readable ink for text sitting on the accent fill */
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
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Tweaks>) };
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
  /* Dark backgrounds are derived from --accent in CSS. Clear legacy inline
     overrides so changing the accent always retunes the full page field. */
  root.removeProperty("--bg");
  root.removeProperty("--bg-2");
  document.documentElement.setAttribute("data-mode", t.mode);
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* expanding liquid blob that floods the viewport from the pick point */
function accentPour(x: number, y: number, hex: string): void {
  if (prefersReducedMotion()) return;
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
  node.style.width = `${far * 2.5}px`;
  node.style.height = `${far * 2.5}px`;
  node.style.background = hex;
  document.body.appendChild(node);
  node.addEventListener("animationend", () => node.remove());
}

export function Tweaker() {
  const [state, setState] = useState<Tweaks>(() => {
    const t = load();
    apply(t);
    return t;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apply(state);
    save(state);
  }, [state]);

  const set = useCallback(
    <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
      setState((prev) => {
        const next = { ...prev, [key]: value };
        return next;
      });
    },
    [],
  );

  const reset = () => {
    setState({ ...DEFAULTS });
  };

  const sliderRow = (
    label: string,
    key: "blur" | "radius" | "border" | "shadow",
    min: number,
    max: number,
  ) => (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
        <span className="twk-val">{state[key]}px</span>
      </div>
      <input
        type="range"
        className="twk-slider"
        min={min}
        max={max}
        value={state[key]}
        onChange={(e) => set(key, Number(e.target.value))}
      />
    </div>
  );

  return (
    <>
      <div className="sl-fab-dock">
        <button
          type="button"
          className="sl-tweaks-fab sl-mode-fab"
          aria-label="Toggle dark or light mode"
          aria-pressed={state.mode === "dark"}
          onClick={() => set("mode", state.mode === "dark" ? "light" : "dark")}
        >
          {state.mode === "dark" ? <Moon /> : <Sun />}
          <span className="sl-mode-lbl">
            {state.mode === "dark" ? "Dark" : "Light"}
          </span>
        </button>
        <button
          type="button"
          className="sl-tweaks-fab"
          aria-label="Open theme tweaks"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="knob-ic" />
          Mods
        </button>
      </div>

      <div
        className={"twk-panel" + (open ? " open" : "")}
        role="dialog"
        aria-label="Theme tweaks"
      >
        <div className="twk-hd">
          <b>Mods</b>
          <button
            type="button"
            className="twk-x"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="twk-body">
          <div className="twk-sect">Liquidity</div>
          {sliderRow("Glass blur", "blur", 0, 40)}
          {sliderRow("Corner radius", "radius", 0, 40)}

          <div className="twk-sect">Structure</div>
          {sliderRow("Border weight", "border", 0, 5)}
          {sliderRow("Flat shadow", "shadow", 0, 16)}

          <div className="twk-sect">Voice</div>
          <div className="twk-row">
            <div className="twk-lbl">
              <span>Accent</span>
            </div>
            <div className="twk-chips">
              {ACCENTS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  className="twk-chip"
                  style={{ background: hex }}
                  aria-pressed={hex === state.accent}
                  aria-label={`Accent ${hex}`}
                  onClick={(e) => {
                    set("accent", hex);
                    let x = e.clientX;
                    let y = e.clientY;
                    if (!x && !y) {
                      const r = e.currentTarget.getBoundingClientRect();
                      x = r.left + r.width / 2;
                      y = r.top + r.height / 2;
                    }
                    accentPour(x, y, hex);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="twk-foot">
          <button type="button" className="twk-reset" onClick={reset}>
            Reset to defaults
          </button>
        </div>
      </div>
    </>
  );
}
