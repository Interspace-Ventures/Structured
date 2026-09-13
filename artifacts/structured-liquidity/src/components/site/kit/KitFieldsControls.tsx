import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";

export function KitFieldsControls() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Fields &amp; controls</span>
        <span className="kg-rule"></span>
        <span className="kg-count">
          Button group · Field · Input group · Kbd · Spinner
        </span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w4">
          <span className="kit-cap">Button group</span>
          <ButtonGroup defaultValue="Week">
            <ButtonGroupItem value="Day">Day</ButtonGroupItem>
            <ButtonGroupItem value="Week">Week</ButtonGroupItem>
            <ButtonGroupItem value="Month">Month</ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Field</span>
          <Field invalid>
            <FieldLabel>Workspace URL</FieldLabel>
            <input className="sl-input" defaultValue="kepler-station" />
            <FieldError>Already taken, try another.</FieldError>
          </Field>
          <Field>
            <FieldLabel>Display name</FieldLabel>
            <input className="sl-input" placeholder="Kepler Station" />
            <FieldDescription>Shown on your public profile.</FieldDescription>
          </Field>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Input group</span>
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput defaultValue="kepler-station.example" />
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Search observations" />
            <InputGroupAddon suffix>⌘K</InputGroupAddon>
          </InputGroup>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Kbd</span>
          <div className="kit-row" style={{ justifyContent: "space-between" }}>
            <span
              className="mono"
              style={{ fontSize: "0.78rem", color: "var(--ink-dim)" }}
            >
              Command
            </span>
            <span>
              <Kbd>⌘</Kbd> <Kbd>K</Kbd>
            </span>
          </div>
          <div className="kit-row" style={{ justifyContent: "space-between" }}>
            <span
              className="mono"
              style={{ fontSize: "0.78rem", color: "var(--ink-dim)" }}
            >
              Save
            </span>
            <span>
              <Kbd>⌘</Kbd> <Kbd>S</Kbd>
            </span>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Spinner</span>
          <div
            className="kit-row"
            style={{ alignItems: "center", gap: "1rem" }}
          >
            <Spinner />
            <Spinner style={{ width: "20px", height: "20px" }} />
            <Spinner
              style={{
                width: "28px",
                height: "28px",
                borderWidth: "3px",
                color: "var(--accent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
