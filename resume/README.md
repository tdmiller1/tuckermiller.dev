# `resume/`

Source of truth for the resume PDF linked from `AppNavigation.jsx` (`RESUME_URL`).

`resume.html` is the document; the PDF is generated from it. Not a build input — CRA
never sees this directory.

## Regenerate

```bash
chromium --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=resume/resume-tucker-miller.pdf \
  file://$PWD/resume/resume.html
```

It must come out to **one page**. Check with `pdfinfo resume/resume-tucker-miller.pdf`.
The layout is tuned close to the edge of the page; if you add a bullet, something else
has to go.

## Publishing

`RESUME_URL` in `src/AppNavigation.jsx` points at an S3 object whose key encodes a date
(`Resume+9.15.2021.pdf`). Upload the new PDF under a stable key such as
`resume-latest.pdf` and update `RESUME_URL` once, so the link never encodes a date again.

## Provenance of the Seismic bullets

From `claude-jira-github-analysis-3-year.md`, an export of Jira epics correlated with merged
PRs across the `seismic` and `lessonly` orgs.

**Its counts are capped by API pagination and are undercounts.** The "8 completed Epics"
headline is wrong (closer to 15), so no epic count appears on the resume. The `300+ PRs` and
`134 stories` totals were dropped too. What survives is only per-item detail that doesn't
depend on a complete result set: the 74-file refactor in PR #493, the 700+ downstream PRs on
`web-skills-assets`, and the named epic deliverables.

The pre-2022 work is compressed into one trailing bullet, kept only for its hard numbers
(25 ms search, Zoom +50% events, mentorship). The Cypress-coverage and responsive/accessible-UI
bullets are cut; they still appear on `design/work.html`.

## Provenance of the OpenSermon numbers

Every figure was read out of `../didactic-octo-fortnight` and `../Crawl-Churches`, not
from `design/opensermon.html` — that page overstates two things (see below).

| Claim | Source |
|---|---|
| 38,848 sermons / 615 churches / ~46.3M segments | `context/decisions/ADR-011-*.md`, measured against production 2026-06-24 |
| 804 commits, 59 releases | `git log` / `git tag`, through 2026-07-08 |
| 749 crawler tests | `grep -rc "def test_" tests/` in `Crawl-Churches` |
| $0.0045–$0.009 vs $0.58–$1.20 per sermon | `context/aws/s3-egress-and-onprem-gpu-cost-analysis.md` |

The Whisper model benchmark (`benchmark-report.md` / `benchmark-quality.md`) is deliberately
**not** a bullet. Choosing a model off a benchmark is an evaluation, not a shipped outcome; the
cost bullet already carries the decision's actual result.

Two claims on `design/opensermon.html` are **not** repeated here, deliberately:

- **"494 commits co-authored by Claude."** The real count is **57** of 804
  (`git log --grep='Co-Authored-By: Claude' | wc -l`). The 494 looks like a count of
  trailer *lines* across all commit bodies, not of commits.
- **"sub-second" search over 46M segments.** The segment table, generated `tsvector`, and
  GIN index did ship (migration `0040_create_transcript_segment.sql`, 2026-06-30), but
  "sub-second" appears in the repo only as a design *target*. No measurement exists. The
  resume therefore claims the shipped structure and the measured ">60 s timeout" it
  replaced, and stops there.

(`ADR-011`'s own header still says "NOT yet implemented." That header is the stale side —
the migration landed after it was written.)
