import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity input group — input flanked by glass addons. */
export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-input-group", className)} {...props} />
  ),
);
InputGroup.displayName = "InputGroup";

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** render as a trailing addon (border on the left) */
  suffix?: boolean;
}
export const InputGroupAddon = React.forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  ({ className, suffix, ...props }, ref) => (
    <span ref={ref} className={cn("ig-addon", suffix && "suffix", className)} {...props} />
  ),
);
InputGroupAddon.displayName = "InputGroupAddon";

export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={className} {...props} />
));
InputGroupInput.displayName = "InputGroupInput";
