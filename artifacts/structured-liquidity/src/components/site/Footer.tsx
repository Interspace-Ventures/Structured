import { Hypercube } from "./liquid";

export function Footer() {
  const basePath = import.meta.env.BASE_URL;

  return (
    <footer className="shell structured-footer">
      <div className="structured-footer-copy">
        <div className="brand">
          <Hypercube />
          <span className="name">Structured Liquidity</span>
        </div>
        <p>An open design language for clear, tactile interfaces.</p>
        <small>© 2026 Structured Liquidity · <a href={`${basePath}attribution.txt`}>Free to use with attribution.</a></small>
      </div>
      <div className="structured-footer-system" aria-label="Site credits">
        <p><a href="https://interspace.ventures">Interspace Ventures</a><span aria-hidden="true">×</span><a href="https://structured.glass">Structured Liquidity</a></p>
        <a href="https://construct.page">A Construct page ↗</a>
      </div>
    </footer>
  );
}
