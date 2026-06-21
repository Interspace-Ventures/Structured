import * as React from "react";
import { cn } from "@/lib/utils";

export interface HoverCardProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  /** the floating card content */
  content: React.ReactNode;
  /** extra class on the .sl-hover-card panel */
  cardClassName?: string;
}

/** Structured Liquidity hover card — glass panel revealed under a trigger on hover. */
export const HoverCard = React.forwardRef<HTMLSpanElement, HoverCardProps>(
  ({ content, cardClassName, className, children, ...props }, ref) => (
    <span ref={ref} className={cn("sl-tip-wrap", className)} {...props}>
      {children}
      <span className={cn("sl-hover-card", cardClassName)}>{content}</span>
    </span>
  ),
);
HoverCard.displayName = "HoverCard";
