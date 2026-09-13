import * as React from "react";
import { cn } from "@/lib/utils";

/** Shared width and responsive gutters for navigation, body, and footer chrome. */
export const SiteShell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-site-shell", className)} {...props} />
  ),
);
SiteShell.displayName = "SiteShell";

/**
 * An independent body surface aligned to SiteShell. Tenant layouts may add
 * their own internal reading measure without changing the outer frame.
 */
export const SiteContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-site-content sl-site-body", className)} {...props} />
  ),
);
SiteContent.displayName = "SiteContent";
