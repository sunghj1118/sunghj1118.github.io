# Branch map

Generated 2026-09-07 from `git branch -a -v` + merge-base analysis. Regenerate by re-running the
same commands — this file is a snapshot, not something git keeps in sync automatically.

```
origin/main (c7b61b9e, 2025-10-19)
 ├─ blog                 (55 ahead, 0 behind)  — last commit 2025-12-11
 ├─ feature/map           (36 ahead, 0 behind)  — last commit 2026-02-01
 ├─ feature/renewal *     (38 ahead, 0 behind)  — last commit 2026-02-04  [current branch]
 ├─ feature/hourglass     (36 ahead, 0 behind)  — last commit 2025-12-02  [remote-only]
 └─ style/dark-mode       (23 ahead, 0 behind)  — last commit 2025-11-13  [remote-only]

(older, unrelated lineage — diverged before the branches above)
 ├─ feat/projects-page-setup  (0 ahead, 177 behind)  — fully merged into main, stale
 ├─ feat/views                (2 ahead, 174 behind)   — diverged 2024-09-20, never merged
 └─ dependabot/npm_and_yarn/tar-fs-2.1.4  (1 ahead, 18 behind) — diverged 2025-10-19, likely superseded

local main (5f5f235f) — 441 commits behind origin/main; stale local ref, not shown above
```

## Notes

- **blog, feature/map, feature/renewal, feature/hourglass, style/dark-mode** all branch from the
  *same* point: `c7b61b9e` — the current tip of `origin/main` (merged 2025-10-19, PR #45). They're
  siblings, not a chain — none of them branch off each other.
- **feature/renewal** is the active branch (current work, unpushed changes in `src/posts/movie/`
  as of this snapshot).
- **feat/projects-page-setup** has 0 commits ahead of `origin/main` — it's fully merged, safe to
  delete if you want to tidy up.
- **feat/views** and **dependabot/npm_and_yarn/tar-fs-2.1.4** diverged from an old point in main's
  history and were never merged — likely abandoned/superseded (a newer dependabot bump for the
  same dependency merged the same day as the latter's divergence).
- Local `main` is 441 commits behind `origin/main` — run `git fetch && git merge --ff-only
  origin/main` (while on `main`) to catch it up if needed.
