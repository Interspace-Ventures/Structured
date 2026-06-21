import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

/** Structured Liquidity OTP — segmented single-character cells. */
export function InputOTP({
  length = 6,
  value,
  defaultValue,
  disabled,
  onValueChange,
  className,
  ...props
}: InputOTPProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const val = isControlled ? value : internal;
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const setValue = (v: string) => {
    const next = v.slice(0, length);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const chars = Array.from({ length }, (_, i) => val[i] ?? "");

  const setCharAt = (i: number, c: string) => {
    const arr = chars.slice();
    arr[i] = c;
    setValue(arr.join(""));
  };

  const focusAt = (i: number) => {
    const el = refs.current[i];
    if (el) el.focus();
  };

  const onChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      setCharAt(i, "");
      return;
    }
    const c = raw.slice(-1);
    setCharAt(i, c);
    if (i < length - 1) focusAt(i + 1);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) {
      e.preventDefault();
      setCharAt(i - 1, "");
      focusAt(i - 1);
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      focusAt(i + 1);
    }
  };

  const onPaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\s/g, "");
    if (!text) return;
    const arr = chars.slice();
    for (let j = 0; j < text.length && i + j < length; j++) arr[i + j] = text[j];
    setValue(arr.join(""));
    focusAt(Math.min(i + text.length, length - 1));
  };

  return (
    <div className={cn("sl-otp", className)} {...props}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          maxLength={1}
          value={c}
          placeholder="•"
          disabled={disabled}
          inputMode="numeric"
          onChange={(e) => onChange(i, e)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={(e) => onPaste(i, e)}
        />
      ))}
    </div>
  );
}
