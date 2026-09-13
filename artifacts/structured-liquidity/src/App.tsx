import { useEffect } from "react";
import { initBehaviors } from "@/lib/behaviors";
import { ToastProvider, Toaster } from "@/components/ui/toast";
import { Backdrop } from "@/components/site/Backdrop";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Tenets } from "@/components/site/Tenets";
import { Components } from "@/components/site/Components";
import { Showcase } from "@/components/site/Showcase";
import { Adopt } from "@/components/site/Adopt";
import { FooterCta } from "@/components/site/FooterCta";
import { Footer } from "@/components/site/Footer";
import { Tweaker } from "@/components/site/Tweaker";
import { AuthPage } from "@/components/site/AuthPage";

export function App() {
  if (
    window.location.pathname === "/sign-in" ||
    window.location.pathname.startsWith("/sign-in/") ||
    window.location.pathname === "/sign-up" ||
    window.location.pathname.startsWith("/sign-up/")
  ) {
    return <AuthPage />;
  }

  const isStaging =
    window.location.hostname === "staging.structured.glass" ||
    import.meta.env.VITE_DEPLOYMENT_ENVIRONMENT === "staging";

  useEffect(() => {
    initBehaviors();
  }, []);

  return (
    <ToastProvider>
      {isStaging ? (
        <div
          className="staging-environment-label"
          aria-label="Staging environment"
        >
          Staging
        </div>
      ) : null}
      <Backdrop />
      <Nav />
      <Hero />
      <Tenets />
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
