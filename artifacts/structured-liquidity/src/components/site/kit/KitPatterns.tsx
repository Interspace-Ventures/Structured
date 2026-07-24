import { Button } from "@/components/ui/button";
import { FrameworkAttribution } from "@/components/ui/attribution";
import { FilterGroup, FilterSummary, FilterToolbar } from "@/components/ui/filter-toolbar";
import { SiteContent, SiteShell } from "@/components/ui/site-shell";
import { Step, Stepper } from "@/components/ui/stepper";
import { Timeline, TimelineItem } from "@/components/ui/timeline";

export function KitPatterns() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Production patterns</span>
        <span className="kg-rule" />
        <span className="kg-count">Shell · Attribution · Timeline · Stepper · Filters</span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w12">
          <span className="kit-cap">Site shell</span>
          <div className="sl-shell-demo">
            <SiteShell>Navigation and footer share this wider frame</SiteShell>
            <SiteContent>Page content stays deliberately narrower</SiteContent>
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
            <Step step={1} label="Profile" detail="Complete" status="complete" />
            <Step step={2} label="Preferences" detail="In progress" status="current" />
            <Step step={3} label="Review" detail="Next" />
          </Stepper>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Filter toolbar</span>
          <FilterToolbar>
            <FilterGroup>
              <Button size="sm" variant="outline">Fintech</Button>
              <Button size="sm" variant="outline">New York</Button>
            </FilterGroup>
            <FilterSummary>26 results</FilterSummary>
          </FilterToolbar>
        </div>
      </div>
    </div>
  );
}
