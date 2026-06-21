import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
}

/** Structured Liquidity separator — a hairline at full border weight. */
export function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn("sl-sep", "vert", className)}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      />
    );
  }
  return (
    <hr
      className={cn("sl-sep", className)}
      {...(props as React.HTMLAttributes<HTMLHRElement>)}
    />
  );
}
