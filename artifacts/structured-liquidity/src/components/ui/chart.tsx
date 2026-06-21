import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** bar heights as percentages (0–100) */
  data?: number[];
}

const DEFAULT_DATA = [38, 62, 48, 80, 55, 92, 70, 44, 66, 30];

/** Structured Liquidity chart — static accent-gradient bar chart. */
export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data = DEFAULT_DATA, className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-chart", className)} {...props}>
      {data.map((h, i) => (
        <span key={i} className="bar" style={{ height: `${h}%` }} />
      ))}
    </div>
  ),
);
Chart.displayName = "Chart";
