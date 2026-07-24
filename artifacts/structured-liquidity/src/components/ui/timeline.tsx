import * as React from "react";
import { cn } from "@/lib/utils";

export const Timeline = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("sl-timeline", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  date?: React.ReactNode;
  title?: React.ReactNode;
}

export function TimelineItem({ date, title, children, className, ...props }: TimelineItemProps) {
  return (
    <li className={cn("sl-timeline-item", className)} {...props}>
      <span className="sl-timeline-marker" aria-hidden="true" />
      <div className="sl-timeline-copy">
        {date ? <span className="sl-timeline-date">{date}</span> : null}
        {title ? <h3 className="sl-timeline-title">{title}</h3> : null}
        {children ? <div className="sl-timeline-body">{children}</div> : null}
      </div>
    </li>
  );
}
