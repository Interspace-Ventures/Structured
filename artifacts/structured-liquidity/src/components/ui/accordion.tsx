import * as React from "react";
import { cn } from "@/lib/utils";

interface AccCtx {
  open: string[];
  toggle: (v: string) => void;
}
const Ctx = React.createContext<AccCtx | null>(null);
const useAcc = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Accordion subcomponents must be used within <Accordion>");
  return c;
};
interface ItemCtx {
  value: string;
  isOpen: boolean;
}
const ICtx = React.createContext<ItemCtx | null>(null);
const useItem = () => {
  const c = React.useContext(ICtx);
  if (!c) throw new Error("AccordionTrigger/Content must be used within <AccordionItem>");
  return c;
};

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
}

/** Structured Liquidity accordion — plus/minus marker, max-height reveal. */
export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const init = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];
  const [open, setOpen] = React.useState<string[]>(init);
  const toggle = (v: string) =>
    setOpen((prev) => {
      const has = prev.includes(v);
      if (type === "single") return has ? (collapsible ? [] : prev) : [v];
      return has ? prev.filter((x) => x !== v) : [...prev, v];
    });
  return (
    <div className={className} {...props}>
      <Ctx.Provider value={{ open, toggle }}>{children}</Ctx.Provider>
    </div>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { open } = useAcc();
  const isOpen = open.includes(value);
  return (
    <div className={cn("sl-acc-item", isOpen && "open", className)} {...props}>
      <ICtx.Provider value={{ value, isOpen }}>{children}</ICtx.Provider>
    </div>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { toggle } = useAcc();
  const { value, isOpen } = useItem();
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      className={cn("sl-acc-head", className)}
      onClick={() => toggle(value)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle(value);
        }
      }}
      {...props}
    >
      {children}
      <span className="pm" />
    </div>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useItem();
  const ref = React.useRef<HTMLDivElement>(null);
  const [max, setMax] = React.useState<number | undefined>(isOpen ? undefined : 0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setMax(isOpen ? el.scrollHeight : 0);
  }, [isOpen, children]);
  return (
    <div
      ref={ref}
      className={cn("sl-acc-body", className)}
      style={{ maxHeight: max }}
      {...props}
    >
      {children}
    </div>
  );
}
