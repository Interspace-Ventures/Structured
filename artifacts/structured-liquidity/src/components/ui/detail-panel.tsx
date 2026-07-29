import * as React from "react";
import { cn } from "@/lib/utils";

/** Edge-ready inspection surface distilled from Cosmograph and Dropship. */
export const DetailPanel = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside ref={ref} className={cn("sl-detail-panel", className)} {...props} />
));
DetailPanel.displayName = "DetailPanel";

export const DetailPanelHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sl-detail-panel-header", className)} {...props} />
));
DetailPanelHeader.displayName = "DetailPanelHeader";

export const DetailPanelEyebrow = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("sl-detail-panel-eyebrow", className)} {...props} />
));
DetailPanelEyebrow.displayName = "DetailPanelEyebrow";

export const DetailPanelTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("sl-detail-panel-title", className)} {...props} />
));
DetailPanelTitle.displayName = "DetailPanelTitle";

export const DetailPanelBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sl-detail-panel-body", className)} {...props} />
));
DetailPanelBody.displayName = "DetailPanelBody";

export const DetailPanelFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sl-detail-panel-footer", className)} {...props} />
));
DetailPanelFooter.displayName = "DetailPanelFooter";
