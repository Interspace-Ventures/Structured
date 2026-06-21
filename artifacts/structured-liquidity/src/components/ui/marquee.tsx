import * as React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "日本語",
  "Māori",
  "中文",
  "English",
  "Español",
  "Français",
  "हिन्दी",
];

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** the looping items */
  items?: string[];
  /** divider glyph rendered between items */
  separator?: React.ReactNode;
  /** run the continuous scroll animation */
  streaming?: boolean;
}

function Track({
  items,
  separator,
  listitem,
  hidden,
}: {
  items: string[];
  separator: React.ReactNode;
  listitem?: boolean;
  hidden?: boolean;
}) {
  return (
    <div className="sl-marquee-track" role="presentation" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span role={listitem ? "listitem" : undefined}>{item}</span>
          {i < items.length - 1 && (
            <span className="di" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/** Structured Liquidity marquee — a continuous ticker of glass-edged items. */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      items = DEFAULT_ITEMS,
      separator = "✦",
      streaming = true,
      className,
      role = "list",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("sl-marquee", streaming && "is-streaming", className)}
      role={role}
      {...props}
    >
      <Track items={items} separator={separator} listitem />
      <Track items={items} separator={separator} hidden />
    </div>
  ),
);
Marquee.displayName = "Marquee";
