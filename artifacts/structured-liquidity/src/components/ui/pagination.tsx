import * as React from "react";
import { cn } from "@/lib/utils";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** total number of pages */
  count?: number;
  /** controlled current page (1-indexed) */
  page?: number;
  /** uncontrolled initial page (1-indexed) */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
}

/** Structured Liquidity pagination — rigid numbered buttons, accent current. */
export function Pagination({
  count = 4,
  page,
  defaultPage,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const [internal, setInternal] = React.useState(defaultPage ?? 1);
  const isControlled = page !== undefined;
  const cur = isControlled ? page : internal;

  const go = (p: number) => {
    if (p < 1 || p > count || p === cur) return;
    if (!isControlled) setInternal(p);
    onPageChange?.(p);
  };

  return (
    <div className={cn("sl-page", className)} {...props}>
      <button
        type="button"
        disabled={cur <= 1}
        aria-label="Previous"
        onClick={() => go(cur - 1)}
      >
        ‹
      </button>
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          data-page
          aria-current={n === cur ? "page" : undefined}
          className={cn(n === cur && "cur")}
          onClick={() => go(n)}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={cur >= count}
        aria-label="Next"
        onClick={() => go(cur + 1)}
      >
        ›
      </button>
    </div>
  );
}
