import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared outer chrome width for navigation and footers.
 * It is deliberately wider than SiteContent, so the chrome frames the page.
 */
export const SiteShell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-site-shell", className)} {...props} />
  ),
);
SiteShell.displayName = "SiteShell";

/** The narrower reading and application-content column. */
export const SiteContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-site-content", className)} {...props} />
  ),
);
SiteContent.displayName = "SiteContent";

