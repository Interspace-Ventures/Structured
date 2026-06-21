import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<PopoverCtx | null>(null);
const usePopover = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Popover subcomponents must be used within <Popover>");
  return c;
};

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Structured Liquidity popover — glass menu anchored to a trigger. */
export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: PopoverProps) {
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

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function PopoverTrigger({
  asChild,
  className,
  children,
  onClick,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen } = usePopover();
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler;
      "data-pop"?: boolean;
      "aria-expanded"?: boolean;
    }>;
    return React.cloneElement(child, {
      "data-pop": true,
      "aria-expanded": open,
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e as React.MouseEvent<Element, MouseEvent>);
        setOpen(!open);
      },
    });
  }
  return (
    <button
      type="button"
      data-pop
      aria-expanded={open}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        setOpen(!open);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function PopoverContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = usePopover();
  return <div className={cn("sl-menu", open && "open", className)} {...props} />;
}
