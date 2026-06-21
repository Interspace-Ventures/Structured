import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity input — glass field, accent focus shadow. */
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("sl-input", className)} {...props} />
  ),
);
Input.displayName = "Input";
