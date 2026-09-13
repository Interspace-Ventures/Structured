import { Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ActivityContent,
  ActivityDescription,
  ActivityFeed,
  ActivityHeader,
  ActivityItem,
  ActivityMarker,
  ActivityMeta,
  ActivityTitle,
} from "@/components/ui/activity-feed";
import {
  DetailPanel,
  DetailPanelBody,
  DetailPanelEyebrow,
  DetailPanelFooter,
  DetailPanelHeader,
  DetailPanelTitle,
} from "@/components/ui/detail-panel";
import { FrameworkAttribution } from "@/components/ui/attribution";
import {
  FilterGroup,
  FilterSummary,
  FilterToolbar,
} from "@/components/ui/filter-toolbar";
import { Omnibar, OmnibarAttachment } from "@/components/ui/omnibar";
import {
  LogoGrid,
  LogoLabel,
  LogoMark,
  LogoTile,
} from "@/components/ui/logo-grid";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneIcon,
  DropzoneInput,
  DropzoneMeta,
  DropzoneTitle,
} from "@/components/ui/dropzone";
import {
  PricingAmount,
  PricingCadence,
  PricingCard,
  PricingDescription,
  PricingFeature,
  PricingFeatures,
  PricingFooter,
  PricingHeader,
  PricingName,
  PricingPrice,
} from "@/components/ui/pricing-card";
import { SiteContent, SiteShell } from "@/components/ui/site-shell";
import { UnitEconomicsChart } from "@/components/ui/unit-economics-chart";
import { Step, Stepper } from "@/components/ui/stepper";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import {
  TestimonialAuthor,
  TestimonialCard,
  TestimonialMeta,
  TestimonialQuote,
  TestimonialSource,
} from "@/components/ui/testimonial-card";

export function KitPatterns() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Production patterns</span>
        <span className="kg-rule" />
        <span className="kg-count">
          Shell · Activity · Upload · Pricing · Economics · Timeline · Filters ·
          Detail panel · Proof
        </span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w12">
          <span className="kit-cap">Site shell</span>
          <div className="sl-shell-demo">
            <SiteShell>
              Navigation and footer use the shared site frame
            </SiteShell>
            <SiteContent>Body surface aligns to the same frame</SiteContent>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Framework attribution</span>
          <FrameworkAttribution />
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Timeline</span>
          <Timeline>
            <TimelineItem date="2019" title="Started">
              A date rail leaves the story room to breathe.
            </TimelineItem>
            <TimelineItem date="Now" title="Building">
              Useful for biographies, changelogs, and product histories.
            </TimelineItem>
          </Timeline>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Stepper</span>
          <Stepper>
            <Step
              step={1}
              label="Profile"
              detail="Complete"
              status="complete"
            />
            <Step
              step={2}
              label="Preferences"
              detail="In progress"
              status="current"
            />
            <Step step={3} label="Review" detail="Next" />
          </Stepper>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Filter toolbar</span>
          <FilterToolbar>
            <FilterGroup>
              <Button size="sm" variant="outline">
                Spectral
              </Button>
              <Button size="sm" variant="outline">
                Kepler-186
              </Button>
            </FilterGroup>
            <FilterSummary>26 results</FilterSummary>
          </FilterToolbar>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Omnibar</span>
          <Omnibar
            status="Ready"
            onSubmit={(event) => event.preventDefault()}
            placeholder="Paste a link, attach a file, or ask anything"
          >
            <OmnibarAttachment>brief.pdf</OmnibarAttachment>
          </Omnibar>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Detail panel</span>
          <DetailPanel>
            <DetailPanelHeader>
              <span>
                <DetailPanelEyebrow>Selected object</DetailPanelEyebrow>
                <DetailPanelTitle>Research signal</DetailPanelTitle>
              </span>
              <span className="sl-badge default">Live</span>
            </DetailPanelHeader>
            <DetailPanelBody>
              A rigid inspection surface for metadata, previews, and
              context-aware actions.
            </DetailPanelBody>
            <DetailPanelFooter>
              <Button size="sm">Open source</Button>
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
            </DetailPanelFooter>
          </DetailPanel>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Testimonial card</span>
          <TestimonialCard>
            <TestimonialSource>Verified family review</TestimonialSource>
            <TestimonialQuote>
              “The transit log made a complex orbital shift immediately clear to
              every crew on the station.”
            </TestimonialQuote>
            <TestimonialAuthor>
              Mission review <TestimonialMeta>Flight archive</TestimonialMeta>
            </TestimonialAuthor>
          </TestimonialCard>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Logo grid</span>
          <LogoGrid>
            {[
              ["KS", "Station"],
              ["AT", "Atlas"],
              ["SR", "Survey"],
              ["RL", "Relay"],
            ].map(([mark, label]) => (
              <LogoTile key={mark}>
                <LogoMark>{mark}</LogoMark>
                <LogoLabel>{label}</LogoLabel>
              </LogoTile>
            ))}
          </LogoGrid>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Activity feed</span>
          <ActivityFeed>
            <ActivityItem>
              <ActivityMarker>01</ActivityMarker>
              <ActivityContent>
                <ActivityHeader>
                  <ActivityTitle>Transit report published</ActivityTitle>
                  <ActivityMeta>Today · 09:42</ActivityMeta>
                </ActivityHeader>
                <ActivityDescription>
                  Orbital notes and instrument readings are ready for review.
                </ActivityDescription>
              </ActivityContent>
            </ActivityItem>
            <ActivityItem>
              <ActivityMarker>02</ActivityMarker>
              <ActivityContent>
                <ActivityHeader>
                  <ActivityTitle>Research signal added</ActivityTitle>
                  <ActivityMeta>Yesterday</ActivityMeta>
                </ActivityHeader>
                <ActivityDescription>
                  A source-backed signal joined the evidence workspace.
                </ActivityDescription>
              </ActivityContent>
            </ActivityItem>
          </ActivityFeed>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Dropzone</span>
          <Dropzone>
            <DropzoneInput accept="image/*,.pdf" />
            <DropzoneIcon>
              <Upload />
            </DropzoneIcon>
            <DropzoneTitle>Drop a file or choose one</DropzoneTitle>
            <DropzoneDescription>
              Attach evidence, artwork, or a source document.
            </DropzoneDescription>
            <DropzoneMeta>PDF, PNG, JPG · 20 MB max</DropzoneMeta>
          </Dropzone>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Pricing card</span>
          <PricingCard featured>
            <PricingHeader>
              <PricingName>Expedition</PricingName>
              <span className="sl-badge default">Recommended</span>
            </PricingHeader>
            <PricingPrice>
              <PricingAmount>$49</PricingAmount>
              <PricingCadence>/ month</PricingCadence>
            </PricingPrice>
            <PricingDescription>
              A clear package for teams moving from prototype to production.
            </PricingDescription>
            <PricingFeatures>
              <PricingFeature>
                <Check />
                Full component registry
              </PricingFeature>
              <PricingFeature>
                <Check />
                Agent installation bundle
              </PricingFeature>
              <PricingFeature>
                <Check />
                Production patterns
              </PricingFeature>
            </PricingFeatures>
            <PricingFooter>
              <Button size="sm">Choose Expedition</Button>
            </PricingFooter>
          </PricingCard>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Unit economics chart</span>
          <UnitEconomicsChart
            totalLabel="Monthly mission allocation"
            totalValue="$3.99"
            allocations={[
              {
                label: "Telemetry",
                value: "$0.50",
                share: 12.5,
                description: "Transmission, parsing, and signal storage.",
              },
              {
                label: "Navigation",
                value: "$0.75",
                share: 18.75,
                description: "Orbital models, routing, and shared compute.",
              },
              {
                label: "Analysis",
                value: "$0.25",
                share: 6.25,
                description: "Anomaly detection and reliability headroom.",
              },
              {
                label: "Science + crew",
                value: "$2.50",
                share: 62.5,
                description: "Research time, safety, operations, and reserve.",
              },
            ]}
            note="Quarter-rounded allocations make the model legible without implying every month costs exactly the same."
          />
        </div>
      </div>
    </div>
  );
}
