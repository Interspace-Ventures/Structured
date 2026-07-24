interface ShowCard {
  href: string;
  url: string;
  shot: string;
  shotAlt: string;
  desc: string;
  fav: string;
  favAlt: string;
  favW: number;
  favH: number;
  favStyle?: React.CSSProperties;
  name: string;
  tag: string;
}

const CARDS: ShowCard[] = [
  {
    href: "https://universe.audio",
    url: "universe.audio",
    shot: "universe-audio.png",
    shotAlt: "Screenshot of the universe.audio homepage, an interface built on Structured Liquidity",
    desc: "A music platform built around spectral mixing and streaming, where every surface is a rigid container holding liquid glass, all tuned to its own accent.",
    fav: "fav-universe.png",
    favAlt: "universe.audio favicon",
    favW: 180,
    favH: 180,
    name: "universe.audio",
    tag: "Audio platform",
  },
  {
    href: "https://samir.xyz",
    url: "samir.xyz",
    shot: "samir.png",
    shotAlt: "Screenshot of samir.xyz, a personal site built on Structured Liquidity",
    desc: "The personal site of a strategic-finance operator, where profile, advisory work, and ventures sit in rigid containers with flat offset shadows on the signature purple accent.",
    fav: "fav-samir.png",
    favAlt: "samir.xyz favicon",
    favW: 600,
    favH: 600,
    name: "samir.xyz",
    tag: "Personal site",
  },
  {
    href: "https://2daysearly.com",
    url: "2daysearly.com",
    shot: "2daysearly.png",
    shotAlt: "Screenshot of 2daysearly.com, a venture-fund site built on Structured Liquidity",
    desc: "A fund for operator-led investing in early-stage fintech, running the same rigid grid and offset shadows retuned to a green accent: proof that the language travels by token.",
    fav: "fav-2daysearly.png",
    favAlt: "2daysearly.com favicon",
    favW: 300,
    favH: 300,
    name: "2daysearly.com",
    tag: "Venture fund",
  },
  {
    href: "https://bumblebee.nyc",
    url: "bumblebee.nyc",
    shot: "bumblebee.png",
    shotAlt: "Screenshot of bumblebee.nyc, a Brooklyn daycare built on Structured Liquidity",
    desc: "A Brooklyn daycare in the light-mode register: rigid black-bordered containers, flat offset shadows, and a single amber accent with mono detail labels — the structured-containment half of the language, proof it reads just as well warm and human as it does dark.",
    fav: "fav-bumblebee.png",
    favAlt: "bumblebee.nyc favicon",
    favW: 180,
    favH: 180,
    favStyle: { background: "#f5edd4" },
    name: "bumblebee.nyc",
    tag: "Daycare",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Showcase · the prototypes</span>
        <h2 className="section-title">
          From Principles
          <br />
          to Practice.
        </h2>
        <p className="lead">
          The language is product-agnostic, so the same rigid grid and liquid glass that document it
          here run unchanged in shipping work — some products speak it whole, others lean on the
          structured-containment half alone. These are real products in production, built on
          Structured Liquidity rather than described by it.
        </p>
      </div>

      <div className="show-grid reveal">
        {CARDS.map((c) => (
          <a
            key={c.url}
            className="show-card glass"
            href={c.href}
            target="_blank"
            rel="noopener"
            aria-label={`Visit ${c.url}, a product built on Structured Liquidity (opens in a new tab)`}
          >
            <div className="browser-bar">
              <span className="tl"></span>
              <span className="tl"></span>
              <span className="tl"></span>
              <span className="url">{c.url}</span>
            </div>
            <div className="show-card-shot">
              <img
                src={c.shot}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                alt={c.shotAlt}
              />
              <div className="show-card-veil">
                <div className="vbody">
                  <p className="show-card-desc">{c.desc}</p>
                  <span className="show-card-cta">
                    Visit {c.url} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="show-card-foot">
              <span className="sl-ava" style={c.favStyle}>
                <img
                  src={c.fav}
                  width={c.favW}
                  height={c.favH}
                  loading="lazy"
                  decoding="async"
                  alt={c.favAlt}
                />
              </span>
              <div className="show-id">
                <span className="show-name">{c.name}</span>
                <span className="mono">{c.tag}</span>
              </div>
              <span className="sl-badge default">Live</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
