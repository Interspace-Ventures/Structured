# Visual vocabulary

Scientific modern clarity depends on repetition. A generated interface should not create a new
typeface, font size, weight, or color each time it needs emphasis.

## Contract

- Three semantic type roles resolve to no more than two actual typefaces: display, body, and detail.
- Seven size tiers cover product UI and public Pages: detail, body, lead, section, title, display
  large, and display extra-large.
- Four weights provide hierarchy: regular, medium, bold, and strong.
- Color is expressed through semantic roles such as accent, paper, ink, edge, shadow, and negative
  state rather than component-local literals.

Tenant identity changes token values, not the number of decisions exposed inside a component.
Logos, illustrations, photography, and data visualizations may have their own color requirements;
their labels and surrounding interface still use the shared vocabulary.

## Enforcement

The visual-vocabulary checker validates the role tokens and a checked-in baseline of existing raw
declarations. The baseline is a migration ledger: it may shrink, but new or changed raw
font-family, font-size, font-weight, or color declarations fail until explicitly reviewed. This
lets established products improve incrementally while new components begin with the stricter rule.

Run:

```bash
pnpm --filter @workspace/structured-liquidity run visual-vocabulary:check
```

After an intentional cleanup, refresh the baseline in the same change:

```bash
pnpm --filter @workspace/structured-liquidity run visual-vocabulary:baseline
```
