import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity avatar — rigid square, flat offset shadow, accent fill. */
export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-ava", className)} {...props} />;
}

export function AvatarImage({ className, alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={className} alt={alt} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={className} {...props} />;
}

/** Overlapping avatar stack. */
export function AvatarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-ava-group", className)} {...props} />;
}
