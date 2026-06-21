import * as React from "react";
import { cn } from "@/lib/utils";

interface CollapsibleCtx {
  open: boolean;
  toggle: () => void;
}
const Ctx = React.createContext<CollapsibleCtx | null>(null);
const useCollapsible = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Collapsible subcomponents must be used within <Collapsible>");
  return c;
};

export interface CollapsibleProps
  extends Omit<React.HTMLAttributes<HTMLDetailsElement>, "onToggle"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Structured Liquidity collapsible — native details frame, glass body. */
export function Collapsible({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const toggle = () => {
    const next = !o;
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };
  return (
    <details className={cn("sl-collapsible", className)} open={o} {...props}>
      <Ctx.Provider value={{ open: o, toggle }}>{children}</Ctx.Provider>
    </details>
  );
}

export function CollapsibleTrigger({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { toggle } = useCollapsible();
  return (
    <summary
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        toggle();
      }}
      {...props}
    >
      {children}
    </summary>
  );
}

export function CollapsibleContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cc-body", className)} {...props} />;
}
