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

export function KitNavDisclosure() {
  return (
    <div className="kit-group reveal">
      <div className="kit-group-head">
        <span className="kg-name">Navigation &amp; disclosure</span>
        <span className="kg-rule"></span>
        <span className="kg-count">Accordion · Breadcrumb · Pagination</span>
      </div>
      <div className="kit-grid">
        <div className="glass kit-cell w6">
          <span className="kit-cap">Accordion</span>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Structured Liquidity?</AccordionTrigger>
              <AccordionContent>
                <p>
                  It is an open UI design language that pairs rigid grids and
                  flat offset shadows with liquid, light-reflecting glass,
                  shipped with tokens and a full component kit.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it tied to one product?</AccordionTrigger>
              <AccordionContent>
                <p>
                  No. Kepler Station is a fictional specimen world; the language
                  is product-agnostic and travels between products through its
                  tokens.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I theme the accent?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes. A single accent token drives every emphasis across the
                  kit, so changing one value retunes the entire interface.
                </p>
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
      </div>
    </div>
  );
}
