import * as React from "react";
import { ArrowUp, Mic, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OmnibarProps extends React.FormHTMLAttributes<HTMLFormElement> {
  placeholder?: string;
  inputLabel?: string;
  status?: React.ReactNode;
}

/** Universal intake surface distilled from Dropship and Observatory. */
export const Omnibar = React.forwardRef<HTMLFormElement, OmnibarProps>(
  (
    {
      placeholder = "Paste a link, attach a file, or ask anything",
      inputLabel = "Command",
      status,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <form ref={ref} className={cn("sl-omnibar", className)} {...props}>
      {children ? <div className="sl-omnibar-attachments">{children}</div> : null}
      <div className="sl-omnibar-row">
        <button type="button" className="sl-omnibar-icon" aria-label="Attach">
          <Paperclip />
        </button>
        <input className="sl-omnibar-input" aria-label={inputLabel} placeholder={placeholder} />
        {status ? <span className="sl-omnibar-status">{status}</span> : null}
        <button type="button" className="sl-omnibar-icon" aria-label="Use voice">
          <Mic />
        </button>
        <button type="submit" className="sl-omnibar-submit" aria-label="Submit">
          <ArrowUp />
        </button>
      </div>
    </form>
  ),
);
Omnibar.displayName = "Omnibar";

export interface OmnibarAttachmentProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
}

export function OmnibarAttachment({
  onRemove,
  className,
  children,
  ...props
}: OmnibarAttachmentProps) {
  return (
    <span className={cn("sl-omnibar-attachment", className)} {...props}>
      {children}
      {onRemove ? (
        <button type="button" onClick={onRemove} aria-label={`Remove ${String(children)}`}>
          <X />
        </button>
      ) : null}
    </span>
  );
}
