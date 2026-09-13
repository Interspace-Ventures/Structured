import type { CSSProperties } from "react";
import * as React from "react";
import { Download, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
}

/** Structured Liquidity navigation bar — a clean top rail with one liquid selection marker. */
export const NavigationBar = React.forwardRef<
  HTMLDivElement,
  NavigationBarProps
>(({ brand = "Structured Liquidity", className, ...props }, ref) => {
  const [active, setActive] = React.useState(0);
  const destinations = [
    { label: "Install", icon: Download },
    { label: "Source", icon: Github },
    { label: "Showcase", icon: Sparkles },
  ];

  return (
    <div ref={ref} className={cn("sl-navbar", className)} {...props}>
      <span className="nb-brand">
        <span
          className="glyph"
          style={{ "--s": "22px" } as CSSProperties}
          aria-hidden="true"
        />
        {brand}
      </span>
      <div
        className="nb-links"
        style={{ "--nb-index": active } as CSSProperties}
      >
        <span className="nb-liquid-marker" aria-hidden="true" />
        {destinations.map(({ label, icon: Icon }, index) => (
          <button
            type="button"
            className="nb-link"
            aria-current={active === index ? "page" : undefined}
            onClick={() => setActive(index)}
            key={label}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});
NavigationBar.displayName = "NavigationBar";
