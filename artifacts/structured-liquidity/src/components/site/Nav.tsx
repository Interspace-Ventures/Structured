import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  Blocks,
  Github,
  Menu,
  Sparkles,
  Waypoints,
  X,
} from "lucide-react";
import { Hypercube } from "./liquid";
import { InstallButton } from "./InstallButton";

const GITHUB = "https://github.com/heyinterspace/Structured";
const NAV_ITEMS = [
  { label: "Principles", href: "#manifesto", icon: Waypoints },
  { label: "Components", href: "#components", icon: Blocks },
  { label: "Showcase", href: "#showcase", icon: Sparkles },
  { label: "For agents", href: "#adopt", icon: Bot },
] as const;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const positionMarker = useCallback((index: number) => {
    const links = linksRef.current;
    const slots = links?.querySelectorAll<HTMLElement>(".nav-action-slot");
    const target = slots?.[index];
    if (!links || !target) return;
    links.style.setProperty("--nav-marker-x", `${target.offsetLeft}px`);
    links.style.setProperty("--nav-marker-w", `${target.offsetWidth}px`);
    links.style.setProperty("--nav-marker-opacity", "1");
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Match the sections' scroll-margin so a clicked destination becomes
      // active as soon as it settles below the sticky navigation.
      const threshold = (navRef.current?.offsetHeight ?? 72) + 48;
      let nextIndex = 0;
      NAV_ITEMS.forEach(({ href }, index) => {
        const section = document.getElementById(href.slice(1));
        if (section && section.getBoundingClientRect().top <= threshold) {
          nextIndex = index;
        }
      });
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      positionMarker(nextIndex);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [positionMarker]);

  const navigateTo = useCallback((href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.history.replaceState(null, "", href);
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <nav className="nav" ref={navRef}>
      <a
        className="brand"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          navigateTo("#top");
        }}
      >
        <Hypercube />
        <span className="name">Structured Liquidity</span>
      </a>
      <button
        type="button"
        className="nav-mobile-trigger"
        aria-expanded={mobileOpen}
        aria-controls="mobile-site-menu"
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X /> : <Menu />}
        <span>{mobileOpen ? "Close" : "Menu"}</span>
      </button>
      <div className="nav-cluster">
        <div
          className="links"
          ref={linksRef}
          onPointerLeave={() => positionMarker(activeIndexRef.current)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              positionMarker(activeIndexRef.current);
          }}
        >
          <span className="nav-liquid-marker" aria-hidden="true" />
          {NAV_ITEMS.map(({ label, href, icon: Icon }, index) => (
            <span
              className="nav-action-slot"
              onPointerEnter={() => positionMarker(index)}
              onFocus={() => positionMarker(index)}
              key={href}
            >
              <a
                href={href}
                aria-current={activeIndex === index ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(href);
                }}
              >
                <Icon />
                <span className="nav-label">{label}</span>
              </a>
            </span>
          ))}
        </div>
        <div className="nav-utilities">
          <InstallButton className="btn nav-utility" label="Install" />
          <a
            className="btn nav-utility"
            href={GITHUB}
            target="_blank"
            rel="noopener"
          >
            <Github />
            Source
          </a>
        </div>
      </div>
      <div
        id="mobile-site-menu"
        className="nav-mobile-menu"
        data-open={mobileOpen}
      >
        <div className="nav-mobile-links">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <a
              href={href}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(href);
              }}
              key={href}
            >
              <Icon />
              <span>{label}</span>
            </a>
          ))}
        </div>
        <div className="nav-mobile-utilities">
          <InstallButton className="btn nav-utility" label="Install" />
          <a
            className="btn nav-utility"
            href={GITHUB}
            target="_blank"
            rel="noopener"
          >
            <Github />
            Source
          </a>
        </div>
      </div>
    </nav>
  );
}
