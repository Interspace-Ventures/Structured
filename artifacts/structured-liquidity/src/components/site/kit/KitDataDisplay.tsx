import {
  Info,
  TriangleAlert,
  Library,
  Radio,
  Shuffle,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  StatStrip,
  Stat,
  StatCards,
  StatCard,
  StatNumber,
  StatCaption,
} from "@/components/ui/stat";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import { HoverCard } from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardMedia,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Meter } from "@/components/ui/meter";

export function KitDataDisplay() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Data display</span>
        <span className="kg-rule"></span>
        <span className="kg-count">
          Alert · Avatar · Calendar · Card · Media player · Stat · Table ·
          Waveform
        </span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w8">
          <span className="kit-cap">Stat · metric display</span>
          <StatStrip>
            <Stat>
              <StatNumber>100+</StatNumber>
              <StatCaption>Languages</StatCaption>
            </Stat>
            <Stat>
              <StatNumber>1M+</StatNumber>
              <StatCaption>Songs</StatCaption>
            </Stat>
            <Stat>
              <StatNumber>2.7K</StatNumber>
              <StatCaption>Words translated</StatCaption>
            </Stat>
          </StatStrip>
          <StatCards>
            <StatCard>
              <StatNumber accent>200+</StatNumber>
              <StatCaption>Operators in syndicate</StatCaption>
            </StatCard>
            <StatCard>
              <StatNumber accent>60%</StatNumber>
              <StatCaption>Scaled 0–100 FTEs</StatCaption>
            </StatCard>
          </StatCards>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Alert</span>
          <div className="kit-col">
            <Alert>
              <Info className="ai" />
              <div>
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>Tokens sync every deploy.</AlertDescription>
              </div>
            </Alert>
            <Alert variant="destructive">
              <TriangleAlert className="ai" />
              <div>
                <AlertTitle>Build failed</AlertTitle>
                <AlertDescription>Border weight must be ≥ 1px.</AlertDescription>
              </div>
            </Alert>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Avatar</span>
          <div className="kit-row">
            <Avatar>SL</Avatar>
            <Avatar style={{ background: "rgba(var(--glass-tint),0.1)", color: "var(--ink)" }}>
              JD
            </Avatar>
            <AvatarGroup>
              <Avatar>A</Avatar>
              <Avatar style={{ background: "#ffffff", color: "#111111" }}>B</Avatar>
              <Avatar style={{ background: "#8a8a93", color: "#ffffff" }}>C</Avatar>
              <Avatar style={{ background: "#111111", color: "#ffffff" }}>+5</Avatar>
            </AvatarGroup>
          </div>
          <span className="kit-cap" style={{ marginTop: "0.4rem" }}>
            Tooltip · hover card
          </span>
          <div className="kit-row">
            <Tooltip content="Flat offset shadow">
              <Button variant="outline" size="sm">
                Hover me
              </Button>
            </Tooltip>
            <HoverCard
              content={
                <div className="kit-row" style={{ gap: "0.6rem" }}>
                  <Avatar>U</Avatar>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                      universe.audio
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "0.7rem", color: "var(--ink-dim)" }}
                    >
                      Built on SL
                    </div>
                  </div>
                </div>
              }
            >
              <Button variant="ghost" size="sm">
                @universe
              </Button>
            </HoverCard>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Calendar / date picker</span>
          <Calendar defaultValue={new Date(2026, 5, 6)} />
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Card</span>
          <Card>
            <CardMedia aria-hidden="true">
              <Library />
            </CardMedia>
            <CardContent>
              <CardTitle>Field Notes</CardTitle>
              <CardDescription>
                A rigid container holding glass: a cover, supporting copy, and
                one clear action.
              </CardDescription>
              <Button variant="default" size="sm">
                Open <span>→</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Waveform</span>
          <div
            className="sl-waveform"
            data-waveform
            data-bars="48"
            data-played="20"
            role="img"
            aria-label="Audio waveform, 42% played"
          ></div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Media player · now playing</span>
          <div className="sl-player">
            <div className="pl-top">
              <span className="pl-art" aria-hidden="true">
                <Radio />
              </span>
              <div className="pl-meta">
                <span className="pl-eyebrow">Now playing</span>
                <span className="pl-title">Gracias a la Vida</span>
                <span className="pl-artist">Violeta Parra</span>
              </div>
              <span className="sl-badge default">Live</span>
            </div>
            <div className="pl-progress">
              <div
                className="sl-waveform pl-wave"
                data-waveform
                data-bars="56"
                data-played="22"
                role="img"
                aria-label="Playback position, 39% elapsed"
              ></div>
              <div className="pl-times">
                <span className="pl-time">1:48</span>
                <span className="pl-time">4:38</span>
              </div>
            </div>
            <div className="pl-controls">
              <div className="pl-transport">
                <button type="button" className="sl-btn ghost pl-ic" aria-label="Shuffle">
                  <Shuffle />
                </button>
                <button type="button" className="sl-btn ghost pl-ic" aria-label="Previous track">
                  <SkipBack />
                </button>
                <button type="button" className="sl-btn default pl-play" aria-label="Pause">
                  <Pause />
                </button>
                <button type="button" className="sl-btn ghost pl-ic" aria-label="Next track">
                  <SkipForward />
                </button>
                <button type="button" className="sl-btn ghost pl-ic" aria-label="Repeat">
                  <Repeat />
                </button>
              </div>
              <div className="pl-vol">
                <Volume2 aria-hidden="true" />
                <div className="sl-slider">
                  <div className="trk">
                    <div className="fl" style={{ width: "72%" }}></div>
                    <div className="th" style={{ left: "72%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Table / data table</span>
          <Table>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "26%" }} />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <span className="th-full">Token</span>
                  <span className="th-abbr" aria-hidden="true">
                    Tok
                  </span>
                </TableHead>
                <TableHead>
                  <span className="th-full">Value</span>
                  <span className="th-abbr" aria-hidden="true">
                    Val
                  </span>
                </TableHead>
                <TableHead>
                  <span className="th-full">Surface</span>
                  <span className="th-abbr" aria-hidden="true">
                    Surf
                  </span>
                </TableHead>
                <TableHead>
                  <span className="th-full">Status</span>
                  <span className="th-abbr" aria-hidden="true">
                    Stat
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell title="--accent">--accent</TableCell>
                <TableCell title="#a388ee">#a388ee</TableCell>
                <TableCell title="Solid">Solid</TableCell>
                <TableCell>
                  <Badge variant="default">Live</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell title="--glass-alpha">--glass-alpha</TableCell>
                <TableCell title="0.07">0.07</TableCell>
                <TableCell title="Glass">Glass</TableCell>
                <TableCell>
                  <Badge variant="default">Live</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell title="--hard-x">--hard-x</TableCell>
                <TableCell title="7px">7px</TableCell>
                <TableCell title="Shadow">Shadow</TableCell>
                <TableCell>
                  <Badge variant="secondary">Draft</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell title="--radius">--radius</TableCell>
                <TableCell title="0px">0px</TableCell>
                <TableCell title="Edge">Edge</TableCell>
                <TableCell>
                  <Badge variant="default">Live</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Meter</span>
          <Meter
            value={72}
            label="Storage"
            valueText="72 / 100 GB"
            aria-label="Storage used"
          />
          <Meter
            value={93}
            label="API quota"
            valueText="93%"
            warn
            aria-label="API quota used"
          />
        </div>
      </div>
    </div>
  );
}
