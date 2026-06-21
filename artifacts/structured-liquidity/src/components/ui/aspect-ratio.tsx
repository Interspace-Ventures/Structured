import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity aspect ratio — rigid 16/9 glass frame. */
export function AspectRatio({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-aspect", className)} {...props} />;
}
