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

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={cn("tablist", className)} {...props} />;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const { value: v, setValue } = useTabs();
  return (
    <button
      type="button"
      role="tab"
      aria-selected={v === value}
      className={className}
      onClick={() => setValue(value)}
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
  return <div role="tabpanel" className={cn("panel", "show", className)} {...props} />;
}
