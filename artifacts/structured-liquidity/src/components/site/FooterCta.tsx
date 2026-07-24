import { LayoutGrid, Github } from "lucide-react";
import { InstallButton } from "./InstallButton";

const GITHUB = "https://github.com/heyinterspace/Structured";

export function FooterCta() {
  return (
    <section className="wrap">
      <div className="glass cta-panel reveal">
        <h2>
          Build with <b>Structure</b>. Flow with <b>Liquidity</b>.
        </h2>
        <p className="lead" style={{ textAlign: "center" }}>
          Structured Liquidity is an open UI language: a complete kit of rigid containers and liquid
          glass, free to use with visible footer attribution. Adopt the three pillars, set your
          accent, and build something rigorous, tactile, and unmistakably clear.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
          <InstallButton />
          <a className="btn glassy" href="#components">
            <LayoutGrid />
            Components
          </a>
          <a className="btn glassy" href={GITHUB} target="_blank" rel="noopener">
            <Github />
            Source
          </a>
        </div>
      </div>
    </section>
  );
}
