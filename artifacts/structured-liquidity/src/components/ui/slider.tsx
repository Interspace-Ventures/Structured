import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
}

/** Structured Liquidity slider — rigid track, accent fill, draggable thumb. */
export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  onValueChange,
  className,
  ...props
}: SliderProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? min);
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const trkRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const snap = (v: number) => clamp(Math.round((v - min) / step) * step + min);

  const commit = (v: number) => {
    const next = snap(v);
    if (next === val) return;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const fromClientX = (clientX: number) => {
    const trk = trkRef.current;
    if (!trk) return val;
    const r = trk.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return min + p * (max - min);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    commit(fromClientX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    commit(fromClientX(e.clientX));
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      commit(val + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      commit(val - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(min);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(max);
    }
  };

  const pct = max === min ? 0 : ((val - min) / (max - min)) * 100;

  return (
    <div className={cn("sl-slider", className)} {...props}>
      <div
        ref={trkRef}
        className="trk"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className="fl" style={{ width: `${pct}%` }} />
        <div className="th" style={{ left: `${pct}%` }} />
      </div>
    </div>
  );
}
