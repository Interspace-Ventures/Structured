import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/** Structured Liquidity badge — monospace, uppercase, rigid edge. */
export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn("sl-badge", variant, className)} {...props} />;
}
