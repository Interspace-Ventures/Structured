import * as React from "react";
import { cn } from "@/lib/utils";

export interface AutocompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "onSelect"
  > {
  suggestions: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (value: string) => void;
}

/** Structured Liquidity autocomplete — combobox input with filtered listbox. */
export function Autocomplete({
  suggestions,
  value,
  defaultValue,
  onValueChange,
  onSelect,
  className,
  placeholder,
  onFocus,
  onBlur,
  ...props
}: AutocompleteProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };

  const q = val.toLowerCase();
  const filtered = q
    ? suggestions.filter((s) => s.toLowerCase().includes(q))
    : suggestions;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const choose = (s: string) => {
    setValue(s);
    onSelect?.(s);
    setOpen(false);
  };

  return (
    <div className="sl-pop-wrap" data-autocomplete ref={wrapRef}>
      <input
        className={cn("sl-input", className)}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        value={val}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={(e) => {
          setOpen(true);
          onFocus?.(e);
        }}
        {...props}
      />
      <div className={cn("sl-menu", open && "open")} role="listbox">
        {filtered.map((s) => (
          <div
            key={s}
            className="item"
            role="option"
            onMouseDown={(e) => {
              e.preventDefault();
              choose(s);
            }}
          >
            {s}
          </div>
        ))}
        <div
          className="item ac-empty"
          role="option"
          aria-disabled="true"
          style={filtered.length === 0 ? { display: "flex" } : undefined}
        >
          No matches
        </div>
      </div>
    </div>
  );
}
