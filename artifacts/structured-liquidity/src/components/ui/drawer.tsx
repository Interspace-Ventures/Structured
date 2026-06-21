import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DrawerCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<DrawerCtx | null>(null);
const useDrawer = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Drawer subcomponents must be used within <Drawer>");
  return c;
};

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/** Structured Liquidity drawer — full-width panel that rises from the bottom edge. */
export function Drawer({ open, defaultOpen, onOpenChange, children }: DrawerProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  return <Ctx.Provider value={{ open: o, setOpen }}>{children}</Ctx.Provider>;
}

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function DrawerTrigger({ asChild, children, onClick, ...props }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();
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

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** extra class on the .sl-overlay backdrop */
  overlayClassName?: string;
}
export function DrawerContent({
  className,
  overlayClassName,
  children,
  ...props
}: DrawerContentProps) {
  const { open, setOpen } = useDrawer();

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
      className={cn("sl-overlay", "sl-drawer-overlay", open && "open", overlayClassName)}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div role="dialog" aria-modal="true" className={cn("sl-drawer", className)} {...props}>
        <span className="dr-grip" aria-hidden="true" />
        {children}
      </div>
    </div>,
    document.body,
  );
}

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function DrawerClose({ asChild, children, onClick, ...props }: DrawerCloseProps) {
  const { setOpen } = useDrawer();
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
