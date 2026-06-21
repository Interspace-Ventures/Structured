import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

/** Structured Liquidity progress — rigid rail, striped accent fill. */
export function Progress({ value = 0, className, ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("sl-progress", className)}
      {...props}
    >
      <span style={{ width: `${clamped}%` }} />
    </div>
  );
}
