import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity navigation menu — segmented bar with hover flyouts. */
export const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("sl-navmenu", className)} {...props} />
));
NavigationMenu.displayName = "NavigationMenu";

export function NavigationMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("nm-item", className)} {...props} />;
}

export interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** render the dropdown chevron */
  withChevron?: boolean;
}
export function NavigationMenuTrigger({
  className,
  children,
  withChevron = true,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <button type="button" className={className} {...props}>
      {children}
      {withChevron && <span className="chev">▾</span>}
    </button>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("nm-panel", className)} {...props} />;
}

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href = "#", ...props }, ref) => (
  <a ref={ref} href={href} className={className} {...props} />
));
NavigationMenuLink.displayName = "NavigationMenuLink";
