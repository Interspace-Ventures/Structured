import type { CSSProperties } from "react";
import * as React from "react";
import { Compass, Library, Radio, Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
}

/** Structured Liquidity navigation bar — a rigid top rail: brand, links, a glass menu, and right-side actions. */
export const NavigationBar = React.forwardRef<HTMLDivElement, NavigationBarProps>(
  ({ brand = "universe.audio", className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-navbar", className)} {...props}>
      <span className="nb-brand">
        <span className="glyph" style={{ "--s": "22px" } as CSSProperties} aria-hidden="true" />
        {brand}
      </span>
      <div className="nb-links">
        <a href="#" aria-current="page">
          <Compass />
          Discover
        </a>
        <a href="#">
          <Library />
          Library
        </a>
        <a href="#">
          <Radio />
          Radio
        </a>
      </div>
      <div className="sl-pop-wrap">
        <button className="sl-trigger" data-pop aria-expanded="false" aria-haspopup="menu">
          <span>Browse</span>
          <span className="chev">▾</span>
        </button>
        <div className="sl-menu">
          <div className="lbl">Catalog</div>
          <div className="item">New releases</div>
          <div className="item">Genres</div>
          <div className="sep" />
          <div className="item">Languages</div>
        </div>
      </div>
      <div className="nb-right">
        <div className="sl-toggle-group" data-toggle-group>
          <button aria-pressed="true" aria-label="Grid view">
            ▦
          </button>
          <button aria-pressed="false" aria-label="List view">
            ≡
          </button>
        </div>
        <Avatar>U</Avatar>
        <Button variant="ghost" size="sm">
          <Play />
          Demo
        </Button>
        <Button variant="default" size="sm">
          <ArrowRight />
          Join waitlist
        </Button>
      </div>
    </div>
  ),
);
NavigationBar.displayName = "NavigationBar";
