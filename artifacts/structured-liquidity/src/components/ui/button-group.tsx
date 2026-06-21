import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface BtnGroupCtx {
  value: string;
  setValue: (v: string) => void;
}
const Ctx = React.createContext<BtnGroupCtx | null>(null);

/** Structured Liquidity button group — segmented buttons, accent-active. */
export function ButtonGroup({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <div className={cn("sl-btn-group", className)} {...props}>
      <Ctx.Provider value={{ value: val, setValue }}>{children}</Ctx.Provider>
    </div>
  );
}

export interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}
export function ButtonGroupItem({
  value,
  className,
  onClick,
  children,
  ...props
}: ButtonGroupItemProps) {
  const ctx = React.useContext(Ctx);
  const on = ctx && value !== undefined ? ctx.value === value : undefined;
  return (
    <button
      type="button"
      className={cn(on && "on", className)}
      onClick={(e) => {
        onClick?.(e);
        if (ctx && value !== undefined) ctx.setValue(value);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
