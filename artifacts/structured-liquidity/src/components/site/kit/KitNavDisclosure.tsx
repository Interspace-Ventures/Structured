import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export function KitNavDisclosure() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Navigation &amp; disclosure</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Accordion · Breadcrumb · Pagination · Tabs</span>
      </div>
      <div className="kit-grid">

        <div className="glass kit-cell w6">
          <span className="kit-cap">Accordion</span>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Structured Liquidity?</AccordionTrigger>
              <AccordionContent>
                <p>It is an open UI design language that pairs rigid grids and flat offset shadows with liquid, light-reflecting glass, shipped with tokens and a full component kit.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it tied to one product?</AccordionTrigger>
              <AccordionContent>
                <p>No. universe.audio is only one example; the language is product-agnostic and travels from product to product by its tokens.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I theme the accent?</AccordionTrigger>
              <AccordionContent>
                <p>Yes. A single accent token drives every emphasis across the kit, so changing one value retunes the entire interface.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Breadcrumb</span>
          <Breadcrumb>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink href="#">Forms</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Input</BreadcrumbPage>
          </Breadcrumb>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Pagination</span>
          <Pagination count={4} defaultPage={1} />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Tabs</span>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">A glass surface in a rigid frame, what you see in the preview pane.</TabsContent>
            <TabsContent value="code">Copy-paste markup with utility classes, ready to drop in.</TabsContent>
            <TabsContent value="tokens">Every value exposed as a CSS custom property you can theme.</TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
}
