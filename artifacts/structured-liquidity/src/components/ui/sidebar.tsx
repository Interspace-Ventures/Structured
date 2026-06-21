import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity sidebar — a structural rail beside a content pane. */
export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-sidebar-demo", className)} {...props} />;
}

export function SidebarNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cn("sb", className)} {...props} />;
}

export function SidebarHeading({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sb-h", className)} {...props} />;
}

export interface SidebarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}
export function SidebarLink({ className, active, ...props }: SidebarLinkProps) {
  return <a className={cn(active && "active", className)} {...props} />;
}

export function SidebarMain({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sb-main", className)} {...props} />;
}
