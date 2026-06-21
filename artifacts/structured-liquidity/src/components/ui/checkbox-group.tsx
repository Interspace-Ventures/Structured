import * as React from "react";
import { FormField, FormLabel, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxGroupOption {
  label: React.ReactNode;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** when provided, renders one checkbox per option; otherwise pass checkboxes as children */
  options?: CheckboxGroupOption[];
}

/** Structured Liquidity checkbox group — a labelled field wrapping a column of checkboxes. */
export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, description, options, children, ...props }, ref) => (
    <FormField ref={ref} {...props}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <div className="kit-col">
        {options
          ? options.map((o, i) => (
              <Checkbox
                key={o.value ?? i}
                checked={o.checked}
                defaultChecked={o.defaultChecked}
                disabled={o.disabled}
              >
                {o.label}
              </Checkbox>
            ))
          : children}
      </div>
      {description != null && <FormDescription>{description}</FormDescription>}
    </FormField>
  ),
);
CheckboxGroup.displayName = "CheckboxGroup";
