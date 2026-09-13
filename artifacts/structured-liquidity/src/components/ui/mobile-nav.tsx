import type { CSSProperties } from "react";
import * as React from "react";
import {
  Menu,
  X,
  Search,
  Compass,
  Library,
  Radio,
  Heart,
  House,
  User,
  Disc3,
  Music,
  BarChart3,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

function PhoneScreen() {
  return (
    <div className="mn-screen" aria-hidden="true">
      <div className="mn-sk tall" />
      <div className="mn-sk line" />
      <div className="mn-sk line short" />
    </div>
  );
}

/** Mobile navigation — a phone frame with a top drawer and one floating liquid-glass tab bar. */
export const MobileTabBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const select = (index: number) => {
    setActive(index);
    setMenuOpen(false);
  };

  return (
    <div ref={ref} className={cn("sl-mnav", className)} data-mnav {...props}>
      <div className="mn-phone">
        <div className="mn-top">
          <button
            className="mn-burger"
            data-mnav-toggle
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="mn-ic-open" />
            <X className="mn-ic-close" />
          </button>
          <span className="mn-brand">
            <span
              className="glyph"
              style={{ "--s": "18px" } as CSSProperties}
              aria-hidden="true"
            />
            Kepler
          </span>
          <span className="mn-icon" aria-hidden="true">
            <Search />
          </span>
        </div>
        <div className="mn-drawer" data-mnav-drawer data-open={menuOpen}>
          <div>
            <button
              type="button"
              className="mn-d-item"
              onClick={() => select(0)}
            >
              <Compass />
              Mission
            </button>
            <button
              type="button"
              className="mn-d-item"
              onClick={() => select(1)}
            >
              <Library />
              Signals
            </button>
            <button
              type="button"
              className="mn-d-item"
              onClick={() => select(2)}
            >
              <Radio />
              Atlas
            </button>
            <button
              type="button"
              className="mn-d-item"
              onClick={() => select(3)}
            >
              <Heart />
              Archive
            </button>
          </div>
        </div>
        <PhoneScreen />
        <nav
          className="gnav-bar mn-tabs-floating"
          aria-label="Primary"
          style={{ "--gnav-index": active, "--gnav-count": 5 } as CSSProperties}
        >
          <span className="gnav-marker" aria-hidden="true" />
          <button
            className={cn("gnav-tab", active === 0 && "is-active")}
            aria-current={active === 0 ? "page" : undefined}
            onClick={() => select(0)}
          >
            <House />
            <span>Mission</span>
          </button>
          <button
            className={cn("gnav-tab", active === 1 && "is-active")}
            aria-current={active === 1 ? "page" : undefined}
            onClick={() => select(1)}
          >
            <Search />
            <span>Signals</span>
          </button>
          <button
            className={cn("gnav-tab", active === 2 && "is-active")}
            aria-current={active === 2 ? "page" : undefined}
            onClick={() => select(2)}
          >
            <Compass />
            <span>Atlas</span>
          </button>
          <button
            className={cn("gnav-tab", active === 3 && "is-active")}
            aria-current={active === 3 ? "page" : undefined}
            onClick={() => select(3)}
          >
            <Heart />
            <span>Archive</span>
          </button>
          <button
            className={cn("gnav-tab", active === 4 && "is-active")}
            aria-current={active === 4 ? "page" : undefined}
            onClick={() => select(4)}
          >
            <User />
            <span>Crew</span>
          </button>
        </nav>
      </div>
    </div>
  );
});
MobileTabBar.displayName = "MobileTabBar";

/** Mobile navigation — a floating glass tab bar with a sliding active marker. */
export const GlassTabBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [active, setActive] = React.useState(0);
  return (
    <div ref={ref} className={cn("sl-gnav", className)} {...props}>
      <div className="mn-phone">
        <PhoneScreen />
        <nav
          className="gnav-bar"
          aria-label="Primary"
          style={{ "--gnav-index": active } as CSSProperties}
        >
          <span className="gnav-marker" aria-hidden="true" />
          <button
            className={cn("gnav-tab", active === 0 && "is-active")}
            aria-current={active === 0 ? "page" : undefined}
            onClick={() => setActive(0)}
          >
            <Disc3 />
            <span>Mission</span>
          </button>
          <button
            className={cn("gnav-tab", active === 1 && "is-active")}
            aria-current={active === 1 ? "page" : undefined}
            onClick={() => setActive(1)}
          >
            <Music />
            <span>Signals</span>
          </button>
          <button
            className={cn("gnav-tab", active === 2 && "is-active")}
            aria-current={active === 2 ? "page" : undefined}
            onClick={() => setActive(2)}
          >
            <BarChart3 />
            <span>Atlas</span>
          </button>
          <button
            className={cn("gnav-tab", active === 3 && "is-active")}
            aria-current={active === 3 ? "page" : undefined}
            onClick={() => setActive(3)}
          >
            <Sparkles />
            <span>Archive</span>
          </button>
        </nav>
      </div>
    </div>
  );
});
GlassTabBar.displayName = "GlassTabBar";

/** Mobile navigation — a segmented sub-nav header with a sliding marker (wired by the kit script). */
export const SegmentedNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [active, setActive] = React.useState(0);
  return (
    <div ref={ref} className={cn("sl-snav", className)} {...props}>
      <div className="mn-phone">
        <div className="snav-head">
          <button className="snav-back" aria-label="Back">
            <ChevronLeft />
          </button>
          <span className="snav-title">Signal archive</span>
          <span className="snav-act" aria-hidden="true">
            <Search />
          </span>
        </div>
        <div
          className="snav-seg"
          role="tablist"
          aria-label="Sections"
          data-snav-seg
          style={{ "--seg-index": active } as CSSProperties}
        >
          <span className="snav-marker" aria-hidden="true" />
          <button
            className="snav-seg-btn"
            role="tab"
            aria-selected={active === 0}
            onClick={() => setActive(0)}
          >
            Observations
          </button>
          <button
            className="snav-seg-btn"
            role="tab"
            aria-selected={active === 1}
            onClick={() => setActive(1)}
          >
            Transits
          </button>
        </div>
        <PhoneScreen />
      </div>
    </div>
  );
});
SegmentedNav.displayName = "SegmentedNav";
