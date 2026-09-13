import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Default Structured Liquidity portfolio grid.
 *
 * Identity, description, state, and action stay visible at rest. Hover may
 * reinforce tactility, but it must never be required to understand the card.
 */
export function PortfolioGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-portfolio-grid", className)} {...props} />;
}

type PortfolioCardProps = React.HTMLAttributes<HTMLElement> & {
  href?: string;
  external?: boolean;
};

export function PortfolioCard({
  className,
  href,
  external = true,
  children,
  ...props
}: PortfolioCardProps) {
  const cardClassName = cn("sl-portfolio-card", className);

  if (href) {
    return (
      <a
        className={cardClassName}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <article className={cardClassName} {...props}>
      {children}
    </article>
  );
}

export function PortfolioCardMedia({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-portfolio-card-media", className)} {...props} />;
}

export function PortfolioCardLogo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-portfolio-card-logo", className)} {...props} />;
}

export function PortfolioCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-portfolio-card-body", className)} {...props} />;
}

export function PortfolioCardTags({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-portfolio-card-tags", className)} {...props} />;
}

export function PortfolioCardTag({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-portfolio-card-tag", className)} {...props} />;
}

export function PortfolioCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("sl-portfolio-card-title", className)} {...props} />;
}

export function PortfolioCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("sl-portfolio-card-description", className)} {...props} />;
}

export function PortfolioCardAction({
  className,
  children = "Visit",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("sl-portfolio-card-action", className)} {...props}>
      {children}
      <ExternalLink aria-hidden="true" />
    </span>
  );
}
