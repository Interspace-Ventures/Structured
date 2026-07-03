import { Sparkles, Github } from "lucide-react";
import { LiquidWord, Hypercube } from "./liquid";
import { InstallButton } from "./InstallButton";
import { GlassLens } from "./GlassLens";

const GITHUB = "https://github.com/heyinterspace/Structured";

export function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="hero-grid">
        <div>
          <span className="eyebrow reveal">An open design language · est. 2026</span>
          <h1 className="wordmark reveal">
            <span className="brutal">Structured</span>
            <br />
            <LiquidWord text="Liquidity" />
          </h1>
          <p className="lead reveal">
            Rigid containers with sharp, uncompromising edges. Inside them, a liquid glass that
            reflects light and gives every surface tactile depth. <em>Structured Liquidity</em>{" "}
            marries the discipline of the grid to the delight of the material: a complete, open UI
            language any product can speak, not the look of just one. This page is both the specimen
            and the spec, so retheme it live as you read.
          </p>
          <div className="hero-tags reveal">
            <span className="tag">Structured containment</span>
            <span className="tag">Liquid depth</span>
            <span className="tag">Semantic clarity</span>
          </div>
          <div className="hero-cta reveal">
            <InstallButton />
            <a className="btn glassy" href="#showcase">
              <Sparkles />
              Showcase
            </a>
            <a className="btn glassy" href={GITHUB} target="_blank" rel="noopener">
              <Github />
              Source
            </a>
          </div>
        </div>
        <div className="hero-cube-wrap" aria-hidden="true">
          <Hypercube className="hero-cube" />
        </div>
      </div>
      <GlassLens />
    </header>
  );
}
