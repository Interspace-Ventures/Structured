import * as React from "react";
import { cn } from "@/lib/utils";

export interface UnitEconomicsAllocation {
  label: string;
  value: string;
  share: number;
  description?: string;
}

export interface UnitEconomicsChartProps
  extends React.HTMLAttributes<HTMLElement> {
  allocations: UnitEconomicsAllocation[];
  totalLabel?: string;
  totalValue?: string;
  note?: string;
}

/**
 * A compact, accessible stacked allocation chart for explaining how a price,
 * budget, or unit of revenue is distributed.
 */
export const UnitEconomicsChart = React.forwardRef<
  HTMLElement,
  UnitEconomicsChartProps
>(
  (
    {
      allocations,
      totalLabel = "Total",
      totalValue,
      note,
      className,
      ...props
    },
    ref,
  ) => {
    const totalShare = allocations.reduce(
      (sum, allocation) => sum + Math.max(0, allocation.share),
      0,
    );
    const chartLabel = allocations
      .map((allocation) => `${allocation.label}: ${allocation.value}`)
      .join(", ");

    return (
      <figure ref={ref} className={cn("sl-unit-economics", className)} {...props}>
        <figcaption className="sl-unit-economics-head">
          <span>{totalLabel}</span>
          {totalValue ? <strong>{totalValue}</strong> : null}
        </figcaption>
        <div className="sl-unit-economics-chart" role="img" aria-label={chartLabel}>
          {allocations.map((allocation, index) => (
            <span
              key={`${allocation.label}-${index}`}
              style={{
                width: `${totalShare ? (Math.max(0, allocation.share) / totalShare) * 100 : 0}%`,
                "--allocation-strength": `${Math.min(index, 3) * 16 + 34}%`,
              } as React.CSSProperties}
              title={`${allocation.label}: ${allocation.value}`}
            />
          ))}
        </div>
        <div className="sl-unit-economics-legend">
          {allocations.map((allocation, index) => (
            <div key={`${allocation.label}-${index}`}>
              <i
                style={{
                  "--allocation-strength": `${Math.min(index, 3) * 16 + 34}%`,
                } as React.CSSProperties}
              />
              <span>
                <strong>{allocation.label}</strong>
                {allocation.description ? <small>{allocation.description}</small> : null}
              </span>
              <b>{allocation.value}</b>
            </div>
          ))}
        </div>
        {note ? <p className="sl-unit-economics-note">{note}</p> : null}
      </figure>
    );
  },
);
UnitEconomicsChart.displayName = "UnitEconomicsChart";
