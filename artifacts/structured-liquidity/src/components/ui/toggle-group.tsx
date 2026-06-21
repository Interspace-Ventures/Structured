import * as React from "react";
import { cn } from "@/lib/utils";

interface TGCtx {
  type: "single" | "multiple";
  value: string | string[];
  toggle: (v: string) => void;
}
const Ctx = React.createContext<TGCtx | null>(null);
const useTG = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("ToggleGroupItem must be used within <ToggleGroup>");
  return c;
};

type SingleProps = {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
type MultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};
export type ToggleGroupProps = (SingleProps | MultipleProps) &
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;

/** Structured Liquidity toggle group — segmented rigid frame, one accent fill. */
export function ToggleGroup({
  type = "single",
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const [internal, setInternal] = React.useState<string | string[]>(
    defaultValue ?? (type === "single" ? "" : []),
  );
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;

  const toggle = (v: string) => {
    let next: string | string[];
    if (type === "single") {
      next = val === v ? "" : v;
    } else {
      const arr = (val as string[]) ?? [];
      next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    }
    if (!isControlled) setInternal(next);
    (onValueChange as (value: string | string[]) => void)?.(next);
  };

  return (
    <div className={cn("sl-toggle-group", className)} data-toggle-group {...props}>
      <Ctx.Provider value={{ type, value: val, toggle }}>{children}</Ctx.Provider>
    </div>
  );
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export function ToggleGroupItem({ value, className, ...props }: ToggleGroupItemProps) {
  const { type, value: val, toggle } = useTG();
  const pressed =
    type === "single" ? val === value : ((val as string[]) ?? []).includes(value);
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={className}
      onClick={() => toggle(value)}
      {...props}
    />
  );
}
