import { useState } from "react";
import {
  FileText,
  Palette,
  LayoutGrid,
  Bot,
  Code,
  Copy,
  Check,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { installCommand } from "./InstallButton";

const AI_PROMPT = `You are designing in the Structured Liquidity UI language.
Before editing UI, install the theme and its local agent skill:
npx shadcn@latest add https://structured.glass/r/structured-liquidity-agent.json
Verify that the Structured Liquidity styles and .agents/skills/structured-liquidity/SKILL.md exist before continuing.
Rules:
- Square corners (border-radius: 0).
- Flat offset shadows only: box-shadow: 5px 5px 0 0 #000, never blurred; reserve them for tactile affordances and intentional cutout layers.
- Solid 2px black borders; the edge defines the object.
- Exactly one accent (#a388ee) carries all emphasis.
- Default information surfaces are flat; do not use decorative gradients as shorthand for liquidity.
- Liquid Motion belongs in shared markers and transitions between navbar actions, menu options, tabs, filters, overlays, and page areas. Reserve neutral translucency and backdrop blur for those moving state boundaries.
- Destructive surfaces are neutral gray (#242424), never red.
- Dark mode derives its atmospheric field from the active accent; purple becomes aubergine, green becomes deep green, and yellow becomes deep ochre. There is no separate black mode; charcoal components sit above the tinted field.
- Type: Inter for headings/buttons/brand and body, Space Mono only for labels and data.
- Scientific Modern Clarity: communicate meaning with a rational grid, exact alignment, measured line lengths, purposeful whitespace, evidence, and one dominant statement per view.
- Leading icons (Lucide) on nav links and buttons.
Use the tokens in design-tokens.json and the component markup in registry.json.
Full spec: llms.txt.`;

const ROOT_TOKENS = `:root{
  --accent:#a388ee; --accent-ink:#000000;
  --bg:#f2f0ea; --bg-2:#ffffff; --ink:#111111; --ink-dim:#5d5d59;
  --edge:0 0 0; --hard-shadow:#000000; --neg:#242424; --neg-ink:#ffffff;
  --glass-blur:14px; --glass-tint:255 255 255; --glass-alpha:0.72;
  --border-w:2px; --hard-x:5px; --hard-y:5px; --radius:0px;
  --display:"Inter","Helvetica Neue",Arial,system-ui,sans-serif;
  --body:"Inter","Helvetica Neue",Arial,system-ui,sans-serif;
  --mono:"Space Mono","SFMono-Regular",ui-monospace,monospace;
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="sl-btn secondary sl-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <Check /> : <Copy />}
      <span className="copy-label">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export function Adopt() {
  return (
    <section id="adopt" className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Agent-ready · adopt the language</span>
        <h2 className="section-title">Built to be read by machines.</h2>
        <p className="lead">
          Give an agent one command before its first UI edit. It installs both
          the theme and a local Structured Liquidity skill, so the rules stay in
          the project instead of being rediscovered over several iterations.
        </p>
      </div>

      <div className="kit-grid gallery reveal adopt-gallery">
        <div className="glass kit-cell">
          <span className="kit-cap">
            <FileText />
            llms.txt
          </span>
          <p>
            The AI-discoverable summary: the three tenets, the hard rules, the
            tokens, and the font pairings, all in one Markdown file at the site
            root.
          </p>
          <a
            className="sl-btn default"
            href="llms.txt"
            target="_blank"
            rel="noopener"
          >
            <ExternalLink />
            Open llms.txt
          </a>
        </div>
        <div className="glass kit-cell">
          <span className="kit-cap">
            <Palette />
            design-tokens.json
          </span>
          <p>
            Every token in the W3C Design Tokens format, each carrying its exact
            CSS variable name. Import it instead of guessing values.
          </p>
          <a
            className="sl-btn default"
            href="design-tokens.json"
            target="_blank"
            rel="noopener"
          >
            <ExternalLink />
            Open tokens
          </a>
        </div>
        <div className="glass kit-cell">
          <span className="kit-cap">
            <LayoutGrid />
            registry.json
          </span>
          <p>
            A shadcn-compatible registry: install the whole language or any
            single component with the shadcn CLI — every item is a valid{" "}
            <code>registry-item</code> served at <code>/r/*.json</code>.
          </p>
          <a
            className="sl-btn default"
            href="registry.json"
            target="_blank"
            rel="noopener"
          >
            <ExternalLink />
            Open registry
          </a>
        </div>

        <div className="glass kit-cell">
          <div className="adopt-h">
            <span className="kit-cap">
              <Terminal />
              Install theme + agent skill
            </span>
            <CopyButton text={installCommand()} />
          </div>
          <p>
            Run this first. It installs the full design language and writes the
            local agent skill that tells future coding agents to use it.
            Individual components can then be added by swapping the file name
            (for example, <code>/r/button.json</code>).
          </p>
          <pre id="install-cmd" className="code-block">
            {installCommand()}
          </pre>
          <p>
            Theme only: <code>{installCommand("structured-liquidity")}</code>
          </p>
        </div>

        <div className="glass kit-cell">
          <div className="adopt-h">
            <span className="kit-cap">
              <Bot />
              Paste into your AI
            </span>
            <CopyButton text={AI_PROMPT} />
          </div>
          <pre id="ai-prompt" className="code-block">
            {AI_PROMPT}
          </pre>
        </div>
        <div className="glass kit-cell">
          <div className="adopt-h">
            <span className="kit-cap">
              <Code />
              :root tokens
            </span>
            <CopyButton text={ROOT_TOKENS} />
          </div>
          <pre id="root-tokens" className="code-block">
            {ROOT_TOKENS}
          </pre>
        </div>
      </div>
    </section>
  );
}
