export function Tenets() {
  return (
    <section id="manifesto" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Principles · the foundation</span>
        <h2 className="section-title">Three tenets. One design language.</h2>
        <p className="lead">
          Neobrutalist structure makes the interface tangible. Liquid Motion
          makes changing state perceptible. Scientific Modern Clarity makes
          information ordered and unmistakable. Together these three tenets form
          Structured Liquidity.
        </p>
      </div>

      <div className="tenets">
        <article className="tenet tenet-neobrutalism reveal">
          <span className="pnum">Tenet 01</span>
          <span className="psub">Frame</span>
          <h3>Neobrutalist structure</h3>
          <p>
            Buttons, borders, navigation, footers, body containers, and panels
            form a tactile system through square geometry, obvious controls and
            boundaries, and selective flat shadows.
          </p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">Shadows stay flat</strong>: offset,
                solid, hard-edged. A structural fact, not a mood.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">Borders carry weight</strong>: 2–3px,
                never decorative. The edge defines the object.
              </div>
            </li>
          </ul>
        </article>

        <article className="tenet tenet-liquid reveal">
          <span className="pnum">Tenet 02</span>
          <span className="psub">Transition</span>
          <h3>Liquid Motion</h3>
          <p>
            Motion carries state between navbar actions, menu options, tabs,
            filters, overlays, and page areas without becoming the only carrier
            of meaning.
          </p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">
                  One marker carries continuity
                </strong>
                : selection travels between related options instead of
                repainting each surface.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">Motion explains change</strong>:
                liquid settles, connects, and reveals state inside a frame that
                never wobbles, with a complete reduced-motion state.
              </div>
            </li>
          </ul>
        </article>

        <article className="tenet tenet-clarity reveal">
          <span className="pnum">Tenet 03</span>
          <span className="psub">Hierarchy</span>
          <h3>Scientific Modern Clarity</h3>
          <p>
            Information organized through rational grids, disciplined hierarchy,
            measured typography, captions, evidence, and purposeful whitespace.
            Swiss modernism is the informing tradition. Every screen remains
            complete and useful without relying on color, glass, or motion.
          </p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">
                  Monochrome carries information
                </strong>
                : accent marks selection, progression, or one key relationship.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">
                  Every position is intentional
                </strong>
                : type, captions, data, and controls align to the same measured
                grid.
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
