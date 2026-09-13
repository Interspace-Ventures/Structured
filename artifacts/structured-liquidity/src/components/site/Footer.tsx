import { Hypercube } from "./liquid";

export function Footer() {
  const basePath = import.meta.env.BASE_URL;

  return (
    <footer className="shell">
      <div className="foot">
        <div className="brand">
          <Hypercube />
          <span className="name">Structured Liquidity</span>
        </div>
        <div className="mono foot-legal">
          <a href={`${basePath}attribution.txt`}>Free to use with attribution.</a>{" "}
          <a href={basePath}>Structured</a> is an{" "}
          <a href="https://interspace.ventures" target="_blank" rel="noopener">
            Interspace Venture
          </a>
          . © 2026. Built at the speed of thought with AI.
        </div>
      </div>
    </footer>
  );
}
