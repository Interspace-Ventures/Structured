import { Hypercube } from "./liquid";

export function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <div className="brand">
          <Hypercube />
          <span className="name">Structured Liquidity</span>
        </div>
        <div className="mono foot-legal">
          Structured Liquidity is an{" "}
          <a href="https://interspace.ventures" target="_blank" rel="noopener">
            Interspace Venture
          </a>
          . © 2026. Built at the speed of thought with{" "}
          <a href="https://replit.com" target="_blank" rel="noopener">
            Replit
          </a>
        </div>
      </div>
    </footer>
  );
}
