import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity typography specimen — heavy grotesk, mono accents, quote. */
export function Typography({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-type", className)} {...props} />;
}

export function TypographyTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("tg", className)} {...props} />;
}

export function TypographyParagraph({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("tg", className)} {...props} />;
}

export function TypographyCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("tg", className)} {...props} />;
}

export function TypographyQuote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className={className} {...props} />;
}
