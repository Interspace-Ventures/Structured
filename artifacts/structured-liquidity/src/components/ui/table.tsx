import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity table — rigid frame, mono headers, glass hover rows. */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** extra class on the .sl-table-wrap container */
  wrapClassName?: string;
}
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapClassName, children, ...props }, ref) => (
    <div className={cn("sl-table-wrap", wrapClassName)}>
      <table ref={ref} className={cn("sl-table", className)} {...props}>
        {children}
      </table>
    </div>
  ),
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={className} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={className} {...props} />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={className} {...props} />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={className} {...props} />
));
TableCell.displayName = "TableCell";
