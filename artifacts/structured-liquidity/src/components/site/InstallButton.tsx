import { useState } from "react";
import { Download, Check } from "lucide-react";
import { useToast } from "@/components/ui/toast";

/** The registry item a bare Install copies — the base style brings the whole language. */
const DEFAULT_ITEM = "structured-liquidity";

/** Build the install command from wherever the registry is being served. */
export function installCommand(item: string = DEFAULT_ITEM) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://structured-liquidity.replit.app";
  return `npx shadcn@latest add ${origin}/r/${item}.json`;
}

interface InstallButtonProps {
  item?: string;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
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
}: InstallButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const cmd = installCommand(item);

  return (
    <button
      type="button"
      className={className}
      style={style}
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
      {copied ? "Copied" : label}
    </button>
  );
}
