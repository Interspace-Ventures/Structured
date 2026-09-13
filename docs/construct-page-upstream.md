# Construct Page staging upstream

Structured remains the independently versioned source and renderer for the design system, while Construct owns the Page route, identity boundary, authorization, revision lifecycle, and domain mapping.

The canonical Staging Page is `https://staging.construct.page/structured`. Construct authorizes `construct-page:structured` with `resource:read`, then proxies the renderer server-to-server. The Structured service does not present another login to proxied Page visitors.

Staging runtime configuration:

- Build Structured with `BASE_PATH=/structured/` so generated asset URLs stay under the Construct Page route.
- Install the same randomly generated secret as `STRUCTURED_PAGE_PROXY_SECRET` in Construct and `CONSTRUCT_PAGE_PROXY_SECRET` in Structured.
- Keep `STAGING_AUTH_REQUIRED=true` on Structured so direct browser access remains protected during migration.
- Use the Railway provider origin, never `staging.structured.glass`, as Construct's `STRUCTURED_PAGE_UPSTREAM`.
- Keep both services no-index and never expose either proxy secret to a client bundle, log, screenshot, or repository.

The server credential bypasses only Structured's transitional product-specific Clerk check. It does not bypass Construct authentication or the exact Exo Page grant. Missing, short, or unequal secrets fail closed.

Do not retire or redirect `staging.structured.glass` until the canonical Construct route passes anonymous, granted, ungranted, revoked, wrong-plane, deep-link, refresh, sign-out, DNS, TLS, and rollback checks.
