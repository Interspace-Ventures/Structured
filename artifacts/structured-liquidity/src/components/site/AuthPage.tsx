import { SignIn, SignUp } from "@clerk/react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();

export function AuthPage() {
  const isSignUp =
    window.location.pathname === "/sign-up" ||
    window.location.pathname.startsWith("/sign-up/");

  if (!clerkPublishableKey) {
    return (
      <main className="auth-page">
        <section className="auth-frame" aria-labelledby="auth-title">
          <div className="auth-copy">
            <span className="auth-kicker">Structured · Staging</span>
            <h1 id="auth-title">Sign-in is not configured.</h1>
            <p>The embedded staging access surface is unavailable.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-frame" aria-labelledby="auth-title">
        <div className="auth-copy">
          <span className="auth-kicker">Structured · Staging</span>
          <h1 id="auth-title">
            {isSignUp ? "Accept your invitation." : "Enter the system."}
          </h1>
          <p>
            Private review access for the Structured Liquidity design system.
          </p>
          <dl className="auth-notes">
            <div>
              <dt>Surface</dt>
              <dd>staging.structured.glass</dd>
            </div>
            <div>
              <dt>Access</dt>
              <dd>Invited accounts only</dd>
            </div>
          </dl>
        </div>

        <div className="auth-widget-shell">
          {isSignUp ? (
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/"
              signInFallbackRedirectUrl="/"
              appearance={{
                options: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                },
                variables: {
                  borderRadius: "0px",
                  colorBackground: "#ffffff",
                  colorPrimary: "#a388ee",
                  colorForeground: "#111111",
                  colorMutedForeground: "#5d5d59",
                  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                  fontFamilyButtons:
                    '"Inter", "Helvetica Neue", Arial, sans-serif',
                },
                elements: {
                  rootBox: "structured-auth-root",
                  cardBox: "structured-auth-card-box",
                  card: "structured-auth-card",
                  headerTitle: "structured-auth-title",
                  headerSubtitle: "structured-auth-subtitle",
                  socialButtonsBlockButton: "structured-auth-social",
                  formButtonPrimary: "structured-auth-primary",
                  formFieldInput: "structured-auth-input",
                  footerActionLink: "structured-auth-link",
                  dividerLine: "structured-auth-divider",
                },
              }}
            />
          ) : (
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/"
              signUpFallbackRedirectUrl="/"
              appearance={{
              options: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "blockButton",
              },
              variables: {
                borderRadius: "0px",
                colorBackground: "#ffffff",
                colorPrimary: "#a388ee",
                colorForeground: "#111111",
                colorMutedForeground: "#5d5d59",
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontFamilyButtons:
                  '"Inter", "Helvetica Neue", Arial, sans-serif',
              },
              elements: {
                rootBox: "structured-auth-root",
                cardBox: "structured-auth-card-box",
                card: "structured-auth-card",
                headerTitle: "structured-auth-title",
                headerSubtitle: "structured-auth-subtitle",
                socialButtonsBlockButton: "structured-auth-social",
                formButtonPrimary: "structured-auth-primary",
                formFieldInput: "structured-auth-input",
                footerActionLink: "structured-auth-link",
                dividerLine: "structured-auth-divider",
              },
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
