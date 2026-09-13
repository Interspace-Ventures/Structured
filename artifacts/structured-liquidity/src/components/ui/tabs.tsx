import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
}
const Ctx = React.createContext<TabsCtx | null>(null);
const useTabs = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Tabs subcomponents must be used within <Tabs>");
  return c;
};

export interface TabsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Structured Liquidity tabs — segmented tablist, accent active tab. */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <div className={cn("sl-tabs", className)} {...props}>
      <Ctx.Provider value={{ value: val, setValue }}>{children}</Ctx.Provider>
    </div>
  );
}

export function TabsList({
  className,
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { value } = useTabs();
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabsTriggerProps> =>
      React.isValidElement<TabsTriggerProps>(child) &&
      typeof child.props.value === "string",
  );
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.props.value === value),
  );
  return (
    <div
      role="tablist"
      className={cn("tablist", "is-liquid", className)}
      style={
        {
          ...style,
          "--tab-index": selectedIndex,
          "--tab-count": Math.max(1, items.length),
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="sl-tab-marker" aria-hidden="true" />
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export function TabsTrigger({
  value,
  className,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { value: v, setValue } = useTabs();
  return (
    <button
      type="button"
      role="tab"
      aria-selected={v === value}
      className={className}
      onClick={(event) => {
        setValue(value);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: v } = useTabs();
  if (v !== value) return null;
  return (
    <div
      role="tabpanel"
      className={cn("panel", "show", className)}
      {...props}
    />
  );
}
