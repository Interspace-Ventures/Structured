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
  style,
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

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<ToggleGroupItemProps> =>
      React.isValidElement<ToggleGroupItemProps>(child) &&
      typeof child.props.value === "string",
  );
  const selectedIndex =
    type === "single"
      ? items.findIndex((item) => item.props.value === val)
      : -1;
  const liquid = type === "single" && selectedIndex >= 0 && items.length > 0;

  return (
    <div
      className={cn("sl-toggle-group", liquid && "is-liquid", className)}
      data-toggle-group
      style={
        {
          ...style,
          "--toggle-index": selectedIndex,
          "--toggle-count": Math.max(1, items.length),
        } as React.CSSProperties
      }
      {...props}
    >
      {liquid ? <span className="sl-toggle-marker" aria-hidden="true" /> : null}
      <Ctx.Provider value={{ type, value: val, toggle }}>
        {children}
      </Ctx.Provider>
    </div>
  );
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export function ToggleGroupItem({
  value,
  className,
  onClick,
  ...props
}: ToggleGroupItemProps) {
  const { type, value: val, toggle } = useTG();
  const pressed =
    type === "single"
      ? val === value
      : ((val as string[]) ?? []).includes(value);
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={className}
      onClick={(event) => {
        toggle(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
