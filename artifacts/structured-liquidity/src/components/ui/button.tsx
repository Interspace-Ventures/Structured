import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

const SIZE: Record<ButtonSize, string> = { default: "", sm: "sm", lg: "lg", icon: "icon" };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Structured Liquidity button — rigid frame, flat offset shadow, presses into it. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("sl-btn", variant, SIZE[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
