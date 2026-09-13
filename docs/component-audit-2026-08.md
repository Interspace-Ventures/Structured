# Product component audit — August 2026

The Structured Liquidity registry was compared with the active Interspace, Observatory, Bastion, Universe, and Exobase codebases. The registry already covers the shared primitive layer. The strongest gaps were recurring product patterns rather than additional generic controls.

## Added

| Pattern                                | Evidence in active products                                                                          | Registry component |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ |
| Product activity and changelog entries | Interspace changelog and investor updates; Exobase signals and tenant changelogs; Universe changelog | `activity-feed`    |
| File intake and evidence upload        | Universe song and lyric upload; Observatory attachments; Exobase media forms                         | `dropzone`         |
| Plans, packages, and subscriptions     | Interspace advisory packages; Exobase pricing display; Universe Pro and top-up cards                 | `pricing-card`     |
| Profile and operator identity          | Construct profile presentation and identity facts                                                    | `profile-card`     |

Each addition keeps the language constraints: square containers, load-bearing black borders, neutral glass, selective flat zero-blur shadows, one accent, Inter for headings and body, and Space Mono for metadata.

## Covered by existing components

- Portfolio and metric summaries: `card`, `stat`, `table`, and `filter-toolbar`.
- Research inspection: `detail-panel`, `tabs`, `resizable`, and `scroll-area`.
- Command and AI workflows: `omnibar`, `command`, `ai-chat`, and `sheet`.
- Mobile navigation: one `mobile-nav` composition combining the floating liquid tab marker with the drawer; the redundant standalone tab and segmented-nav specimens are no longer showcased.
- Selection and loading: one styled `select`/options pattern and one consolidated `skeleton` specimen replace duplicate native/dropdown and card/text/list examples.
- Trust and identity: `testimonial-card`, `logo-grid`, and `profile-header`.

## Next candidates

- A source/provenance panel once Observatory's evidence contract stabilizes.
- A media-library row if the Universe web and mobile models converge.
- A dense admin record editor after the Interspace and Exobase authoring flows share enough anatomy to avoid encoding one product's workflow.
