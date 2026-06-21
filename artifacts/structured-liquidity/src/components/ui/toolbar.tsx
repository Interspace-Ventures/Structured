import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity toolbar — a rigid rail that groups controls, divided by vertical separators. */
export const Toolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, role = "toolbar", ...props }, ref) => (
    <div ref={ref} role={role} className={cn("sl-toolbar", className)} {...props} />
  ),
);
Toolbar.displayName = "Toolbar";

/** A vertical divider between clusters of toolbar controls. */
export const ToolbarSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("sl-sep", "vert", className)} {...props} />
));
ToolbarSeparator.displayName = "ToolbarSeparator";
