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

/** Mobile navigation — a phone frame with a top bar, slide-in drawer, and a bottom tab bar (wired by the kit script). */
export const MobileTabBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-mnav", className)} data-mnav {...props}>
      <div className="mn-phone">
        <div className="mn-top">
          <button
            className="mn-burger"
            data-mnav-toggle
            aria-expanded="false"
            aria-label="Open menu"
          >
            <Menu className="mn-ic-open" />
            <X className="mn-ic-close" />
          </button>
          <span className="mn-brand">
            <span className="glyph" style={{ "--s": "18px" } as CSSProperties} aria-hidden="true" />
            universe
          </span>
          <span className="mn-icon" aria-hidden="true">
            <Search />
          </span>
        </div>
        <div className="mn-drawer" data-mnav-drawer data-open="false">
          <div>
            <a href="#" className="mn-d-item">
              <Compass />
              Discover
            </a>
            <a href="#" className="mn-d-item">
              <Library />
              Library
            </a>
            <a href="#" className="mn-d-item">
              <Radio />
              Radio
            </a>
            <a href="#" className="mn-d-item">
              <Heart />
              Saved
            </a>
          </div>
        </div>
        <PhoneScreen />
        <nav className="mn-tabs" aria-label="Primary">
          <button className="mn-tab is-active" aria-current="page">
            <House />
            <span>Home</span>
          </button>
          <button className="mn-tab">
            <Search />
            <span>Search</span>
          </button>
          <button className="mn-tab">
            <Compass />
            <span>Browse</span>
          </button>
          <button className="mn-tab">
            <Heart />
            <span>Saved</span>
          </button>
          <button className="mn-tab">
            <User />
            <span>You</span>
          </button>
        </nav>
      </div>
    </div>
  ),
);
MobileTabBar.displayName = "MobileTabBar";

/** Mobile navigation — a floating glass tab bar with a sliding active marker. */
export const GlassTabBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-gnav", className)} {...props}>
      <div className="mn-phone">
        <PhoneScreen />
        <nav className="gnav-bar" aria-label="Primary">
          <span className="gnav-marker" aria-hidden="true" />
          <button className="gnav-tab is-active" aria-current="page">
            <Disc3 />
            <span>Playback</span>
          </button>
          <button className="gnav-tab">
            <Music />
            <span>Music</span>
          </button>
          <button className="gnav-tab">
            <BarChart3 />
            <span>Billboard</span>
          </button>
          <button className="gnav-tab">
            <Sparkles />
            <span>Lyriq</span>
          </button>
        </nav>
      </div>
    </div>
  ),
);
GlassTabBar.displayName = "GlassTabBar";

/** Mobile navigation — a segmented sub-nav header with a sliding marker (wired by the kit script). */
export const SegmentedNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sl-snav", className)} {...props}>
      <div className="mn-phone">
        <div className="snav-head">
          <button className="snav-back" aria-label="Back">
            <ChevronLeft />
          </button>
          <span className="snav-title">Library</span>
          <span className="snav-act" aria-hidden="true">
            <Search />
          </span>
        </div>
        <div className="snav-seg" role="tablist" aria-label="Sections" data-snav-seg>
          <span className="snav-marker" aria-hidden="true" />
          <button className="snav-seg-btn" role="tab" aria-selected="true">
            Playlists
          </button>
          <button className="snav-seg-btn" role="tab" aria-selected="false">
            Songs
          </button>
        </div>
        <PhoneScreen />
      </div>
    </div>
  ),
);
SegmentedNav.displayName = "SegmentedNav";
