import * as React from "react";
import { cn } from "@/lib/utils";

interface MenuCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = React.createContext<MenuCtx | null>(null);
const useMenu = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("MenubarTrigger/Content must be used within <MenubarMenu>");
  return c;
};

/** Structured Liquidity menubar — a rigid horizontal bar of menus. */
export function Menubar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-menubar", className)} {...props} />;
}

export function MenubarMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function MenubarTrigger({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useMenu();
  return (
    <button
      type="button"
      className={className}
      aria-expanded={open}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
        setOpen(!open);
      }}
      {...props}
    />
  );
}

export function MenubarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useMenu();
  return (
    <div
      className={cn("sl-menu", open && "open", className)}
      onMouseDown={(e) => e.stopPropagation()}
      {...props}
    />
  );
}

export interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcut?: React.ReactNode;
}
export function MenubarItem({
  className,
  children,
  shortcut,
  onClick,
  ...props
}: MenubarItemProps) {
  const { setOpen } = useMenu();
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
