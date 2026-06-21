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
import {
  FontPairings,
  FontPair,
  FontPairTitle,
  FontPairFonts,
  FontSpecimen,
  FontRole,
  FontName,
  FontPairNote,
} from "@/components/ui/fonts";
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
          Carousel · Chart · Collapsible · Empty · Fonts · Item · Typography
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
            <EmptyIcon>♪</EmptyIcon>
            <EmptyTitle>No tracks yet</EmptyTitle>
            <EmptyDescription>Import audio to start a library.</EmptyDescription>
            <Button size="sm">Import</Button>
          </Empty>
        </div>

        <div className="glass kit-cell w6 pairings-card">
          <span className="kit-cap">Fonts</span>
          <FontPairings>
            <FontPair>
              <FontPairTitle>Set 01 · Canonical</FontPairTitle>
              <FontPairFonts>
                <FontSpecimen role="header">
                  <FontRole>Header</FontRole>
                  <FontName className="ff-archivo">Archivo</FontName>
                </FontSpecimen>
                <FontSpecimen role="body">
                  <FontRole>Body</FontRole>
                  <FontName className="ff-outfit">Outfit</FontName>
                </FontSpecimen>
                <FontSpecimen role="detail">
                  <FontRole>Detail</FontRole>
                  <FontName className="ff-spacemono">Space Mono</FontName>
                </FontSpecimen>
              </FontPairFonts>
              <FontPairNote>
                Confident grotesque header, warm body, technical mono: the
                default.
              </FontPairNote>
            </FontPair>
            <FontPair>
              <FontPairTitle>Set 02 · Editorial</FontPairTitle>
              <FontPairFonts>
                <FontSpecimen role="header">
                  <FontRole>Header</FontRole>
                  <FontName className="ff-syne">Syne</FontName>
                </FontSpecimen>
                <FontSpecimen role="body">
                  <FontRole>Body</FontRole>
                  <FontName className="ff-inter">Inter</FontName>
                </FontSpecimen>
                <FontSpecimen role="detail">
                  <FontRole>Detail</FontRole>
                  <FontName className="ff-ibmplexmono">IBM Plex Mono</FontName>
                </FontSpecimen>
              </FontPairFonts>
              <FontPairNote>
                Expressive display over a neutral workhorse: marketing and brand
                surfaces.
              </FontPairNote>
            </FontPair>
            <FontPair>
              <FontPairTitle>Set 03 · Modern</FontPairTitle>
              <FontPairFonts>
                <FontSpecimen role="header">
                  <FontRole>Header</FontRole>
                  <FontName className="ff-bricolage">Bricolage Grotesque</FontName>
                </FontSpecimen>
                <FontSpecimen role="body">
                  <FontRole>Body</FontRole>
                  <FontName className="ff-jakarta">Plus Jakarta Sans</FontName>
                </FontSpecimen>
                <FontSpecimen role="detail">
                  <FontRole>Detail</FontRole>
                  <FontName className="ff-jetbrainsmono">JetBrains Mono</FontName>
                </FontSpecimen>
              </FontPairFonts>
              <FontPairNote>
                Quirky contemporary grotesque with a clean body and developer
                mono.
              </FontPairNote>
            </FontPair>
          </FontPairings>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Item</span>
          <div className="kit-col" style={{ gap: "0.6rem" }}>
            <Item>
              <span className="sl-ava">U</span>
              <ItemBody>
                <ItemTitle>universe.audio</ItemTitle>
                <ItemSubtitle>Audio platform · Live</ItemSubtitle>
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
                <ItemTitle>Structured Liquidity</ItemTitle>
                <ItemSubtitle>Design language</ItemSubtitle>
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
              Heavy grotesk for impact, monospace for labels, and a measured
              body that stays legible through the glass. Inline{" "}
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
