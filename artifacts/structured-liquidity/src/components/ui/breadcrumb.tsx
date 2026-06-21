import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity breadcrumb — mono trail with accent current page. */
export const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="Breadcrumb"
    className={cn("sl-crumb", className)}
    {...props}
  />
));
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href = "#", ...props }, ref) => (
  <a ref={ref} href={href} className={className} {...props} />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export function BreadcrumbSeparator({
  className,
  children = "/",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-hidden="true" className={cn("sl-sl", className)} {...props}>
      {children}
    </span>
  );
}

export function BreadcrumbPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-current="page" className={cn("sl-cur", className)} {...props} />
  );
}
