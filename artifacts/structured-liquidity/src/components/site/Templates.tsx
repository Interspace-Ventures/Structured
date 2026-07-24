import { BarChart3, Blocks, GalleryVerticalEnd, PanelsTopLeft } from "lucide-react";
import { InstallButton } from "./InstallButton";

const templates = [
  {
    icon: PanelsTopLeft,
    title: "Marketing site",
    source: "Interspace · 2 Days Early · Bumble Bee",
    parts: "Section-aware navigation · proof blocks · conversion footer",
  },
  {
    icon: BarChart3,
    title: "Data dashboard",
    source: "Interspace Portfolio · Interspace Index",
    parts: "KPI rail · filter toolbar · responsive data views",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Guided flow",
    source: "Bumble Bee enrollment",
    parts: "Persistent stepper · focused form stage · recovery states",
  },
  {
    icon: Blocks,
    title: "Immersive app",
    source: "Cosmograph · Universe",
    parts: "Full-viewport canvas · HUD overlays · command controls",
  },
];

export function Templates() {
  return (
    <section id="templates" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Templates · patterns from production</span>
        <h2 className="section-title">
          Proven structures,
          <br />
          ready to adapt.
        </h2>
        <p className="lead">
          The strongest patterns from sites built with Structured Liquidity are now reusable
          starting points. Each template keeps navigation and footer chrome wider than its content,
          includes the framework attribution, and composes from the same registry primitives.
        </p>
      </div>

      <div className="template-grid">
        {templates.map(({ icon: Icon, title, source, parts }) => (
          <article className="glass template-card reveal" key={title}>
            <Icon aria-hidden="true" />
            <span className="mono template-source">{source}</span>
            <h3>{title}</h3>
            <p>{parts}</p>
          </article>
        ))}
      </div>
      <div className="template-install reveal">
        <InstallButton item="site-templates" label="Install templates" />
      </div>
    </section>
  );
}
