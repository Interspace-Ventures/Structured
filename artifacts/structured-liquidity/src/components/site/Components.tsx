import { KitActions } from "./kit/KitActions";
import { KitContentData } from "./kit/KitContentData";
import { KitDataDisplay } from "./kit/KitDataDisplay";
import { KitFieldsControls } from "./kit/KitFieldsControls";
import { KitFormsInputs } from "./kit/KitFormsInputs";
import { KitLayoutStructure } from "./kit/KitLayoutStructure";
import { KitMenusOverlays } from "./kit/KitMenusOverlays";
import { KitNavigation } from "./kit/KitNavigation";
import { KitNavDisclosure } from "./kit/KitNavDisclosure";
import { KitOverlaysFeedback } from "./kit/KitOverlaysFeedback";
import { KitPatterns } from "./kit/KitPatterns";
import { Templates } from "./Templates";

export function Components() {
  return (
    <section id="components" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Components · the toolkit</span>
        <h2 className="section-title">
          The useful patterns,
          <br />
          without the repeats.
        </h2>
        <p className="lead">
          A curated view of the patterns that carry a distinct job in a real
          product. The full installable registry remains available; this gallery
          favors useful composition, working state, and motion you can test by
          clicking, typing, toggling, and opening. Demo content belongs to the
          fictional Kepler Station survey, keeping product examples coherent
          without borrowing private language from live applications.
        </p>
      </div>

      <div className="kit-groups">
        <KitActions />
        <KitContentData />
        <KitDataDisplay />
        <KitFieldsControls />
        <KitFormsInputs />
        <KitLayoutStructure />
        <KitMenusOverlays />
        <KitNavigation />
        <KitNavDisclosure />
        <KitOverlaysFeedback />
        <KitPatterns />
        <Templates />
      </div>
    </section>
  );
}
