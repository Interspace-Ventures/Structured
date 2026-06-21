import * as React from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

/** Structured Liquidity alert — rigid box, accent left rail, glass fill. */
export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("sl-alert", variant === "destructive" && "destructive", className)}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("at", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("ad", className)} {...props} />;
}
