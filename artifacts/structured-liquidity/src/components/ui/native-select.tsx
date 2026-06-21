import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity native select — styled <select> with custom chevron. */
export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <span className="sl-native-wrap">
    <select ref={ref} className={cn("sl-native", className)} {...props}>
      {children}
    </select>
  </span>
));
NativeSelect.displayName = "NativeSelect";
