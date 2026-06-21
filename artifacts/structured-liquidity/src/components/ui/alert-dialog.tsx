import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface AlertDialogCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<AlertDialogCtx | null>(null);
const useAlertDialog = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("AlertDialog subcomponents must be used within <AlertDialog>");
  return c;
};

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/** Structured Liquidity alert dialog — modal confirmation that settles into its flat shadow. */
export function AlertDialog({ open, defaultOpen, onOpenChange, children }: AlertDialogProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const o = isControlled ? open : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  return <Ctx.Provider value={{ open: o, setOpen }}>{children}</Ctx.Provider>;
}

export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export function AlertDialogTrigger({
  asChild,
  children,
  onClick,
  ...props
}: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialog();
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

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** extra class on the .sl-overlay backdrop */
  overlayClassName?: string;
}
export function AlertDialogContent({
  className,
  overlayClassName,
  children,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen } = useAlertDialog();

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
        role="alertdialog"
        aria-modal="true"
        className={cn("sl-dialog", className)}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function AlertDialogAction({
  className,
  onClick,
  ...props
}: AlertDialogActionProps) {
  const { setOpen } = useAlertDialog();
  return (
    <button
      type="button"
      className={cn("sl-btn", "destructive", className)}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

export interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function AlertDialogCancel({
  className,
  onClick,
  ...props
}: AlertDialogCancelProps) {
  const { setOpen } = useAlertDialog();
  return (
    <button
      type="button"
      className={cn("sl-btn", "ghost", className)}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}
