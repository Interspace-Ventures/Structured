import * as React from "react";
import { cn } from "@/lib/utils";

export const FilterToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sl-filter-toolbar", className)} {...props} />
));
FilterToolbar.displayName = "FilterToolbar";

export const FilterGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-filter-group", className)} {...props} />
  ),
);
FilterGroup.displayName = "FilterGroup";

export const FilterSummary = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("sl-filter-summary", className)} {...props} />
  ),
);
FilterSummary.displayName = "FilterSummary";

