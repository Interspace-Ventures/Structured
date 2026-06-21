import type { CSSProperties } from "react";
import {
  Compass,
  Library,
  Radio,
  Play,
  ArrowRight,
  Menu,
  X,
  Search,
  Heart,
  House,
  User,
  Disc3,
  Music,
  BarChart3,
  Sparkles,
  ChevronLeft,
  Paperclip,
  Mic,
  ArrowUp,
} from "lucide-react";

export function KitNavigation() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Navigation</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Marquee · Menubar · Navbar</span>
      </div>
      <div className="kit-grid">

        <div className="glass kit-cell w12">
          <span className="kit-cap">Marquee</span>
          <div className="sl-marquee is-streaming" role="list" aria-label="Supported languages">
            <div className="sl-marquee-track" role="presentation">
              <span role="listitem">日本語</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">Māori</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">中文</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">English</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">Español</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">Français</span><span className="di" aria-hidden="true">✦</span>
              <span role="listitem">हिन्दी</span>
            </div>
            <div className="sl-marquee-track" role="presentation" aria-hidden="true">
              <span>日本語</span><span className="di" aria-hidden="true">✦</span>
              <span>Māori</span><span className="di" aria-hidden="true">✦</span>
              <span>中文</span><span className="di" aria-hidden="true">✦</span>
              <span>English</span><span className="di" aria-hidden="true">✦</span>
              <span>Español</span><span className="di" aria-hidden="true">✦</span>
              <span>Français</span><span className="di" aria-hidden="true">✦</span>
              <span>हिन्दी</span>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w12">
          <span className="kit-cap">Navigation bar</span>
          <div className="sl-navbar">
            <span className="nb-brand"><span className="glyph" style={{ "--s": "22px" } as CSSProperties} aria-hidden="true"></span>universe.audio</span>
            <div className="nb-links">
              <a href="#" aria-current="page"><Compass />Discover</a>
              <a href="#"><Library />Library</a>
              <a href="#"><Radio />Radio</a>
            </div>
            <div className="sl-pop-wrap">
              <button className="sl-trigger" data-pop aria-expanded="false" aria-haspopup="menu"><span>Browse</span><span className="chev">▾</span></button>
              <div className="sl-menu">
                <div className="lbl">Catalog</div>
                <div className="item">New releases</div>
                <div className="item">Genres</div>
                <div className="sep"></div>
                <div className="item">Languages</div>
              </div>
            </div>
            <div className="nb-right">
              <div className="sl-toggle-group" data-toggle-group>
                <button aria-pressed="true" aria-label="Grid view">▦</button>
                <button aria-pressed="false" aria-label="List view">≡</button>
              </div>
              <span className="sl-ava">U</span>
              <button className="sl-btn ghost sm"><Play />Demo</button>
              <button className="sl-btn default sm"><ArrowRight />Join waitlist</button>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Mobile navigation · tab bar &amp; drawer</span>
          <div className="sl-mnav" data-mnav>
            <div className="mn-phone">
              <div className="mn-top">
                <button className="mn-burger" data-mnav-toggle aria-expanded="false" aria-label="Open menu"><Menu className="mn-ic-open" /><X className="mn-ic-close" /></button>
                <span className="mn-brand"><span className="glyph" style={{ "--s": "18px" } as CSSProperties} aria-hidden="true"></span>universe</span>
                <span className="mn-icon" aria-hidden="true"><Search /></span>
              </div>
              <div className="mn-drawer" data-mnav-drawer data-open="false">
                <div>
                  <a href="#" className="mn-d-item"><Compass />Discover</a>
                  <a href="#" className="mn-d-item"><Library />Library</a>
                  <a href="#" className="mn-d-item"><Radio />Radio</a>
                  <a href="#" className="mn-d-item"><Heart />Saved</a>
                </div>
              </div>
              <div className="mn-screen" aria-hidden="true">
                <div className="mn-sk tall"></div>
                <div className="mn-sk line"></div>
                <div className="mn-sk line short"></div>
              </div>
              <nav className="mn-tabs" aria-label="Primary">
                <button className="mn-tab is-active" aria-current="page"><House /><span>Home</span></button>
                <button className="mn-tab"><Search /><span>Search</span></button>
                <button className="mn-tab"><Compass /><span>Browse</span></button>
                <button className="mn-tab"><Heart /><span>Saved</span></button>
                <button className="mn-tab"><User /><span>You</span></button>
              </nav>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Mobile navigation · floating glass tab bar</span>
          <div className="sl-gnav">
            <div className="mn-phone">
              <div className="mn-screen" aria-hidden="true">
                <div className="mn-sk tall"></div>
                <div className="mn-sk line"></div>
                <div className="mn-sk line short"></div>
              </div>
              <nav className="gnav-bar" aria-label="Primary">
                <span className="gnav-marker" aria-hidden="true"></span>
                <button className="gnav-tab is-active" aria-current="page"><Disc3 /><span>Playback</span></button>
                <button className="gnav-tab"><Music /><span>Music</span></button>
                <button className="gnav-tab"><BarChart3 /><span>Billboard</span></button>
                <button className="gnav-tab"><Sparkles /><span>Lyriq</span></button>
              </nav>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Mobile navigation · segmented sub-nav</span>
          <div className="sl-snav">
            <div className="mn-phone">
              <div className="snav-head">
                <button className="snav-back" aria-label="Back"><ChevronLeft /></button>
                <span className="snav-title">Library</span>
                <span className="snav-act" aria-hidden="true"><Search /></span>
              </div>
              <div className="snav-seg" role="tablist" aria-label="Sections" data-snav-seg>
                <span className="snav-marker" aria-hidden="true"></span>
                <button className="snav-seg-btn" role="tab" aria-selected="true">Playlists</button>
                <button className="snav-seg-btn" role="tab" aria-selected="false">Songs</button>
              </div>
              <div className="mn-screen" aria-hidden="true">
                <div className="mn-sk tall"></div>
                <div className="mn-sk line"></div>
                <div className="mn-sk line short"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">AI chat · conversation</span>
          <div className="sl-chat" data-chat>
            <div className="ch-head">
              <span className="ch-ava"><Sparkles /></span>
              <span className="ch-id"><strong>Vector</strong><span>AI assistant</span></span>
              <span className="ch-dot" title="Online" aria-hidden="true"></span>
            </div>
            <div className="ch-log" data-chat-log role="log" aria-live="polite">
              <div className="ch-msg bot"><span className="ch-b-ava"><Sparkles /></span><div className="ch-bubble">Hey, I'm Vector. Ask me to draft, summarize, or name anything.</div></div>
              <div className="ch-msg me"><div className="ch-bubble">Write a title for a late-night ambient mix.</div></div>
              <div className="ch-msg bot"><span className="ch-b-ava"><Sparkles /></span><div className="ch-bubble">How about "Low Tide, 3AM"? I can give you a few more.</div></div>
            </div>
            <div className="ch-suggest" data-chat-suggest>
              <button type="button" className="ch-chip">More title ideas</button>
              <button type="button" className="ch-chip">Make it moodier</button>
              <button type="button" className="ch-chip">Write a blurb</button>
            </div>
            <form className="ch-form" data-chat-form>
              <span className="ch-attach" aria-hidden="true"><Paperclip /></span>
              <input className="ch-input" data-chat-input type="text" placeholder="Ask Vector anything" aria-label="Message Vector" autoComplete="off" />
              <span className="ch-mic" aria-hidden="true"><Mic /></span>
              <button type="submit" className="ch-send" aria-label="Send message"><ArrowUp /></button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
