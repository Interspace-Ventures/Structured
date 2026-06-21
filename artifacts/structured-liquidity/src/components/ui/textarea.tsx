import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity textarea — glass field, accent focus shadow. */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("sl-textarea", className)} {...props} />
));
Textarea.displayName = "Textarea";
