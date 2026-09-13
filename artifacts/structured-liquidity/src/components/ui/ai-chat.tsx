import * as React from "react";
import { Sparkles, Paperclip, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  from: "bot" | "me";
  text: React.ReactNode;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    from: "bot",
    text: "Hey, I'm Vector. Ask me to draft, summarize, or name anything.",
  },
  { from: "me", text: "Summarize the latest transit observation." },
  {
    from: "bot",
    text: "One stable orbit, two anomalies, and a clean signal window at 03:20 UTC.",
  },
];

const DEFAULT_SUGGESTIONS = ["Show anomalies", "Compare orbits", "Draft a log"];

export interface AIChatProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: string;
  placeholder?: string;
  messages?: ChatMessage[];
  suggestions?: string[];
}

/** Structured Liquidity AI chat — a rigid conversation panel with glass bubbles, animated by the kit script. */
export const AIChat = React.forwardRef<HTMLDivElement, AIChatProps>(
  (
    {
      name = "Vector",
      role = "AI assistant",
      placeholder = "Ask Vector anything",
      messages = DEFAULT_MESSAGES,
      suggestions = DEFAULT_SUGGESTIONS,
      className,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("sl-chat", className)} data-chat {...props}>
      <div className="ch-head">
        <span className="ch-ava">
          <Sparkles />
        </span>
        <span className="ch-id">
          <strong>{name}</strong>
          <span>{role}</span>
        </span>
        <span className="ch-dot" title="Online" aria-hidden="true" />
      </div>
      <div className="ch-log" data-chat-log role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div className={cn("ch-msg", m.from)} key={i}>
            {m.from === "bot" && (
              <span className="ch-b-ava">
                <Sparkles />
              </span>
            )}
            <div className="ch-bubble">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="ch-suggest" data-chat-suggest>
        {suggestions.map((s, i) => (
          <button type="button" className="ch-chip" key={i}>
            {s}
          </button>
        ))}
      </div>
      <form className="ch-form" data-chat-form>
        <span className="ch-attach" aria-hidden="true">
          <Paperclip />
        </span>
        <input
          className="ch-input"
          data-chat-input
          type="text"
          placeholder={placeholder}
          aria-label={`Message ${name}`}
          autoComplete="off"
        />
        <span className="ch-mic" aria-hidden="true">
          <Mic />
        </span>
        <button type="submit" className="ch-send" aria-label="Send message">
          <ArrowUp />
        </button>
      </form>
    </div>
  ),
);
AIChat.displayName = "AIChat";
