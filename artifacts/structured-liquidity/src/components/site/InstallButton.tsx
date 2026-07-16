import { useState } from "react";
import { Download, Check } from "lucide-react";
import { useToast } from "@/components/ui/toast";

/** The registry item a bare Install copies — the base style brings the whole language. */
const DEFAULT_ITEM = "structured-liquidity";

/** Build the install command from wherever the registry is being served. */
export function installCommand(item: string = DEFAULT_ITEM) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://structured.glass";
  return `npx shadcn@latest add ${origin}/r/${item}.json`;
}

interface InstallButtonProps {
  item?: string;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  /** Render the icon only (no text label) — used in the compact top nav. */
  iconOnly?: boolean;
}

/**
 * Install button — copies the `npx shadcn@latest add …` command for the SL
 * registry to the clipboard and confirms with a toast. Pairs with a separate
 * GitHub "view source" link elsewhere in each CTA.
 */
export function InstallButton({
  item = DEFAULT_ITEM,
  className = "btn solid",
  label = "Install",
  style,
  iconOnly = false,
}: InstallButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const cmd = installCommand(item);

  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(cmd);
        } catch {
          /* clipboard unavailable — still toast so the user sees the command */
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
        toast({ title: "Copied install command", description: cmd });
      }}
    >
      {copied ? <Check /> : <Download />}
      {iconOnly ? null : copied ? "Copied" : label}
    </button>
  );
}
