import {
  Plus,
  Copy,
  Square,
  Trash2,
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
import { Menubar } from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar, ToolbarSeparator } from "@/components/ui/toolbar";

export function KitActions() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Actions</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Badge · Button · Toggle · Toolbar</span>
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
            <Badge variant="default">
              <span className="ico"></span>Live
            </Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Button · core actions</span>
          <div className="kit-row sl-button-specimen">
            <Button variant="default">
              <Plus />
              Primary
            </Button>
            <Button variant="secondary">
              <Copy />
              Secondary
            </Button>
            <Button variant="outline">
              <Square />
              Outline
            </Button>
            <Button variant="destructive">
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Menubar</span>
          <Menubar>
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Help</button>
          </Menubar>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Toggle &amp; toggle group</span>
          <div className="kit-row">
            <Toggle defaultPressed={false}>B</Toggle>
            <Toggle defaultPressed={true}>I</Toggle>
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Left">
                ⌶
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                ≡
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                ⌷
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="glass kit-cell w8">
          <span className="kit-cap">Toolbar</span>
          <Toolbar aria-label="Text formatting">
            <div className="sl-toggle-group" data-toggle-group>
              <button aria-pressed="true" aria-label="Bold">
                <Bold />
              </button>
              <button aria-pressed="false" aria-label="Italic">
                <Italic />
              </button>
              <button aria-pressed="false" aria-label="Underline">
                <Underline />
              </button>
            </div>
            <ToolbarSeparator />
            <div className="sl-toggle-group" data-toggle-group>
              <button aria-pressed="true" aria-label="Align left">
                <AlignLeft />
              </button>
              <button aria-pressed="false" aria-label="Align center">
                <AlignCenter />
              </button>
              <button aria-pressed="false" aria-label="Align right">
                <AlignRight />
              </button>
            </div>
            <ToolbarSeparator />
            <Button variant="outline" size="sm">
              <Link />
              Insert link
            </Button>
          </Toolbar>
        </div>
      </div>
    </div>
  );
}
