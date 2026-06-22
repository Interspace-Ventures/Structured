import { Marquee } from "@/components/ui/marquee";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { MobileTabBar, GlassTabBar, SegmentedNav } from "@/components/ui/mobile-nav";
import { AIChat } from "@/components/ui/ai-chat";

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
          <Marquee aria-label="Supported languages" />
        </div>

        <div className="glass kit-cell w12">
          <span className="kit-cap">Navigation bar</span>
          <NavigationBar />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Tab bar &amp; drawer</span>
          <MobileTabBar />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Floating glass tab bar</span>
          <GlassTabBar />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Segmented sub-nav</span>
          <SegmentedNav />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">AI chat · conversation</span>
          <AIChat />
        </div>

      </div>
    </div>
  );
}
