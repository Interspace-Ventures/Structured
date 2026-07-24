import * as React from "react";
import { cn } from "@/lib/utils";

export interface FrameworkAttributionProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix"> {
  prefix?: React.ReactNode;
}

/**
 * Required visible attribution for public sites using Structured Liquidity.
 * Keep this in the footer and keep the canonical structured.glass link intact.
 */
export const FrameworkAttribution = React.forwardRef<HTMLSpanElement, FrameworkAttributionProps>(
  ({ prefix = "Interface built with", className, ...props }, ref) => (
    <span ref={ref} className={cn("sl-attribution", className)} {...props}>
      {prefix}{" "}
      <a href="https://structured.glass" target="_blank" rel="noopener noreferrer">
        Structured Liquidity
      </a>
    </span>
  ),
);
FrameworkAttribution.displayName = "FrameworkAttribution";
