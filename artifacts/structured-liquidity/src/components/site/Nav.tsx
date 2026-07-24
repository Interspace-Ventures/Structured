import { Compass, LayoutGrid, PanelsTopLeft, Sparkles, Bot, Github } from "lucide-react";
import { Hypercube } from "./liquid";
import { InstallButton } from "./InstallButton";

const GITHUB = "https://github.com/heyinterspace/Structured";

export function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#top">
        <Hypercube />
        <span className="name">Structured Liquidity</span>
      </a>
      <div className="links">
        <a href="#manifesto">
          <Compass />
          Principles
        </a>
        <a href="#components">
          <LayoutGrid />
          Components
        </a>
        <a href="#templates">
          <PanelsTopLeft />
          Templates
        </a>
        <a href="#showcase">
          <Sparkles />
          Showcase
        </a>
        <a href="#adopt">
          <Bot />
          For AI
        </a>
        <InstallButton
          iconOnly
          className="btn solid nav-cta nav-icon"
          style={{ "--hard-x": "3px", "--hard-y": "3px" } as React.CSSProperties}
        />
        <a
          className="btn glassy nav-cta nav-icon"
          href={GITHUB}
          target="_blank"
          rel="noopener"
          aria-label="Source"
          title="Source"
          style={{ "--hard-x": "3px", "--hard-y": "3px" } as React.CSSProperties}
        >
          <Github />
        </a>
      </div>
    </nav>
  );
}
