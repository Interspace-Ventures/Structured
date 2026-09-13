import adopterRegistry from "@/adopters.json";
import {
  PortfolioGrid, PortfolioCard, PortfolioCardMedia, PortfolioCardBody,
  PortfolioCardTags, PortfolioCardTag, PortfolioCardTitle,
  PortfolioCardDescription, PortfolioCardAction,
} from "@/components/ui/portfolio-card";

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
const SHOWCASE_IDS = [
  "interspace-ventures",
  "cosmograph",
  "observatory",
  "exobase",
  "construct",
  "rampart",
] as const;
const SHOWCASE = SHOWCASE_IDS.map((id) => ADOPTERS.find((project) => project.id === id)).filter(
  (project): project is Adopter => Boolean(project),
);

const STATUS_LABEL: Record<RouteStatus, string> = {
  verified: "Live",
  private: "Private",
  "domain-pending": "Domain pending",
  concept: "Concept",
};

function ProjectCard({ project }: { project: Adopter }) {
  return (
    <PortfolioCard href={project.href ?? undefined} className="showcase-project">
      <PortfolioCardMedia className="showcase-project-media">
        {project.lifecycle === "live" ? (
          <PortfolioCardTags>
            <PortfolioCardTag>{STATUS_LABEL[project.routeStatus]}</PortfolioCardTag>
          </PortfolioCardTags>
        ) : null}
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
      </PortfolioCardMedia>
      <PortfolioCardBody>
        <span className="showcase-project-domain">{project.domain}</span>
        <PortfolioCardTitle>{project.name}</PortfolioCardTitle>
        <PortfolioCardDescription>{project.description}</PortfolioCardDescription>
        {project.href ? <PortfolioCardAction>Visit {project.name}</PortfolioCardAction> : null}
      </PortfolioCardBody>
    </PortfolioCard>
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
        <span>{SHOWCASE.length} showcased</span>
        <span>Reviewed {adopterRegistry.reviewedAt}</span>
      </div>

      <PortfolioGrid className="showcase-projects reveal">
        {SHOWCASE.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </PortfolioGrid>

    </section>
  );
}
