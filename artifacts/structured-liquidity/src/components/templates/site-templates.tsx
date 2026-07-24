import * as React from "react";
import { FrameworkAttribution } from "@/components/ui/attribution";
import { SiteContent, SiteShell } from "@/components/ui/site-shell";

interface TemplateProps {
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

interface MarketingSiteTemplateProps extends TemplateProps {
  hero: React.ReactNode;
  proof?: React.ReactNode;
}

/** Landing template distilled from Interspace, 2 Days Early, and Bumble Bee. */
export function MarketingSiteTemplate({
  navigation,
  hero,
  proof,
  children,
  footer,
}: MarketingSiteTemplateProps) {
  return (
    <div className="sl-template sl-template-marketing">
      <SiteShell>{navigation}</SiteShell>
      <SiteContent>
        {hero}
        {proof}
        {children}
      </SiteContent>
      <SiteShell className="sl-template-footer">
        {footer ?? <FrameworkAttribution />}
      </SiteShell>
    </div>
  );
}

interface DashboardTemplateProps extends TemplateProps {
  metrics?: React.ReactNode;
  filters?: React.ReactNode;
}

/** Data-heavy template distilled from Interspace portfolio and index views. */
export function DashboardTemplate({
  navigation,
  metrics,
  filters,
  children,
  footer,
}: DashboardTemplateProps) {
  return (
    <div className="sl-template sl-template-dashboard">
      <SiteShell>{navigation}</SiteShell>
      <SiteContent>
        {metrics}
        {filters}
        <main>{children}</main>
      </SiteContent>
      <SiteShell className="sl-template-footer">
        {footer ?? <FrameworkAttribution />}
      </SiteShell>
    </div>
  );
}

interface GuidedFlowTemplateProps extends TemplateProps {
  steps: React.ReactNode;
}

/** Multi-step conversion template distilled from Bumble Bee enrollment. */
export function GuidedFlowTemplate({
  navigation,
  steps,
  children,
  footer,
}: GuidedFlowTemplateProps) {
  return (
    <div className="sl-template sl-template-guided">
      <SiteShell>{navigation}</SiteShell>
      <SiteContent>
        <aside>{steps}</aside>
        <main>{children}</main>
      </SiteContent>
      <SiteShell className="sl-template-footer">
        {footer ?? <FrameworkAttribution />}
      </SiteShell>
    </div>
  );
}

interface ImmersiveAppTemplateProps extends TemplateProps {
  hud?: React.ReactNode;
  controls?: React.ReactNode;
}

/** Full-viewport app template distilled from Cosmograph and Universe. */
export function ImmersiveAppTemplate({
  navigation,
  hud,
  controls,
  children,
  footer,
}: ImmersiveAppTemplateProps) {
  return (
    <div className="sl-template sl-template-immersive">
      <SiteShell>{navigation}</SiteShell>
      <main>
        {children}
        {hud}
        {controls}
      </main>
      <SiteShell className="sl-template-footer">
        {footer ?? <FrameworkAttribution />}
      </SiteShell>
    </div>
  );
}

