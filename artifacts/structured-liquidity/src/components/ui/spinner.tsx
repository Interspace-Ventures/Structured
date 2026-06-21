import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity spinner — currentColor ring with a cut. */
export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-spinner", className)} role="status" aria-label="Loading" {...props} />;
}
