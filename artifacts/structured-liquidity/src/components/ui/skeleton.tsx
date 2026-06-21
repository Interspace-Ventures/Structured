import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity skeleton — shimmering glass placeholder. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-skel", className)} {...props} />;
}
