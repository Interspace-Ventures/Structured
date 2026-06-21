import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function KitMenusOverlays() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Menus &amp; overlays</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Alert dialog · Context menu · Drawer · Navigation menu</span>
      </div>
      <div className="kit-grid">

        <div className="glass kit-cell w6">
          <span className="kit-cap">Alert dialog</span>
          <p className="mono" style={{ fontSize: "0.78rem", color: "var(--ink-dim)", margin: 0 }}>A blocking confirm for destructive actions.</p>
          <AlertDialog>
            <AlertDialogTrigger className="sl-btn destructive">Delete project</AlertDialogTrigger>
            <AlertDialogContent>
              <h4 style={{ margin: "0 0 0.4rem", fontWeight: 700 }}>Delete project?</h4>
              <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--ink-dim)" }}>This permanently removes the project and all of its data. This action cannot be undone.</p>
              <div className="kit-row" style={{ justifyContent: "flex-end" }}>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete project</AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Context menu</span>
          <div className="kit-row" style={{ alignItems: "flex-start", gap: "0.8rem" }}>
            <ContextMenu style={{ flex: 1 }}>
              <ContextMenuTrigger>Right-click surface</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem shortcut="↵">Play</ContextMenuItem>
                <ContextMenuItem shortcut="⌘Q">Add to queue</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Share</ContextMenuItem>
                <ContextMenuItem>Remove</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Drawer</span>
          <p className="mono" style={{ fontSize: "0.78rem", color: "var(--ink-dim)", margin: 0 }}>A panel that rises from the bottom edge.</p>
          <Drawer>
            <DrawerTrigger className="sl-btn secondary">Open drawer</DrawerTrigger>
            <DrawerContent>
              <h4 style={{ margin: "0 0 0.4rem", fontWeight: 700 }}>Quick settings</h4>
              <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--ink-dim)" }}>A panel that rises from the bottom edge, settling into its flat shadow.</p>
              <div className="kit-row" style={{ justifyContent: "flex-end" }}>
                <DrawerClose className="sl-btn ghost">Close</DrawerClose>
                <DrawerClose className="sl-btn default">Save</DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Navigation menu</span>
          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">universe.audio</NavigationMenuLink>
                <NavigationMenuLink href="#">Structured Liquidity</NavigationMenuLink>
                <NavigationMenuLink href="#">Interspace</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                <NavigationMenuLink href="#">Tokens</NavigationMenuLink>
                <NavigationMenuLink href="#">Changelog</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger withChevron={false}>Pricing</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenu>
          <span className="mono" style={{ fontSize: "0.74rem", color: "var(--ink-dim)" }}>Hover an item for its flyout.</span>
        </div>

      </div>
    </div>
  );
}
