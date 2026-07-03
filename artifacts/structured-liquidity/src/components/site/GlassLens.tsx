/* Draggable "liquid glass" lens (hero) — the viral Apple-style refraction
   (liquid-glass-react: SVG displacement + chromatic aberration + elastic
   follow) held inside SL's rigid chrome. The chrome (border, flat offset
   shadow, token radius) lives on this component's OWN fixed shell, which
   clips an oversized glass interior — so the elastic wobble only moves the
   liquid inside while the frame holds (rigid-frame-liquid-inside rule).
   Specimen-only; not a registry item. Desktop fine-pointer only; elasticity
   is disabled under prefers-reduced-motion. */
import { useEffect, useRef, useState } from "react";
import LiquidGlass from "liquid-glass-react";
import { Move } from "lucide-react";

export function GlassLens() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const grip = useRef({ dx: 0, dy: 0, on: false });

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    if (!matchMedia("(min-width: 941px)").matches) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;
    heroRef.current = hero;
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const r = hero.getBoundingClientRect();
    setPos({ x: r.width * 0.58, y: r.height * 0.5 });
    setReady(true);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    grip.current = { on: true, dx: e.clientX - r.left, dy: e.clientY - r.top };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!grip.current.on) return;
    const hero = heroRef.current;
    const el = wrapRef.current;
    if (!hero || !el) return;
    const hr = hero.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const x = Math.min(Math.max(e.clientX - hr.left - grip.current.dx, 0), hr.width - w);
    const y = Math.min(Math.max(e.clientY - hr.top - grip.current.dy, 0), hr.height - h);
    setPos({ x, y });
  };

  const onPointerUp = () => {
    grip.current.on = false;
    setDragging(false);
  };

  if (!ready) return null;

  return (
    <div
      ref={wrapRef}
      className={`sl-lens${dragging ? " is-dragging" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-hidden="true"
    >
      {/* rigid shell clips this; the glass body is oversized by 10px per
          side so the elastic wobble + edge stretch never expose gaps */}
      <LiquidGlass
        displacementScale={72}
        blurAmount={0.02}
        saturation={150}
        aberrationIntensity={2.4}
        elasticity={reduced ? 0 : 0.15}
        cornerRadius={0}
        padding="0"
        mode="standard"
        mouseContainer={heroRef}
        style={{ position: "absolute", top: "50%", left: "50%" }}
      >
        <span className="sl-lens-body" />
      </LiquidGlass>
      <span className="sl-lens-cap">
        <Move size={11} strokeWidth={2.4} />
        Liquid glass · drag
      </span>
    </div>
  );
}
