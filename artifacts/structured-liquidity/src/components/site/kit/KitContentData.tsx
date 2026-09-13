import { Button } from "@/components/ui/button";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";
import { Chart } from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Item, ItemBody, ItemTitle, ItemSubtitle } from "@/components/ui/item";
import {
  Typography,
  TypographyTitle,
  TypographyParagraph,
  TypographyCode,
  TypographyQuote,
} from "@/components/ui/typography";

export function KitContentData() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Content &amp; data</span>
        <span className="kg-rule"></span>
        <span className="kg-count">
          Carousel · Chart · Collapsible · Empty · Item · Typography
        </span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w6">
          <span className="kit-cap">Carousel</span>
          <Carousel>
            <CarouselSlide>01</CarouselSlide>
            <CarouselSlide>02</CarouselSlide>
            <CarouselSlide>03</CarouselSlide>
            <CarouselSlide>04</CarouselSlide>
          </Carousel>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Chart</span>
          <Chart data={[38, 62, 48, 80, 55, 92, 70, 44, 66, 30]} />
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Collapsible</span>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Theme tokens</CollapsibleTrigger>
            <CollapsibleContent>
              Accent, blur, border weight, corner radius, and flat-shadow
              offset: every knob behind the language.
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Empty</span>
          <Empty>
            <EmptyIcon>✦</EmptyIcon>
            <EmptyTitle>No signals yet</EmptyTitle>
            <EmptyDescription>
              Connect an instrument to begin the survey.
            </EmptyDescription>
            <Button size="sm">Connect</Button>
          </Empty>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Item</span>
          <div className="kit-col" style={{ gap: "0.6rem" }}>
            <Item>
              <span className="sl-ava">U</span>
              <ItemBody>
                <ItemTitle>Kepler Station</ItemTitle>
                <ItemSubtitle>Orbital survey · Live</ItemSubtitle>
              </ItemBody>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </Item>
            <Item>
              <span
                className="sl-ava"
                style={{
                  background: "rgba(var(--glass-tint),0.1)",
                  color: "var(--ink)",
                }}
              >
                SL
              </span>
              <ItemBody>
                <ItemTitle>Asteria Atlas</ItemTitle>
                <ItemSubtitle>Survey catalogue</ItemSubtitle>
              </ItemBody>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </Item>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Typography</span>
          <Typography>
            <TypographyTitle>Structure holds it.</TypographyTitle>
            <TypographyParagraph>
              Calibrated grotesk hierarchy, monospace evidence labels, and a
              measured body that stays legible through every layer. Inline{" "}
              <TypographyCode>--accent</TypographyCode> tokens carry the system.
            </TypographyParagraph>
            <TypographyQuote>
              Liquidity is for depth, never at the expense of clarity.
            </TypographyQuote>
          </Typography>
        </div>
      </div>
    </div>
  );
}
