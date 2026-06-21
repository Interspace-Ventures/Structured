import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<DropdownCtx | null>(null);
const useDropdown = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("DropdownMenu subcomponents must be used within <DropdownMenu>");
  return c;
};

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Structured Liquidity dropdown menu — glass menu of items, labels & separators. */
export function DropdownMenu({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: DropdownMenuProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  const wrapRef = React.useRef<HTMLDivElement>(null);

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
      <Ctx.Provider value={{ open: o, setOpen }}>{children}</Ctx.Provider>
    </div>
  );
}

export function DropdownMenuTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdown();
  return (
    <button
      type="button"
      className={cn("sl-trigger", className)}
      data-pop
      aria-haspopup="menu"
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

export function DropdownMenuContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useDropdown();
  return <div className={cn("sl-menu", open && "open", className)} {...props} />;
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcut?: React.ReactNode;
}
export function DropdownMenuItem({
  className,
  children,
  shortcut,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdown();
  return (
    <div
      className={cn("item", className)}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
      {shortcut != null && <span className="k">{shortcut}</span>}
    </div>
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("lbl", className)} {...props} />;
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sep", className)} {...props} />;
}
