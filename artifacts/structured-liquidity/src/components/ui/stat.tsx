import * as React from "react";
import { cn } from "@/lib/utils";

/** Inline metric strip — values divided by accent border rules. */
export function StatStrip({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-stat-strip", className)} {...props} />;
}

export function Stat({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-stat", className)} {...props} />;
}

/** Boxed metric cards. */
export function StatCards({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-stat-cards", className)} {...props} />;
}

export function StatCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-stat-card", className)} {...props} />;
}

export interface StatNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
}
export function StatNumber({ className, accent, ...props }: StatNumberProps) {
  return <span className={cn("sl-stat-num", accent && "accent", className)} {...props} />;
}

export function StatCaption({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-stat-cap", className)} {...props} />;
}
