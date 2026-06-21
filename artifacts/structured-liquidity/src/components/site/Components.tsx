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

export function Components() {
  return (
    <section id="components" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Components · the toolkit</span>
        <h2 className="section-title">
          A complete library,
          <br />
          in the language.
        </h2>
        <p className="lead">
          More than sixty primitives, from buttons and forms to overlays, navigation, and data
          display, each one a rigid container holding liquid glass. None of it is a static mockup:
          click, type, toggle, and open, and every piece reskins from the same live tokens.
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
      </div>
    </section>
  );
}
