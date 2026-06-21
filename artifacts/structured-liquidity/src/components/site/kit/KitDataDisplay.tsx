import { Info, TriangleAlert, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waveform } from "@/components/ui/waveform";
import { MediaPlayer } from "@/components/ui/media-player";
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
          <Waveform bars={48} played={20} aria-label="Audio waveform, 42% played" />
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Media player · now playing</span>
          <MediaPlayer />
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
