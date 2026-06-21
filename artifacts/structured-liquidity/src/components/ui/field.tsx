import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
}
/** Structured Liquidity field — label + input + helper/error stack. */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, invalid, ...props }, ref) => (
    <div ref={ref} className={cn("sl-field", invalid && "invalid", className)} {...props} />
  ),
);
Field.displayName = "Field";

export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("sl-label", className)} {...props} />
));
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("fd-desc", className)} {...props} />
));
FieldDescription.displayName = "FieldDescription";

export const FieldError = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("fd-err", className)} {...props} />
));
FieldError.displayName = "FieldError";
