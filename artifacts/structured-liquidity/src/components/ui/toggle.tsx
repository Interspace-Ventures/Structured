import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

/** Structured Liquidity toggle — rigid button, accent fill when pressed. */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, defaultPressed, onPressedChange, className, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultPressed ?? false);
    const isControlled = pressed !== undefined;
    const on = isControlled ? pressed : internal;
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={on}
        className={cn("sl-toggle", className)}
        onClick={() => {
          const next = !on;
          if (!isControlled) setInternal(next);
          onPressedChange?.(next);
        }}
        {...props}
      />
    );
  },
);
Toggle.displayName = "Toggle";
