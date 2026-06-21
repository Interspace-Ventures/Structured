import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DialogCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<DialogCtx | null>(null);
const useDialog = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Dialog subcomponents must be used within <Dialog>");
  return c;
};

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/** Structured Liquidity dialog — modal that settles into its flat shadow on open. */
export function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  return <Ctx.Provider value={{ open: o, setOpen }}>{children}</Ctx.Provider>;
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function DialogTrigger({ asChild, children, onClick, ...props }: DialogTriggerProps) {
  const { setOpen } = useDialog();
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

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** extra class on the .sl-overlay backdrop (e.g. sl-sheet-overlay) */
  overlayClassName?: string;
  /** the inner panel class — defaults to sl-dialog; use sl-sheet / sl-drawer for variants */
  panelClassName?: string;
}
export function DialogContent({
  className,
  overlayClassName,
  panelClassName = "sl-dialog",
  children,
  ...props
}: DialogContentProps) {
  const { open, setOpen } = useDialog();

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
      className={cn("sl-overlay", open && "open", overlayClassName)}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(panelClassName, className)}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function DialogClose({ asChild, children, onClick, ...props }: DialogCloseProps) {
  const { setOpen } = useDialog();
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
