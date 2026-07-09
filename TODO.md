# TODO — site overhaul

All nine items are done and live in `src/`. `design/` has served its purpose as the
content spec and can be deleted whenever you're ready.

| # | Item | Status |
|---|------|--------|
| 1 | Remove POC Feature tab | Done — `Proof/` deleted, route and nav entry gone |
| 2 | Update Work bullets, drop weak listings | Done — Seismic bullets now match `resume/resume.html`; four early-career entries cut |
| 3 | OpenSermon project spotlight | Done — `src/OpenSermon.jsx` + `src/assets/opensermon.css` |
| 4 | Remove OneAmerica project | Done |
| 5 | Trim Education to major/minor/institution | Done |
| 6 | Remove GitHub tab | Done — `primereact` + `chart.js` dropped |
| 7 | Remove LinkedIn tab | Done |
| 8 | Update the Resume downloader | Done — self-hosted at `public/resume-tucker-miller.pdf`, no more S3 |
| 9 | Home tab: last-12-months highlights | Done — promotion + OpenSermon |

## Notes on what shipped

**The resume is served from the site, not S3.** `RESUME_URL` is
`process.env.PUBLIC_URL + "/resume-tucker-miller.pdf"`. To update it, regenerate the PDF per
`resume/README.md` — straight into `public/`, which is the only copy. Keep it to one page.
The old `Resume+9.15.2021.pdf` S3 object still resolves but nothing links to it.

**OpenSermon figures are the reproducible ones.** Commits (915), Claude co-authored (70),
releases (58), and crawler tests (748) were counted with `git rev-list` / `grep` across
`../didactic-octo-fortnight` and `../Crawl-Churches` at their 2026-07-04 state. Earlier drafts
carried 804 / 119 / 59 / 749; the 119 conflated ~67 `claude[bot]` automation commits with model
co-authorship. The page no longer claims sub-second search latency — the segment table and GIN
index shipped in migration `0040`, but no measurement exists, only a design target.

**Mobile.** `<main>` carries `minWidth: 0`. It is a flex item, so without that it inflates to
its content's min-content width and any wide child (the pipeline, the ingest chart) stretches
the whole document instead of scrolling inside its own box. Below 640px the pipeline re-lays
out vertically and the Whisper bars stack label-over-track; the AWS diagram and ingest chart
still scroll inside their own containers, and the chart keeps its `<details>` data table as
the non-scrolling fallback.

## Still worth doing

- Delete `design/` — it's the spec, and it's been ported. Nothing builds from it.
- `Work.jsx` no longer hotlinks the Lessonly logo, but if you want a logo back, add a local
  asset under `src/assets/` rather than pointing at a third party.
- The Bowling Statistics entry has no live demo (`bowlingstats.app` doesn't resolve). Decide
  whether it earns space next to OpenSermon.
