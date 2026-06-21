import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioCtx {
  value: string;
  setValue: (v: string) => void;
}
const Ctx = React.createContext<RadioCtx | null>(null);
const useRadio = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("RadioGroupItem must be used within <RadioGroup>");
  return c;
};

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Structured Liquidity radio group — circular wells, accent dot on select. */
export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <div role="radiogroup" data-radio-group className={cn("kit-col", className)} {...props}>
      <Ctx.Provider value={{ value: val, setValue }}>{children}</Ctx.Provider>
    </div>
  );
}

export interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function RadioGroupItem({ value, className, children, ...props }: RadioGroupItemProps) {
  const { value: v, setValue } = useRadio();
  const checked = v === value;
  return (
    <div
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      className={cn("sl-radio-item", className)}
      onClick={() => setValue(value)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setValue(value);
        }
      }}
      {...props}
    >
      <span className="sl-radio">
        <span className="dot" />
      </span>
      {children}
    </div>
  );
}
