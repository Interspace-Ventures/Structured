import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity form — vertical stack of fields + submit. */
export const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn("sl-form", className)} {...props} />
  ),
);
Form.displayName = "Form";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
}
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, invalid, ...props }, ref) => (
    <div ref={ref} className={cn("sl-field", invalid && "invalid", className)} {...props} />
  ),
);
FormField.displayName = "FormField";

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("sl-label", className)} {...props} />
));
FormLabel.displayName = "FormLabel";

export const FormError = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("fd-err", className)} {...props} />
));
FormError.displayName = "FormError";

export const FormSuccess = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("fd-ok", className)} {...props} />
));
FormSuccess.displayName = "FormSuccess";

export const FormDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("fd-desc", className)} {...props} />
));
FormDescription.displayName = "FormDescription";
