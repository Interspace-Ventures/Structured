export function Pillars() {
  return (
    <section id="manifesto" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Principles · the foundation</span>
        <h2 className="section-title">Structure holds it. Liquidity fills it.</h2>
        <p className="lead">
          Most systems pick a side: flat utility or glossy depth. Structured Liquidity refuses the
          choice and holds both at once, a rigid, unambiguous grid containing a fluid, living
          material. It stands on three pillars, each with the working rules that keep it honest.
        </p>
      </div>

      <div className="pillars">
        <div className="glass pillar reveal">
          <span className="pnum">Pillar 01</span>
          <h3>Structured Containment</h3>
          <p>
            Sharp 90° corners, flat unblurred shadows, a strict grid. Boundaries are never
            ambiguous.
          </p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">Shadows stay flat</strong>: offset, solid, hard-edged. A
                structural fact, not a mood.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">Borders carry weight</strong>: 2–3px, never decorative.
                The edge defines the object.
              </div>
            </li>
          </ul>
        </div>

        <div className="glass pillar reveal">
          <span className="pnum">Pillar 02</span>
          <h3>Liquid Depth</h3>
          <p>
            Inside the rigid boxes lives a <strong className="accent">tactile glass</strong> that is
            organic, translucent, light-reflecting, and alive.
          </p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">Depth through layers</strong>: stack translucent
                surfaces, each with a real border and flat shadow.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">Motion proves mass</strong>: press a surface and it
                settles into its own shadow.
              </div>
            </li>
          </ul>
        </div>

        <div className="glass pillar reveal">
          <span className="pnum">Pillar 03</span>
          <h3>Semantic Clarity</h3>
          <p>Liquidity delights, but never at the expense of reading. Function leads.</p>
          <ul>
            <li>
              <div>
                <strong className="rule-h">One accent, clearly</strong>: a single accent carries
                emphasis; glass stays neutral so it lands.
              </div>
            </li>
            <li>
              <div>
                <strong className="rule-h">Type with intent</strong>: heavy grotesk for impact,
                monospace for labels and data.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
