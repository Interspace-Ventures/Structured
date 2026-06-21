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
Rules:
- Square corners (border-radius: 0).
- Flat offset shadows only: box-shadow: 7px 7px 0 0 #000, never blurred.
- Solid 2px black borders; the edge defines the object.
- Exactly one accent (#a388ee) carries all emphasis.
- Liquid glass = backdrop-filter blur over translucent white rgba(255,255,255,0.07).
- Destructive surfaces are neutral gray (#3c3f4b), never red.
- Type: Archivo for headings/buttons/brand, Outfit for body, Space Mono for labels and data.
- Leading icons (Lucide) on nav links and buttons.
Use the tokens in design-tokens.json and the component markup in registry.json.
Full spec: llms.txt.`;

const ROOT_TOKENS = `:root{
  --accent:#a388ee; --accent-ink:#000000;
  --bg:#272933; --bg-2:#1f2028; --ink:#e6e6e6; --ink-dim:#9da0ab;
  --edge:0 0 0; --hard-shadow:#000000; --neg:#3c3f4b; --neg-ink:#f0f0f2;
  --glass-blur:18px; --glass-tint:255 255 255; --glass-alpha:0.07;
  --border-w:2px; --hard-x:7px; --hard-y:7px; --radius:0px;
  --display:"Archivo","Helvetica Neue",system-ui,sans-serif;
  --body:"Outfit","Helvetica Neue",system-ui,sans-serif;
  --mono:"Space Mono",ui-monospace,"SFMono-Regular",monospace;
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
          Structured Liquidity ships its rules, tokens, and components in formats an AI agent can
          read directly, so the language travels into new products without losing its grammar. Point
          any AI tool at the files below, or paste the prompt into your assistant.
        </p>
      </div>

      <div className="kit-grid gallery reveal adopt-gallery">
        <div className="glass kit-cell">
          <span className="kit-cap">
            <FileText />
            llms.txt
          </span>
          <p>
            The AI-discoverable summary: the three pillars, the hard rules, the tokens, and the font
            pairings, all in one Markdown file at the site root.
          </p>
          <a className="sl-btn default" href="llms.txt" target="_blank" rel="noopener">
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
            Every token in the W3C Design Tokens format, each carrying its exact CSS variable name.
            Import it instead of guessing values.
          </p>
          <a className="sl-btn default" href="design-tokens.json" target="_blank" rel="noopener">
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
            A shadcn-compatible registry: install the whole language or any single component with the
            shadcn CLI — every item is a valid <code>registry-item</code> served at{" "}
            <code>/r/*.json</code>.
          </p>
          <a className="sl-btn default" href="registry.json" target="_blank" rel="noopener">
            <ExternalLink />
            Open registry
          </a>
        </div>

        <div className="glass kit-cell">
          <div className="adopt-h">
            <span className="kit-cap">
              <Terminal />
              Install with shadcn
            </span>
            <CopyButton text={installCommand()} />
          </div>
          <p>
            Drop the entire design language — tokens, stylesheets, and kit script — into any
            shadcn-configured project. Add a single component by swapping the file name (e.g.{" "}
            <code>/r/button.json</code>).
          </p>
          <pre id="install-cmd" className="code-block">
            {installCommand()}
          </pre>
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
