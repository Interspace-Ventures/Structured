import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity scroll area — rigid frame, accent scrollbar thumb. */
export function ScrollArea({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-scroll", className)} {...props} />;
}

export function ScrollAreaRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("row", className)} {...props} />;
}
