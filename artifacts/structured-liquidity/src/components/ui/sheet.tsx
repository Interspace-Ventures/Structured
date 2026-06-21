import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface SheetCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<SheetCtx | null>(null);
const useSheet = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Sheet subcomponents must be used within <Sheet>");
  return c;
};

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/** Structured Liquidity sheet — side panel that slides in from the structural edge. */
export function Sheet({ open, defaultOpen, onOpenChange, children }: SheetProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  return <Ctx.Provider value={{ open: o, setOpen }}>{children}</Ctx.Provider>;
}

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function SheetTrigger({ asChild, children, onClick, ...props }: SheetTriggerProps) {
  const { setOpen } = useSheet();
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e as React.MouseEvent<Element, MouseEvent>);
        setOpen(true);
      },
    });
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(true);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** extra class on the .sl-overlay backdrop */
  overlayClassName?: string;
}
export function SheetContent({
  className,
  overlayClassName,
  children,
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheet();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn("sl-overlay", "sl-sheet-overlay", open && "open", overlayClassName)}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div role="dialog" aria-modal="true" className={cn("sl-sheet", className)} {...props}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function SheetClose({ asChild, children, onClick, ...props }: SheetCloseProps) {
  const { setOpen } = useSheet();
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e as React.MouseEvent<Element, MouseEvent>);
        setOpen(false);
      },
    });
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
