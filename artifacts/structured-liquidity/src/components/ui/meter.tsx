import * as React from "react";
import { cn } from "@/lib/utils";

export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  /** left-hand head label */
  label?: React.ReactNode;
  /** right-hand mono value text; defaults to "{value}%" */
  valueText?: React.ReactNode;
  /** show the negative/warning fill color */
  warn?: boolean;
}

/** Structured Liquidity meter — labeled track with accent (or warn) fill. */
export const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      valueText,
      warn,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    return (
      <div
        ref={ref}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className={cn("sl-meter", className)}
        {...props}
      >
        <div className="mt-head">
          <span>{label}</span>
          <span className="mono">{valueText ?? `${Math.round(pct)}%`}</span>
        </div>
        <div className="mt-track">
          <div className={cn("mt-fill", warn && "warn")} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  },
);
Meter.displayName = "Meter";
