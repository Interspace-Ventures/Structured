import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Stepper = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("sl-stepper", className)} {...props} />
  ),
);
Stepper.displayName = "Stepper";

export interface StepProps extends React.LiHTMLAttributes<HTMLLIElement> {
  label: React.ReactNode;
  detail?: React.ReactNode;
  status?: "complete" | "current" | "upcoming";
  step: number;
}

export function Step({
  label,
  detail,
  status = "upcoming",
  step,
  className,
  ...props
}: StepProps) {
  return (
    <li
      className={cn("sl-step", className)}
      data-status={status}
      aria-current={status === "current" ? "step" : undefined}
      {...props}
    >
      <span className="sl-step-marker" aria-hidden="true">
        {status === "complete" ? <Check /> : step}
      </span>
      <span className="sl-step-copy">
        <strong>{label}</strong>
        {detail ? <span>{detail}</span> : null}
      </span>
    </li>
  );
}

