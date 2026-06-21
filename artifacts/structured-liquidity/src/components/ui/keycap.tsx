import * as React from "react";
import { cn } from "@/lib/utils";

/** Row of keycap tiles. */
export function Keycaps({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-keycaps", className)} {...props} />;
}

export interface KeycapProps extends React.HTMLAttributes<HTMLSpanElement> {
  on?: boolean;
}

/** Structured Liquidity keycap — rigid tile, accent fill when active. */
export function Keycap({ className, on, ...props }: KeycapProps) {
  return <span className={cn("sl-keycap", on && "is-on", className)} {...props} />;
}
