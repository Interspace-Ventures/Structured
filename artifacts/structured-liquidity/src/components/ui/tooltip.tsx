import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  /** the tooltip bubble content */
  content: React.ReactNode;
  /** extra class on the .sl-tip bubble */
  tipClassName?: string;
}

/** Structured Liquidity tooltip — flat-shadow bubble revealed on hover/focus. */
export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
  ({ content, tipClassName, className, children, ...props }, ref) => (
    <span ref={ref} className={cn("sl-tip-wrap", className)} {...props}>
      {children}
      <span className={cn("sl-tip", tipClassName)} role="tooltip">
        {content}
      </span>
    </span>
  ),
);
Tooltip.displayName = "Tooltip";
