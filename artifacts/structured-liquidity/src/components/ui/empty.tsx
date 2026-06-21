import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity empty state — dashed rigid frame, centered prompt. */
export function Empty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-empty", className)} {...props} />;
}

export function EmptyIcon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("em-ic", className)} {...props} />;
}

export function EmptyTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("em-t", className)} {...props} />;
}

export function EmptyDescription({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("em-d", className)} {...props} />;
}
