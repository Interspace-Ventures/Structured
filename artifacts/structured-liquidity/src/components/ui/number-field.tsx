import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  "aria-label"?: string;
  onValueChange?: (value: number) => void;
}

/** Structured Liquidity number field — dec/inc steppers around a spinbutton. */
export function NumberField({
  value,
  defaultValue,
  min = 0,
  max = 99,
  step = 1,
  disabled,
  onValueChange,
  className,
  "aria-label": ariaLabel = "Quantity",
  ...props
}: NumberFieldProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? min);
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;

  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  const commit = (v: number) => {
    const next = clamp(v);
    if (next === val) return;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d-]/g, "");
    if (raw === "" || raw === "-") return;
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) commit(n);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      commit(val + step);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      commit(val - step);
    }
  };

  return (
    <div className={cn("sl-numfield", className)} {...props}>
      <button
        type="button"
        className="nf-step"
        data-nf="dec"
        aria-label="Decrease"
        disabled={disabled}
        onClick={() => commit(val - step)}
      >
        <Minus />
      </button>
      <input
        className="nf-input"
        type="text"
        inputMode="numeric"
        value={val}
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-label={ariaLabel}
        disabled={disabled}
        onChange={onInput}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="nf-step"
        data-nf="inc"
        aria-label="Increase"
        disabled={disabled}
        onClick={() => commit(val + step)}
      >
        <Plus />
      </button>
    </div>
  );
}
