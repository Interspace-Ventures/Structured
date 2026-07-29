import adopterRegistry from "@/adopters.json";

type Lifecycle = "live" | "staging";
type RouteStatus = "verified" | "private" | "domain-pending" | "concept";

interface Adopter {
  id: string;
  name: string;
  domain: string;
  href: string | null;
  repository: string | null;
  lifecycle: Lifecycle;
  routeStatus: RouteStatus;
  tag: string;
  shot: string | null;
  shotAlt: string;
  description: string;
  adoption: string[];
  absorbedComponents: string[];
  candidatePatterns: string[];
}

const ADOPTERS = adopterRegistry.projects as Adopter[];
const LIVE = ADOPTERS.filter((project) => project.lifecycle === "live");
const STAGING = ADOPTERS.filter((project) => project.lifecycle === "staging");

const STATUS_LABEL: Record<RouteStatus, string> = {
  verified: "Live",
  private: "Private",
  "domain-pending": "Domain pending",
  concept: "Concept",
};

function ProjectCard({ project }: { project: Adopter }) {
  const body = (
    <>
      <div className="browser-bar">
        <span className="tl" />
        <span className="tl" />
        <span className="tl" />
        <span className="url">{project.domain}</span>
      </div>
      <div className="show-card-shot">
        {project.shot ? (
          <img
            src={project.shot}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            alt={project.shotAlt}
          />
        ) : (
          <div className="show-stage-placeholder" aria-label={project.shotAlt}>
            <span>{project.name}</span>
            <small>{project.tag}</small>
          </div>
        )}
        <div className="show-card-veil">
          <div className="vbody">
            <p className="show-card-desc">{project.description}</p>
            <span className="show-card-cta">
              {project.href ? `Visit ${project.domain}` : `Tracking ${project.domain}`}{" "}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
      <div className="show-card-foot">
        <span className="sl-ava show-project-mark" aria-hidden="true">
          {project.name.slice(0, 2).toUpperCase()}
        </span>
        <div className="show-id">
          <span className="show-name">{project.name}</span>
          <span className="mono">{project.tag}</span>
        </div>
        <span
          className={`sl-badge ${project.routeStatus === "verified" ? "default" : "outline"}`}
        >
          {STATUS_LABEL[project.routeStatus]}
        </span>
      </div>
    </>
  );

  return project.href ? (
    <a
      className="show-card glass"
      href={project.href}
      target="_blank"
      rel="noopener"
      aria-label={`Visit ${project.domain}, a product built on Structured Liquidity (opens in a new tab)`}
    >
      {body}
    </a>
  ) : (
    <article className="show-card glass is-static">{body}</article>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Showcase · the field network</span>
        <h2 className="section-title">
          From Principles
          <br />
          to Practice.
        </h2>
        <p className="lead">
          The language is product-agnostic, so the same rigid grid and liquid glass run across
          shipping work. This registry also closes the loop: reusable patterns found in the field
          are reviewed, generalized, and promoted back into the shadcn component library.
        </p>
      </div>

      <div className="show-registry-meta reveal">
        <span>{LIVE.length} live</span>
        <span>{STAGING.length} staging</span>
        <span>Reviewed {adopterRegistry.reviewedAt}</span>
      </div>

      <div className="show-grid reveal">
        {LIVE.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>

      <div className="show-stage-head reveal">
        <span className="eyebrow">Staging · tracked before launch</span>
        <h3>Signals from the frontier.</h3>
        <p>
          Private builds and concepts stay visible to the system without being presented as public
          launches. Their useful patterns can still graduate into the shared library.
        </p>
      </div>

      <div className="show-grid show-grid-staging reveal">
        {STAGING.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}
