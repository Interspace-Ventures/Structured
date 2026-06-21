import * as React from "react";
import { cn } from "@/lib/utils";

export interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  /** number of bars to render */
  bars?: number;
  /** how many leading bars read as "played" */
  played?: number;
}

/** Structured Liquidity waveform — a bar field built and animated by the kit script. */
export const Waveform = React.forwardRef<HTMLDivElement, WaveformProps>(
  ({ bars = 48, played = 20, className, role = "img", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("sl-waveform", className)}
      data-waveform
      data-bars={bars}
      data-played={played}
      role={role}
      {...props}
    />
  ),
);
Waveform.displayName = "Waveform";
