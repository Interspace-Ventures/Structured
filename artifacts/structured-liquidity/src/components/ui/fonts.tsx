import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity font pairings specimen. */
export function FontPairings({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pairings", className)} {...props} />;
}

export function FontPair({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pair", className)} {...props} />;
}

export function FontPairTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pair-title", className)} {...props} />;
}

export function FontPairFonts({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pair-fonts", className)} {...props} />;
}

export type FontRoleVariant = "header" | "body" | "detail";

export interface FontSpecimenProps extends React.HTMLAttributes<HTMLSpanElement> {
  role?: FontRoleVariant;
}
export function FontSpecimen({ className, role = "header", ...props }: FontSpecimenProps) {
  return <span className={cn("pf", `is-${role}`, className)} {...props} />;
}

export function FontRole({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("pf-role", className)} {...props} />;
}

export function FontName({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("pf-name", className)} {...props} />;
}

export function FontPairNote({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pair-note", className)} {...props} />;
}
