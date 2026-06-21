import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   liquid visuals — React port of public/liquid-word.js
   Animated "water fill" used in two places:
     1. The hero wordmark ("Liquidity"), clipped to letterforms.
     2. The logo glyph — an isometric hypercube holding liquid.
   The SVG is built imperatively (it must measure the rendered
   glyph/letter box), so each component builds into its own host
   inside an effect. A single global rAF loop tilts every
   .lw-slosh so the liquid sloshes as the page scrolls.
   ============================================================ */

const NS = "http://www.w3.org/2000/svg";
const reduceMotion =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

function el(name: string, attrs?: Record<string, string | number>): SVGElement {
  const n = document.createElementNS(NS, name);
  if (attrs) for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  return n as SVGElement;
}

interface WaterOpts {
  level?: number;
  amp?: number;
  full?: boolean;
  wavelenRef?: number;
}

function makeWater(w: number, h: number, opts: WaterOpts = {}): SVGElement {
  const level = opts.level != null ? opts.level : h * 0.42;
  const amp = opts.amp != null ? opts.amp : h * 0.05;
  const bottom = h * 1.7;
  const ref = opts.wavelenRef || h * 0.95;
  const periods = Math.max(2, Math.round(w / ref));
  const wl = w / periods;
  const step = Math.max(2, w / 60);

  function wavePath(cls: string, lvl: number, a: number, fillDown: boolean) {
    let d = "M 0 " + lvl.toFixed(2);
    for (let x = 0; x <= 2 * w; x += step) {
      const y = lvl + a * Math.sin((2 * Math.PI * x) / wl);
      d += " L " + x.toFixed(2) + " " + y.toFixed(2);
    }
    if (fillDown)
      d +=
        " L " +
        (2 * w).toFixed(2) +
        " " +
        bottom.toFixed(2) +
        " L 0 " +
        bottom.toFixed(2) +
        " Z";
    const p = el("path", { class: cls, d });
    (p as SVGElement).style.setProperty("--w", w + "px");
    return p;
  }

  const slosh = el("g", { class: "lw-slosh" });
  const bob = el("g", { class: "lw-bob" });
  bob.style.setProperty("--amp", (h * 0.045).toFixed(2) + "px");

  if (opts.full) {
    bob.appendChild(
      el("rect", {
        class: "lw-wave-front",
        x: -w,
        y: -h,
        width: 3 * w,
        height: bottom + 2 * h,
      }),
    );
    bob.appendChild(wavePath("lw-ripple lw-ripple-a", h * 0.3, amp * 0.7, false));
    bob.appendChild(wavePath("lw-ripple lw-ripple-b", h * 0.58, amp * 0.55, false));
    bob.appendChild(wavePath("lw-shine", h * 0.16, amp * 0.6, false));
  } else {
    bob.appendChild(wavePath("lw-wave-back", level + amp * 0.55, amp * 0.8, true));
    bob.appendChild(wavePath("lw-wave-front", level, amp, true));
    bob.appendChild(wavePath("lw-shine", level, amp, false));
  }
  slosh.appendChild(bob);
  return slosh;
}

function buildText(
  span: HTMLElement,
  cs: CSSStyleDeclaration,
  w: number,
  h: number,
  fs: number,
): SVGElement {
  const t = el("text", {
    x: 0,
    y: (h * 0.5).toFixed(1),
    "dominant-baseline": "central",
    textLength: w.toFixed(1),
    lengthAdjust: "spacingAndGlyphs",
    "font-family": cs.fontFamily,
    "font-weight": cs.fontWeight,
    "font-size": fs,
  });
  t.style.fontStretch = cs.fontStretch;
  t.style.letterSpacing = cs.letterSpacing;
  t.textContent =
    span.getAttribute("data-liquid-text") || (span.textContent || "").trim();
  return t;
}

function buildWord(span: HTMLElement) {
  const cs = getComputedStyle(span);
  const w = span.offsetWidth,
    h = span.offsetHeight;
  if (!w || !h) return;
  const fs = parseFloat(cs.fontSize);

  span.querySelector("svg.liquid-svg")?.remove();

  const uid = "lw-" + Math.random().toString(36).slice(2, 8);
  const svg = el("svg", {
    class: "liquid-svg",
    viewBox: "0 0 " + w + " " + h,
    preserveAspectRatio: "none",
    "aria-hidden": "true",
  });

  const defs = el("defs");
  const clip = el("clipPath", { id: uid });
  clip.appendChild(buildText(span, cs, w, h, fs));
  defs.appendChild(clip);
  svg.appendChild(defs);

  const g = el("g", { "clip-path": "url(#" + uid + ")" });
  g.appendChild(el("rect", { class: "lw-glass", x: 0, y: 0, width: w, height: h }));
  g.appendChild(makeWater(w, h, { level: h * 0.42, amp: h * 0.05 }));
  svg.appendChild(g);

  const outline = buildText(span, cs, w, h, fs);
  outline.setAttribute("class", "lw-outline");
  svg.appendChild(outline);

  span.appendChild(svg);
  span.classList.add("is-liquid");
}

/* isometric hypercube — geometry precomputed for a 100×100 viewBox */
const CUBE = {
  outerHex: "M50 18 L77.71 34 L77.71 66 L50 82 L22.29 66 L22.29 34 Z",
  outerY: "M50 50 L50 82 M50 50 L22.29 34 M50 50 L77.71 34",
  innerHex: "M50 36.56 L61.64 43.28 L61.64 56.72 L50 63.44 L38.36 56.72 L38.36 43.28 Z",
  innerY: "M50 50 L50 63.44 M50 50 L38.36 43.28 M50 50 L61.64 43.28",
  links:
    "M50 18 L50 36.56 M77.71 34 L61.64 43.28 M77.71 66 L61.64 56.72 " +
    "M50 82 L50 63.44 M22.29 66 L38.36 56.72 M22.29 34 L38.36 43.28",
};

function buildCube(host: HTMLElement) {
  host.querySelector("svg.liquid-cube")?.remove();

  const uid = "lc-" + Math.random().toString(36).slice(2, 8);
  const svg = el("svg", {
    class: "liquid-cube",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
  });

  const defs = el("defs");
  const clip = el("clipPath", { id: uid });
  clip.appendChild(el("path", { d: CUBE.outerHex }));
  defs.appendChild(clip);
  svg.appendChild(defs);

  svg.appendChild(el("path", { class: "lw-cube-innerglass", d: CUBE.outerHex }));

  const g = el("g", { "clip-path": "url(#" + uid + ")" });
  g.appendChild(makeWater(100, 100, { full: true, amp: 7, wavelenRef: 30 }));
  svg.appendChild(g);

  svg.appendChild(
    el("path", { class: "lw-cube-edge", d: CUBE.links + " " + CUBE.outerY + " " + CUBE.innerY }),
  );
  svg.appendChild(el("path", { class: "lw-cube-edge", d: CUBE.innerHex }));
  svg.appendChild(el("path", { class: "lw-cube-shell", d: CUBE.outerHex }));

  host.appendChild(svg);
  host.classList.add("is-cube");
}

/* ---------------- scroll-driven slosh (global singleton) ---------------- */
let sloshRunning = false;
function startSlosh() {
  if (sloshRunning || reduceMotion) return;
  sloshRunning = true;
  let lastY = window.pageYOffset || 0;
  let rawV = 0,
    slosh = 0,
    sloshV = 0;

  const onScroll = () => {
    const y = window.pageYOffset || 0;
    rawV += y - lastY;
    lastY = y;
  };
  const tick = () => {
    sloshV += rawV * 0.015;
    rawV *= 0.55;
    sloshV += -slosh * 0.06;
    sloshV *= 0.86;
    slosh += sloshV;
    if (slosh > 14) slosh = 14;
    else if (slosh < -14) slosh = -14;
    const tr =
      "skewY(" + (slosh * 0.45).toFixed(2) + "deg) translateY(" + (slosh * 0.3).toFixed(2) + "px)";
    const nodes = document.querySelectorAll<HTMLElement>(".lw-slosh");
    for (let i = 0; i < nodes.length; i++) nodes[i].style.transform = tr;
    requestAnimationFrame(tick);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  requestAnimationFrame(tick);
}

/* ---------------- React components ---------------- */
export function LiquidWord({
  text = "Liquidity",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const span = ref.current;
    if (!span) return;
    const build = () => buildWord(span);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    fonts.then(build);
    const t = window.setTimeout(build, 400);
    startSlosh();
    let rt: number;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      span.querySelector("svg.liquid-svg")?.remove();
    };
  }, [text]);
  return (
    <span ref={ref} className={cn("glas", className)} data-liquid data-liquid-text={text}>
      {text}
    </span>
  );
}

export function Hypercube({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    buildCube(host);
    startSlosh();
    let rt: number;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => buildCube(host), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      host.querySelector("svg.liquid-cube")?.remove();
    };
  }, []);
  return <span ref={ref} className={cn("glyph", className)} style={style} aria-hidden="true" />;
}
