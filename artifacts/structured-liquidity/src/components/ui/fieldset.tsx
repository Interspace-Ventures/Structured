import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity fieldset — bordered group with accent legend. */
export const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset ref={ref} className={cn("sl-fieldset", className)} {...props} />
));
Fieldset.displayName = "Fieldset";

export const Legend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend ref={ref} className={cn("sl-legend", className)} {...props} />
));
Legend.displayName = "Legend";
