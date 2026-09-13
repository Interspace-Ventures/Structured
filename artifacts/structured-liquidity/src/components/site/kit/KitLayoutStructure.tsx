import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  SectionHeader,
  SectionHeaderEyebrow,
  SectionHeaderRow,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
} from "@/components/ui/section-header";
import { ProfileCard } from "@/components/ui/profile-card";
import { Keycaps, Keycap } from "@/components/ui/keycap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Resizable, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea, ScrollAreaRow } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarNav,
  SidebarHeading,
  SidebarLink,
  SidebarMain,
} from "@/components/ui/sidebar";

export function KitLayoutStructure() {
  const [sidebarView, setSidebarView] = useState("Overview");
  const sidebarLinks = ["Overview", "Library", "Tokens", "Settings"];

  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Layout &amp; structure</span>
        <span className="kg-rule"></span>
        <span className="kg-count">
          Aspect ratio · Keycap · Profile · Resizable · Scroll area · Section
          header · Separator · Sidebar
        </span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w6">
          <span className="kit-cap">Section header</span>
          <SectionHeader>
            <SectionHeaderEyebrow>Section 02</SectionHeaderEyebrow>
            <SectionHeaderRow>
              <Sparkles />
              <SectionHeaderTitle>Purpose</SectionHeaderTitle>
            </SectionHeaderRow>
            <SectionHeaderSubtitle>
              Signals, ordered for the mission.
            </SectionHeaderSubtitle>
          </SectionHeader>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Profile card</span>
          <ProfileCard
            label="Profile pattern"
            status="Building"
            initials="KS"
            summary="Deep-space survey station mapping a newly observed planetary system."
            facts={[
              { label: "Mission", value: "Orbital survey" },
              { label: "Sector", value: "Kepler-186" },
              { label: "Status", value: "Nominal" },
            ]}
          />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Keycap tiles</span>
          <Keycaps>
            <Keycap on>L</Keycap>
            <Keycap>I</Keycap>
            <Keycap on>Q</Keycap>
            <Keycap>U</Keycap>
            <Keycap on>I</Keycap>
            <Keycap>D</Keycap>
          </Keycaps>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Aspect ratio</span>
          <AspectRatio>16 / 9</AspectRatio>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Resizable</span>
          <Resizable>
            <ResizablePanel pane="a">Drag the corner →</ResizablePanel>
            <ResizablePanel pane="b">Liquid fills the rest</ResizablePanel>
          </Resizable>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Scroll area</span>
          <ScrollArea>
            <ScrollAreaRow>Orbit 01 · Periapsis</ScrollAreaRow>
            <ScrollAreaRow>Orbit 02 · Transit</ScrollAreaRow>
            <ScrollAreaRow>Orbit 03 · Eclipse</ScrollAreaRow>
            <ScrollAreaRow>Orbit 04 · Relay</ScrollAreaRow>
            <ScrollAreaRow>Orbit 05 · Survey</ScrollAreaRow>
            <ScrollAreaRow>Orbit 06 · Return</ScrollAreaRow>
            <ScrollAreaRow>Orbit 07 · Archive</ScrollAreaRow>
          </ScrollArea>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Separator</span>
          <div className="kit-row" style={{ gap: 0 }}>
            <span className="mono" style={{ fontSize: "0.8rem" }}>
              Docs
            </span>
            <Separator orientation="vertical" />
            <span className="mono" style={{ fontSize: "0.8rem" }}>
              API
            </span>
            <Separator orientation="vertical" />
            <span className="mono" style={{ fontSize: "0.8rem" }}>
              Tokens
            </span>
          </div>
          <Separator />
          <p
            className="mono"
            style={{
              fontSize: "0.76rem",
              color: "var(--ink-dim)",
              margin: 0,
            }}
          >
            A hairline at full border weight, horizontal or vertical.
          </p>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Sidebar</span>
          <Sidebar>
            <SidebarNav>
              <SidebarHeading>Workspace</SidebarHeading>
              {sidebarLinks.slice(0, 3).map((label) => (
                <SidebarLink
                  href="#"
                  active={sidebarView === label}
                  onClick={() => setSidebarView(label)}
                  key={label}
                >
                  {label}
                </SidebarLink>
              ))}
              <SidebarHeading>Account</SidebarHeading>
              <SidebarLink
                href="#"
                active={sidebarView === "Settings"}
                onClick={() => setSidebarView("Settings")}
              >
                Settings
              </SidebarLink>
            </SidebarNav>
            <SidebarMain>
              <strong>{sidebarView}</strong>
              <span>
                The active view changes in place. No link leaves this specimen.
              </span>
            </SidebarMain>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
