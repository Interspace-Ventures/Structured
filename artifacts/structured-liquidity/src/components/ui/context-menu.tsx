import * as React from "react";
import { cn } from "@/lib/utils";

interface ContextMenuCtx {
  open: boolean;
  pos: { x: number; y: number };
  openAt: (x: number, y: number) => void;
  close: () => void;
}
const Ctx = React.createContext<ContextMenuCtx | null>(null);
const useContextMenu = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("ContextMenu subcomponents must be used within <ContextMenu>");
  return c;
};

/** Structured Liquidity context menu — a glass menu summoned at the cursor. */
export function ContextMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const openAt = (x: number, y: number) => {
    setPos({ x, y });
    setOpen(true);
  };
  const close = () => setOpen(false);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = () => close();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={cn("sl-pop-wrap", className)} {...props}>
      <Ctx.Provider value={{ open, pos, openAt, close }}>{children}</Ctx.Provider>
    </div>
  );
}

export function ContextMenuTrigger({
  className,
  onContextMenu,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { openAt } = useContextMenu();
  return (
    <div
      className={cn("sl-ctx-area", className)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e);
        openAt(e.clientX, e.clientY);
      }}
      {...props}
    />
  );
}

export function ContextMenuContent({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, pos } = useContextMenu();
  if (!open) return null;
  return (
    <div
      className={cn("sl-ctx-menu", className)}
      style={{ position: "fixed", top: pos.y, left: pos.x, zIndex: 200, ...style }}
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  );
}

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcut?: React.ReactNode;
}
export function ContextMenuItem({
  className,
  children,
  shortcut,
  onClick,
  ...props
}: ContextMenuItemProps) {
  const { close } = useContextMenu();
  return (
    <div
      className={cn("item", className)}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      {...props}
    >
      {children}
      {shortcut != null && <span className="k">{shortcut}</span>}
    </div>
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sep", className)} {...props} />;
}
