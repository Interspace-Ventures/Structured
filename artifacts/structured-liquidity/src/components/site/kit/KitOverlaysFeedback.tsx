import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function KitOverlaysFeedback() {
  const { toast } = useToast();
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head"><span className="kg-name">Overlays &amp; feedback</span><span className="kg-rule"></span><span className="kg-count">Dialog · Popover · Sheet · Toast</span></div>
      <div className="kit-grid">

        <div className="glass kit-cell w4">
          <span className="kit-cap">Dialog</span>
          <p className="mono" style={{ fontSize: "0.78rem", color: "var(--ink-dim)", margin: 0 }}>A modal that settles into its shadow on open.</p>
          <Dialog>
            <DialogTrigger className="sl-btn default">Open dialog</DialogTrigger>
            <DialogContent>
              <h3>Reset to defaults?</h3>
              <p>This restores every token to the Structured Liquidity baseline: accent, blur, border weight, and shadow offset. This can't be undone.</p>
              <div className="actions">
                <DialogClose className="sl-btn ghost">Cancel</DialogClose>
                <DialogClose className="sl-btn destructive">Reset tokens</DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Popover</span>
          <Popover>
            <PopoverTrigger className="sl-btn outline">Open popover</PopoverTrigger>
            <PopoverContent style={{ minWidth: "220px", padding: "0.9rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.3rem" }}>Dimensions</div>
              <p className="mono" style={{ fontSize: "0.74rem", color: "var(--ink-dim)", margin: "0 0 0.7rem" }}>Set the container width and radius.</p>
              <div className="kit-row" style={{ gap: "0.5rem" }}><Input style={{ width: "70px" }} defaultValue="320" /><Input style={{ width: "70px" }} defaultValue="0" /></div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Sheet</span>
          <p className="mono" style={{ fontSize: "0.78rem", color: "var(--ink-dim)", margin: 0 }}>A side panel that slides in from the edge.</p>
          <Sheet>
            <SheetTrigger className="sl-btn secondary">Open sheet</SheetTrigger>
            <SheetContent>
              <div className="kit-row" style={{ justifyContent: "space-between", marginBottom: "1.1rem" }}>
                <h3>Theme settings</h3>
                <SheetClose className="sl-btn icon ghost" aria-label="Close">✕</SheetClose>
              </div>
              <p>Side panels slide in from the structural edge and carry their own border + shadow.</p>
              <div className="kit-col" style={{ marginTop: "1.2rem", gap: "1rem" }}>
                <div className="kit-row" style={{ justifyContent: "space-between" }}><span className="mono" style={{ fontSize: "0.8rem" }}>Glass blur</span><div className="sl-switch" data-toggle-aria="checked" aria-checked="true" tabIndex={0}><span className="knob"></span></div></div>
                <div className="kit-row" style={{ justifyContent: "space-between" }}><span className="mono" style={{ fontSize: "0.8rem" }}>Flat shadows</span><div className="sl-switch" data-toggle-aria="checked" aria-checked="true" tabIndex={0}><span className="knob"></span></div></div>
                <label className="sl-label">Accent</label>
                <Input defaultValue="#a388ee" />
                <SheetClose className="sl-btn default" style={{ marginTop: "0.5rem" }}>Save changes</SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="glass kit-cell w12">
          <span className="kit-cap">Toast / sonner</span>
          <div className="kit-row">
            <Button variant="default" onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>Show toast</Button>
            <Button variant="outline" onClick={() => toast({ title: "Copied", description: "Tokens exported to clipboard." })}>Copy tokens</Button>
            <span className="mono" style={{ fontSize: "0.76rem", color: "var(--ink-dim)" }}>Stacks bottom-right, auto-dismisses.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
