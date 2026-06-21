import * as React from "react";
import { Radio, Shuffle, SkipBack, Pause, SkipForward, Repeat, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/ui/waveform";

export interface MediaPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: string;
  artist?: string;
  badge?: React.ReactNode;
  elapsed?: string;
  duration?: string;
  /** waveform bar count */
  bars?: number;
  /** leading bars read as elapsed */
  played?: number;
  /** volume fill, 0–100 */
  volume?: number;
}

/** Structured Liquidity media player — a rigid "now playing" card over a glass waveform. */
export const MediaPlayer = React.forwardRef<HTMLDivElement, MediaPlayerProps>(
  (
    {
      eyebrow = "Now playing",
      title = "Gracias a la Vida",
      artist = "Violeta Parra",
      badge = "Live",
      elapsed = "1:48",
      duration = "4:38",
      bars = 56,
      played = 22,
      volume = 72,
      className,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("sl-player", className)} {...props}>
      <div className="pl-top">
        <span className="pl-art" aria-hidden="true">
          <Radio />
        </span>
        <div className="pl-meta">
          <span className="pl-eyebrow">{eyebrow}</span>
          <span className="pl-title">{title}</span>
          <span className="pl-artist">{artist}</span>
        </div>
        {badge != null && <Badge variant="default">{badge}</Badge>}
      </div>
      <div className="pl-progress">
        <Waveform
          className="pl-wave"
          bars={bars}
          played={played}
          aria-label="Playback position"
        />
        <div className="pl-times">
          <span className="pl-time">{elapsed}</span>
          <span className="pl-time">{duration}</span>
        </div>
      </div>
      <div className="pl-controls">
        <div className="pl-transport">
          <Button variant="ghost" className="pl-ic" aria-label="Shuffle">
            <Shuffle />
          </Button>
          <Button variant="ghost" className="pl-ic" aria-label="Previous track">
            <SkipBack />
          </Button>
          <Button variant="default" className="pl-play" aria-label="Pause">
            <Pause />
          </Button>
          <Button variant="ghost" className="pl-ic" aria-label="Next track">
            <SkipForward />
          </Button>
          <Button variant="ghost" className="pl-ic" aria-label="Repeat">
            <Repeat />
          </Button>
        </div>
        <div className="pl-vol">
          <Volume2 aria-hidden="true" />
          <div className="sl-slider">
            <div className="trk">
              <div className="fl" style={{ width: `${volume}%` }} />
              <div className="th" style={{ left: `${volume}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
);
MediaPlayer.displayName = "MediaPlayer";
