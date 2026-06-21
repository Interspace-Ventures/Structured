import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity section header — eyebrow, icon + title row, subtitle. */
export function SectionHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-sechead", className)} {...props} />;
}

export function SectionHeaderEyebrow({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-sechead-eyebrow", className)} {...props} />;
}

export function SectionHeaderRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-sechead-row", className)} {...props} />;
}

export function SectionHeaderTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("sl-sechead-title", className)} {...props} />;
}

export function SectionHeaderSubtitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("sl-sechead-sub", className)} {...props} />;
}
