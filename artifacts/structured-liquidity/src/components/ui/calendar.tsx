import * as React from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
}

/** Structured Liquidity calendar — rigid month grid, accent selected day. */
export function Calendar({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: CalendarProps) {
  const [internal, setInternal] = React.useState<Date | null>(defaultValue ?? null);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const [view, setView] = React.useState(() => {
    const base = (isControlled ? value : defaultValue) ?? new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const setSelected = (d: Date) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };

  const firstDow = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const prevMonthDays = new Date(view.year, view.month, 0).getDate();

  const cells: { day: number; muted: boolean; date?: Date }[] = [];
  for (let i = firstDow - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false, date: new Date(view.year, view.month, d) });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (firstDow + daysInMonth) + 1, muted: true });
  }

  const shift = (delta: number) =>
    setView((v) => {
      const m = v.month + delta;
      return {
        year: v.year + Math.floor(m / 12),
        month: ((m % 12) + 12) % 12,
      };
    });

  return (
    <div className={cn("sl-cal", className)} {...props}>
      <div className="sl-cal-head">
        <button type="button" aria-label="Previous" onClick={() => shift(-1)}>
          ‹
        </button>
        <span>
          {MONTHS[view.month]} {view.year}
        </span>
        <button type="button" aria-label="Next" onClick={() => shift(1)}>
          ›
        </button>
      </div>
      <div className="sl-cal-grid">
        {WEEKDAYS.map((d, i) => (
          <span key={`dow-${i}`} className="dow">
            {d}
          </span>
        ))}
        {cells.map((c, i) => {
          const isSel = !c.muted && c.date && selected && sameDay(c.date, selected);
          return (
            <span
              key={`day-${i}`}
              className={cn("day", c.muted && "muted", isSel && "sel")}
              onClick={() => {
                if (!c.muted && c.date) setSelected(c.date);
              }}
            >
              {c.day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
