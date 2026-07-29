# Structured Liquidity adopters

`src/adopters.json` is the single source of truth for products using or developing with Structured Liquidity. It powers the public Showcase and records:

- lifecycle and route status;
- canonical domain and repository;
- the three design-language axes currently adopted;
- components already promoted into the shadcn registry;
- product-specific patterns still being evaluated.

## Maintenance loop

1. Add a product when Structured Liquidity is chosen, even if it is still a concept.
2. Review each adopter’s live UI and source before changing `reviewedAt`.
3. Put reusable, on-language patterns in `candidatePatterns`.
4. Promote a pattern only when it is useful beyond one product, follows the language’s rules, has a gallery specimen, and ships as a valid shadcn registry item.
5. Add the promoted registry slug to every adopter that informed it.
6. Run `pnpm --filter @workspace/structured-liquidity run registry` and `pnpm --filter @workspace/structured-liquidity run adopters:check`.

`scripts/check-adopters.mjs` prevents duplicate projects, broken screenshot references, invalid lifecycle states, and claims that a component was absorbed when no matching shadcn registry item exists.
