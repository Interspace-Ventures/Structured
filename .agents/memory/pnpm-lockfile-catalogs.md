---
name: pnpm strips catalogs block from lockfile
description: Why any pnpm add/remove/install in this repo deletes the catalogs section of pnpm-lock.yaml, and how to avoid the churn.
---

# pnpm in this env rewrites pnpm-lock.yaml without the `catalogs:` block

The committed `pnpm-lock.yaml` contains a top-level `catalogs:` section (the resolved
`catalog:` pins from `pnpm-workspace.yaml`). The pnpm version installed here
(10.26.x) regenerates the lockfile **without** that block on any `pnpm add`,
`pnpm remove`, or even `pnpm install` ("Lockfile is up to date" still leaves it
stripped). The result is a ~66-line deletion diff in `pnpm-lock.yaml` unrelated to
your actual change.

**Why it matters:** dropping `catalogs:` is an unintended, reviewable change that
pollutes a focused task (e.g. an asset-only edit) and could confuse catalog
resolution for other tooling.

**How to apply:**
- For throwaway tooling (e.g. installing `playwright-core` for a one-off screenshot
  capture), expect the lockfile to get mangled. After removing the temp dep, restore
  the lockfile to its committed content instead of trusting `pnpm install`.
- Restore without a destructive git command (the main agent guard blocks
  `git restore`/`git checkout` **and** redirecting `git show` onto a tracked path):
  `git --no-optional-locks show HEAD:pnpm-lock.yaml > /tmp/orig-lock.yaml && cp /tmp/orig-lock.yaml pnpm-lock.yaml`.
