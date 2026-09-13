import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import { timingSafeEqual } from "node:crypto";
import type { Express, NextFunction, Request, Response } from "express";

const STAGING_ROBOTS = "noindex, nofollow, noarchive, nosnippet";
const AUTHORIZATION_CACHE_TTL_MS = 60_000;

type StagingAccessConfig = {
  allowedEmails: Set<string>;
  authorizedParties: string[];
  canonicalOrigin: string;
  constructPageProxySecret: string | null;
  publishableKey: string;
  secretKey: string;
  signInUrl: string;
};

type CachedAuthorization = {
  allowed: boolean;
  expiresAt: number;
};

const authorizationCache = new Map<string, CachedAuthorization>();

function parseCsv(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseHttpsUrl(value: string, name: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`${name} must use https`);
  }

  return (
    url.origin + (url.pathname === "/" ? "" : url.pathname.replace(/\/$/, ""))
  );
}

function readConfig(): StagingAccessConfig {
  const publishableKey = process.env["CLERK_PUBLISHABLE_KEY"]?.trim();
  const secretKey = process.env["CLERK_SECRET_KEY"]?.trim();
  const signInUrlValue = process.env["CLERK_SIGN_IN_URL"]?.trim();
  const canonicalOriginValue = process.env["STAGING_CANONICAL_ORIGIN"]?.trim();
  const constructPageProxySecret =
    process.env["CONSTRUCT_PAGE_PROXY_SECRET"]?.trim() || null;
  const allowedEmails = new Set(
    parseCsv(process.env["STAGING_ALLOWED_EMAILS"]).map((email) =>
      email.toLowerCase(),
    ),
  );
  const authorizedParties = parseCsv(
    process.env["STAGING_AUTHORIZED_PARTIES"],
  ).map((party) => parseHttpsUrl(party, "STAGING_AUTHORIZED_PARTIES"));

  if (
    !publishableKey ||
    !secretKey ||
    !signInUrlValue ||
    !canonicalOriginValue
  ) {
    throw new Error(
      "Staging auth requires CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_SIGN_IN_URL, and STAGING_CANONICAL_ORIGIN",
    );
  }

  if (allowedEmails.size === 0 || authorizedParties.length === 0) {
    throw new Error(
      "Staging auth requires non-empty STAGING_ALLOWED_EMAILS and STAGING_AUTHORIZED_PARTIES",
    );
  }

  if (constructPageProxySecret && constructPageProxySecret.length < 32) {
    throw new Error("CONSTRUCT_PAGE_PROXY_SECRET must be at least 32 characters");
  }

  const canonicalOrigin = parseHttpsUrl(
    canonicalOriginValue,
    "STAGING_CANONICAL_ORIGIN",
  );
  const signInUrl = parseHttpsUrl(signInUrlValue, "CLERK_SIGN_IN_URL");

  if (!authorizedParties.includes(canonicalOrigin)) {
    throw new Error(
      "STAGING_AUTHORIZED_PARTIES must include STAGING_CANONICAL_ORIGIN exactly",
    );
  }

  return {
    allowedEmails,
    authorizedParties,
    canonicalOrigin,
    constructPageProxySecret,
    publishableKey,
    secretKey,
    signInUrl,
  };
}

function isTrustedConstructPageRequest(
  req: Request,
  expectedToken: string | null,
): boolean {
  const suppliedToken = req.get("x-construct-page-token")?.trim();
  if (!expectedToken || !suppliedToken) return false;

  const supplied = Buffer.from(suppliedToken);
  const expected = Buffer.from(expectedToken);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function isHealthRequest(req: Request): boolean {
  return req.path === "/api/health" || req.path === "/api/healthz";
}

function isApiRequest(req: Request): boolean {
  return req.path === "/api" || req.path.startsWith("/api/");
}

function isPublicAuthSurfaceRequest(req: Request): boolean {
  return (
    req.path === "/sign-in" ||
    req.path.startsWith("/sign-in/") ||
    req.path === "/sign-up" ||
    req.path.startsWith("/sign-up/") ||
    req.path.startsWith("/assets/") ||
    req.path === "/favicon.svg" ||
    req.path === "/favicon.ico"
  );
}

function signInRedirect(config: StagingAccessConfig, req: Request): string {
  const signInUrl = new URL(config.signInUrl);
  const returnUrl = new URL(req.originalUrl || "/", config.canonicalOrigin);
  signInUrl.searchParams.set("redirect_url", returnUrl.toString());
  return signInUrl.toString();
}

async function isAllowedUser(
  userId: string,
  allowedEmails: Set<string>,
): Promise<boolean> {
  const cached = authorizationCache.get(userId);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.allowed;
  }

  const user = await clerkClient.users.getUser(userId);
  const allowed = user.emailAddresses.some((email) =>
    allowedEmails.has(email.emailAddress.toLowerCase()),
  );

  authorizationCache.set(userId, {
    allowed,
    expiresAt: now + AUTHORIZATION_CACHE_TTL_MS,
  });

  return allowed;
}

export function installStagingAccess(app: Express): void {
  if (process.env["STAGING_AUTH_REQUIRED"] !== "true") return;

  const config = readConfig();
  const canonicalHostname = new URL(config.canonicalOrigin).hostname;

  app.use((req, res, next) => {
    res.locals["constructPageProxy"] = isTrustedConstructPageRequest(
      req,
      config.constructPageProxySecret,
    );
    res.setHeader("X-Robots-Tag", STAGING_ROBOTS);
    res.setHeader("Referrer-Policy", "same-origin");

    if (!isHealthRequest(req)) {
      res.setHeader("Cache-Control", "private, no-store");
    }

    next();
  });

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send("User-agent: *\nDisallow: /\n");
  });

  app.use((req, res, next) => {
    if (
      !isHealthRequest(req) &&
      !isApiRequest(req) &&
      !res.locals["constructPageProxy"] &&
      req.hostname !== canonicalHostname
    ) {
      const destination = new URL(
        req.originalUrl || "/",
        config.canonicalOrigin,
      );
      res.redirect(308, destination.toString());
      return;
    }

    next();
  });

  const clerkAccess = clerkMiddleware({
    authorizedParties: config.authorizedParties,
    publishableKey: config.publishableKey,
    secretKey: config.secretKey,
    signInUrl: config.signInUrl,
  });

  app.use((req, res, next) => {
    if (res.locals["constructPageProxy"]) {
      next();
      return;
    }
    clerkAccess(req, res, next);
  });

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (
      isHealthRequest(req) ||
      isPublicAuthSurfaceRequest(req) ||
      res.locals["constructPageProxy"]
    ) {
      next();
      return;
    }

    const { userId } = getAuth(req);

    if (!userId) {
      if (isApiRequest(req)) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      res.redirect(302, signInRedirect(config, req));
      return;
    }

    try {
      if (!(await isAllowedUser(userId, config.allowedEmails))) {
        res
          .status(403)
          .send("This account does not have access to Structured staging.");
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  });
}
