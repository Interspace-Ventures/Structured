import { Compass, LayoutGrid, Sparkles, Bot } from "lucide-react";
import { Hypercube } from "./liquid";
import { InstallButton } from "./InstallButton";

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
        <a href="#showcase">
          <Sparkles />
          Showcase
        </a>
        <a href="#adopt">
          <Bot />
          For AI
        </a>
        <InstallButton
          className="btn solid nav-cta"
          style={
            { padding: "0.5rem 1.1rem", "--hard-x": "3px", "--hard-y": "3px" } as React.CSSProperties
          }
        />
      </div>
    </nav>
  );
}
