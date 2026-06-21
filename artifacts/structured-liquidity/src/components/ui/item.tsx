import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity item — a glass row: leading media, body, trailing action. */
export function Item({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-item", className)} {...props} />;
}

export function ItemBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("it-body", className)} {...props} />;
}

export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("it-title", className)} {...props} />;
}

export function ItemSubtitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("it-sub", className)} {...props} />;
}
