# `resume/`

Source for the resume PDF the site serves at `/resume-tucker-miller.pdf`.

`resume.html` is the document. The PDF is generated from it **straight into `public/`**,
which is the only copy — CRA copies `public/` into `build/`, and Firebase serves that.
This directory holds the source and this note; CRA never reads it.

## Regenerate

```bash
chromium --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/resume-tucker-miller.pdf \
  file://$PWD/resume/resume.html
```

On macOS, use Chrome's binary instead:
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` with the same flags.

It used to be held to one page. Since the Opendate role was added (November 2026) it runs to
two, and that's fine. **The page count depends on the machine.** The font stack resolves to
Liberation Sans on Linux and Helvetica Neue on macOS, which is wider, so the same HTML takes
more room on a Mac. If you ever need to know whether it fits one page on Linux, render a
scratch copy with `font-family: Arial` (it has the same character widths as Liberation Sans)
rather than trusting a Mac render.

Do not keep a second copy of the PDF next to `resume.html`. There was one, and it silently
went stale, and the site served an out-of-date build for a while.

## Publishing

Push to `master`. `RESUME_URL` in `src/AppNavigation.jsx` resolves to
`PUBLIC_URL + "/resume-tucker-miller.pdf"`, so the PDF deploys with the site and the link
never encodes a date.

The resume used to live in an S3 bucket (`tuckermillerresume`) under a dated key. Nothing
references it anymore. That bucket can be emptied and deleted whenever you like — check
`aws s3 ls s3://tuckermillerresume` first in case anything else is in there.

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
| 60,492 sermons / 636 churches / 42,344 hours preserved | The stats band on the public homepage, open-sermon.com, read 2026-11-16 (it's client-rendered, so use a headless browser `--dump-dom`, not curl). Supersedes 49,779 / 634 (2026-08-19). |
| "Over 50 million" transcript segments (prose only) | **Estimate**, Tucker 2026-08-12, not shown on the public site. The corpus has grown about 21% since, so it is kept only as a lower bound and no longer appears as a stat tile. |
| 915 commits | Confirmed by Tucker 2026-08-12, superseding 804 (`git log`, 2026-07-08) |
| 58 releases | Confirmed by Tucker 2026-08-12, paired with the 915-commit count. Supersedes 59 (`git tag`, 2026-07-08). |
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
