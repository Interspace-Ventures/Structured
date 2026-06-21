import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity resizable panels — drag the divider, liquid fills the rest. */
export function Resizable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-resize", className)} {...props} />;
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "a" is the user-resizable pane; "b" flexes to fill the remainder. */
  pane?: "a" | "b";
}
export function ResizablePanel({ className, pane, ...props }: ResizablePanelProps) {
  return <div className={cn("pane", pane, className)} {...props} />;
}
