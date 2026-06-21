import { Sparkles } from "lucide-react";
import {
  SectionHeader,
  SectionHeaderEyebrow,
  SectionHeaderRow,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
} from "@/components/ui/section-header";
import {
  ProfileHeader,
  ProfileAvatar,
  ProfileId,
  ProfileName,
  ProfileRole,
} from "@/components/ui/profile-header";
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
              By operators. For operators.
            </SectionHeaderSubtitle>
          </SectionHeader>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Profile header</span>
          <ProfileHeader>
            <ProfileAvatar>SL</ProfileAvatar>
            <ProfileId>
              <ProfileName>Hey, I'm Samir</ProfileName>
              <ProfileRole>I drive impact at startups</ProfileRole>
            </ProfileId>
          </ProfileHeader>
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
            <ScrollAreaRow>Track 01 · Aurora</ScrollAreaRow>
            <ScrollAreaRow>Track 02 · Meniscus</ScrollAreaRow>
            <ScrollAreaRow>Track 03 · Offset</ScrollAreaRow>
            <ScrollAreaRow>Track 04 · Specular</ScrollAreaRow>
            <ScrollAreaRow>Track 05 · Viscosity</ScrollAreaRow>
            <ScrollAreaRow>Track 06 · Containment</ScrollAreaRow>
            <ScrollAreaRow>Track 07 · Refraction</ScrollAreaRow>
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
              <SidebarLink href="#" active>
                Overview
              </SidebarLink>
              <SidebarLink href="#">Library</SidebarLink>
              <SidebarLink href="#">Tokens</SidebarLink>
              <SidebarHeading>Account</SidebarHeading>
              <SidebarLink href="#">Settings</SidebarLink>
            </SidebarNav>
            <SidebarMain>
              A structural rail: rigid border, glass fill, one accent for the
              active route.
            </SidebarMain>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
