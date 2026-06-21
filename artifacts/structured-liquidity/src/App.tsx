import { useEffect } from "react";
import { initBehaviors } from "@/lib/behaviors";
import { ToastProvider, Toaster } from "@/components/ui/toast";
import { Backdrop } from "@/components/site/Backdrop";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Pillars } from "@/components/site/Pillars";
import { Components } from "@/components/site/Components";
import { Showcase } from "@/components/site/Showcase";
import { Adopt } from "@/components/site/Adopt";
import { FooterCta } from "@/components/site/FooterCta";
import { Footer } from "@/components/site/Footer";
import { Tweaker } from "@/components/site/Tweaker";

export function App() {
  useEffect(() => {
    initBehaviors();
  }, []);

  return (
    <ToastProvider>
      <Backdrop />
      <Nav />
      <Hero />
      <Pillars />
      <Components />
      <Showcase />
      <Adopt />
      <FooterCta />
      <Footer />
      <Tweaker />
      <Toaster />
    </ToastProvider>
  );
}
