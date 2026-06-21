import * as React from "react";
import { cn } from "@/lib/utils";

interface CommandCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
}
const Ctx = React.createContext<CommandCtx | null>(null);
const useCommand = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Command subcomponents must be used within <Command>");
  return c;
};

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Structured Liquidity command / combobox — searchable glass menu of items. */
export function Command({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: CommandProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const [query, setQuery] = React.useState("");
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };

  React.useEffect(() => {
    if (!o) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o]);

  return (
    <div ref={wrapRef} className={cn("sl-pop-wrap", className)} {...props}>
      <Ctx.Provider value={{ open: o, setOpen, query, setQuery }}>{children}</Ctx.Provider>
    </div>
  );
}

export function CommandTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useCommand();
  return (
    <button
      type="button"
      className={cn("sl-trigger", className)}
      data-pop
      aria-expanded={open}
      onClick={(e) => {
        onClick?.(e);
        setOpen(!open);
      }}
      {...props}
    >
      <span>{children}</span>
      <span className="chev">▾</span>
    </button>
  );
}

export function CommandContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useCommand();
  return <div className={cn("sl-menu", open && "open", className)} {...props} />;
}

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {}
export function CommandInput({ className, ...props }: CommandInputProps) {
  const { open, query, setQuery } = useCommand();
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => ref.current?.focus(), 30);
    return () => clearTimeout(id);
  }, [open]);
  return (
    <input
      ref={ref}
      className={cn("sl-cmd-search", className)}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}

export function CommandLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("lbl", className)} {...props} />;
}

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** override the text used for filtering (defaults to the children text) */
  value?: string;
}
export function CommandItem({
  value,
  className,
  children,
  onClick,
  ...props
}: CommandItemProps) {
  const { query, setOpen } = useCommand();
  const text = (value ?? (typeof children === "string" ? children : "")).toLowerCase();
  const hidden = query !== "" && !text.includes(query.toLowerCase());
  return (
    <div
      className={cn("item", className)}
      style={hidden ? { display: "none" } : undefined}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
