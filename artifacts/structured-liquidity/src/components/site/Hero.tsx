import { Sparkles, Github } from "lucide-react";
import { LiquidWord } from "./liquid";
import { InstallButton } from "./InstallButton";
import { ImpossibleStaircase } from "./ImpossibleStaircase";

const GITHUB = "https://github.com/heyinterspace/Structured";

export function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="hero-grid">
        <div>
          <span className="eyebrow reveal">
            An open shadcn theme · est. 2026
          </span>
          <h1 className="wordmark reveal">
            <span className="brutal">Structured</span>
            <br />
            <LiquidWord text="Liquidity" />
          </h1>
          <p className="lead reveal">
            <em>
              Neobrutalist structure. Liquid motion. Scientific modern clarity.
            </em>{" "}
            Structure makes the interface tangible. Motion makes changing state
            perceptible. Clarity makes information ordered and unmistakable.
            Three tenets, one coherent interface.
          </p>
          <div className="hero-tags reveal">
            <span className="tag">
              <b>01</b> Neobrutalist structure
            </span>
            <span className="tag">
              <b>02</b> Liquid Motion
            </span>
            <span className="tag">
              <b>03</b> Scientific Modern Clarity
            </span>
          </div>
          <div className="hero-cta reveal">
            <InstallButton />
            <a
              className="btn glassy"
              href={GITHUB}
              target="_blank"
              rel="noopener"
            >
              <Github />
              Source
            </a>
            <a className="btn glassy" href="#showcase">
              <Sparkles />
              Showcase
            </a>
          </div>
        </div>
        <div className="hero-cube-wrap">
          <ImpossibleStaircase />
        </div>
      </div>
    </header>
  );
}
