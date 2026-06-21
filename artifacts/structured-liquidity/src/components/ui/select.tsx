import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
  value: string;
  setValue: (v: string) => void;
  labels: Record<string, React.ReactNode>;
  register: (v: string, label: React.ReactNode) => void;
}
const Ctx = React.createContext<SelectCtx | null>(null);
const useSelect = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Select subcomponents must be used within <Select>");
  return c;
};

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Structured Liquidity select — glass trigger reveals a menu of options. */
export function Select({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: SelectProps) {
  const [open, setOpenState] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({});

  const wrapRef = React.useRef<HTMLDivElement>(null);
  const setOpen = (v: boolean) => setOpenState(v);
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  const register = React.useCallback((v: string, label: React.ReactNode) => {
    setLabels((prev) => (prev[v] === label ? prev : { ...prev, [v]: label }));
  }, []);

  React.useEffect(() => {
    if (!open) return;
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
  }, [open]);

  return (
    <div ref={wrapRef} className={cn("sl-pop-wrap", className)} {...props}>
      <Ctx.Provider value={{ open, setOpen, value: val, setValue, labels, register }}>
        {children}
      </Ctx.Provider>
    </div>
  );
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: React.ReactNode;
}
export function SelectTrigger({
  className,
  placeholder = "Select…",
  onClick,
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, value, labels } = useSelect();
  const label = value && labels[value] != null ? labels[value] : placeholder;
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
      <span data-select-label>{label}</span>
      <span className="chev">▾</span>
    </button>
  );
}

export function SelectContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSelect();
  return <div className={cn("sl-menu", open && "open", className)} {...props} />;
}

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export function SelectItem({
  value,
  className,
  children,
  onClick,
  ...props
}: SelectItemProps) {
  const { value: v, setValue, setOpen, register } = useSelect();
  React.useEffect(() => {
    register(value, children);
  }, [value, children, register]);
  return (
    <div
      className={cn("item", v === value && "active", className)}
      data-value={value}
      onClick={(e) => {
        onClick?.(e);
        setValue(value);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
