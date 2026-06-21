import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity kbd — inline glass key cap. */
export const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd ref={ref} className={cn("sl-kbd", className)} {...props} />
  ),
);
Kbd.displayName = "Kbd";
