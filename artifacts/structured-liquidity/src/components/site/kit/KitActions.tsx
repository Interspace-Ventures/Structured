import {
  Plus,
  Copy,
  Square,
  Ghost,
  Trash2,
  ExternalLink,
  Ban,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menubar } from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Spinner } from "@/components/ui/spinner";

export function KitActions() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Actions</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Badge · Button · Dropdown · Toggle</span>
      </div>
      <div className="kit-grid">

        <div className="glass kit-cell w4">
          <span className="kit-cap">Badge</span>
          <div className="kit-row">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="kit-row">
            <Badge variant="default"><span className="ico"></span>Live</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Button · variants &amp; sizes</span>
          <div className="kit-row">
            <Button variant="default"><Plus />Primary</Button>
            <Button variant="secondary"><Copy />Secondary</Button>
            <Button variant="outline"><Square />Outline</Button>
            <Button variant="ghost"><Ghost />Ghost</Button>
            <Button variant="destructive"><Trash2 />Delete</Button>
            <Button variant="link"><ExternalLink />Link</Button>
          </div>
          <div className="kit-row">
            <Button variant="default" size="sm"><Plus />Small</Button>
            <Button variant="default"><Plus />Default</Button>
            <Button variant="default" size="lg"><Plus />Large</Button>
            <Button variant="secondary" size="icon" aria-label="Add"><Plus /></Button>
            <Button variant="default"><Spinner /> Loading</Button>
            <Button variant="default" disabled><Ban />Disabled</Button>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Dropdown menu</span>
          <DropdownMenu>
            <DropdownMenuTrigger>Options</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem shortcut="⌘P">Profile</DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘,">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Invite team</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Menubar</span>
          <Menubar>
            <button>File</button><button>Edit</button><button>View</button><button>Help</button>
          </Menubar>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Toggle &amp; toggle group</span>
          <div className="kit-row">
            <Toggle defaultPressed={false}>B</Toggle>
            <Toggle defaultPressed={true}>I</Toggle>
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Left">⌶</ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">≡</ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">⌷</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Toolbar</span>
          <div className="sl-toolbar" role="toolbar" aria-label="Text formatting">
            <div className="sl-toggle-group" data-toggle-group>
              <button aria-pressed="true" aria-label="Bold"><Bold /></button>
              <button aria-pressed="false" aria-label="Italic"><Italic /></button>
              <button aria-pressed="false" aria-label="Underline"><Underline /></button>
            </div>
            <span className="sl-sep vert"></span>
            <div className="sl-toggle-group" data-toggle-group>
              <button aria-pressed="true" aria-label="Align left"><AlignLeft /></button>
              <button aria-pressed="false" aria-label="Align center"><AlignCenter /></button>
              <button aria-pressed="false" aria-label="Align right"><AlignRight /></button>
            </div>
            <span className="sl-sep vert"></span>
            <button className="sl-btn ghost sm"><Link />Link</button>
          </div>
        </div>

      </div>
    </div>
  );
}
