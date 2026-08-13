# `design/` — static mockups for the site overhaul

Framework-free HTML + one stylesheet. No build step, no dependencies. Open any file
directly in a browser:

```bash
xdg-open design/index.html     # or just double-click it
```

## Why this exists

Two things were happening at once: a React 18 / MUI v5 / react-router v6 migration
across `src/`, and the content overhaul in `TODO.md`. Both touch the same files.

So the content work landed here instead — as plain HTML that settles *what each page
says* without racing the migration over *how each page is built*. These pages are the
spec. Port them into `src/` once the migration is stable; then delete this directory.

Nothing here is a build input. `firebase.json` serves `build/`, which CRA generates
from `src/`. `design/` never ships.

## TODO.md status

| # | Item | Status |
|---|------|--------|
| 1 | Remove POC tab | **Done in `src/`** (by the migration) — `Proof/` deleted, route and nav entry gone |
| 2 | Work bullets + remove weak listings | **Mocked** in `work.html` — four entries cut; *bullets still need your input* |
| 3 | OpenSermon spotlight | **Mocked** in `opensermon.html` — the big one; ingest chart is blocked, see below |
| 4 | Remove OneAmerica | **Mocked** in `projects.html` |
| 5 | Trim Education | **Mocked** in `education.html` |
| 6 | Remove GitHub tab | **Not started** — see below, it's a two-line change |
| 7 | Remove LinkedIn tab | **Not started** — same |
| 8 | Update resume downloader | **Done** — generated into `public/`, served with the site; S3 dropped |
| 9 | Home highlights | **Mocked** in `index.html` |

## Porting into `src/`

The migration introduced `src/routes.jsx` as the single source of truth for nav *and*
routing. That makes most of this trivial.

**Items 6 and 7 (remove GitHub + LinkedIn tabs)** — delete their two lines from the
`ROUTES` array, delete `src/Github.jsx` and `src/Linkedin.jsx`, and then drop
`primereact` and `chart.js` from `package.json`. I checked: `Github.jsx` is the only
file in `src/` that imports either one. With `SECONDARY_NAV` empty, the drawer's second
list and its `<Divider />` should go too.

**Item 3 (OpenSermon)** — add a `{ label: "OpenSermon", path: "/opensermon", … }` entry
and a new page component. It's the only genuinely new page.

**The rest** are content edits to `Home.jsx`, `Work.jsx`, `Projects.jsx`, and
`Education.jsx`. Copy the prose across; keep whatever styling convention each file is
already using rather than importing this stylesheet.

## Three things need a decision from you

**The promotion.** `index.html` and `work.html` say "Senior Software Engineer II" with a
start date carried over from the old entry (March 2020). I took the title from
`TODO.md`; I don't know the effective date. The live site also still says "Lessonly",
which Seismic acquired in 2021 — should it read "Lessonly by Seismic"?

**The work bullets.** Resolved — a Jira/GitHub export supplied the post-promotion work, and
`resume/resume.html` now carries it. The bullets in `work.html` below are still the old
pre-promotion ones; port them across from the resume.

**The resume (item 8).** Resolved. The PDF is generated from `resume/resume.html` into
`public/resume-tucker-miller.pdf` and served with the site. The old S3 bucket
(`tuckermillerresume`) is no longer referenced anywhere.

## What I found while doing this

**Three of the four links on the Projects page are dead.** Checked live:
`bowlingstats.app` doesn't resolve, `api-tuckermillerdev-staging.herokuapp.com` returns
404 (Heroku killed free dynos in Nov 2022), and `oneamerica.tuckermillerdev.com` doesn't
resolve. Only the GitHub repo is up. Removing OneAmerica takes care of two of them; the
bowling entry now links to GitHub only. Worth asking whether a project with no live demo
still earns space next to OpenSermon.

**The OneAmerica card published working credentials** (`Username: 1234 / Password: 1234`)
on a public page. Both hosts are dead, so nothing is exposed today. Deleting the card
closes it out.

**`Work.jsx` hotlinks the Lessonly logo from `betterbuys.com`**, a third-party blog. It
renders today and will 404 without warning whenever they reorganize. I dropped the image
from the mockup rather than reproduce the problem.

## The OpenSermon page, specifically

Every number on `opensermon.html` came from reading `../didactic-octo-fortnight` and
`../Crawl-Churches`, and each section names its source. The load-bearing ones:

- **48,901 sermons / 634 churches** — reported by Tucker 2026-08-12. Supersedes the July 2026
  admin Data Pipeline figure (40,646 of 41,865) and ADR-011's 38,848 / 615 (2026-06-24).
- **~46.3M transcript segments** — ADR-011, 2026-06-24. **Stale:** measured against a 38,848-sermon
  corpus, so it understates the current segment count. Re-measure before reusing.
- **The >60s → sub-second query** — also ADR-011. Unnesting 46M JSON elements timed out;
  a flattened segment table with a GIN-indexed generated `tsvector` fixed it for ~5–15 GB
  of disk.
- **Whisper benchmark** — `benchmark-report.md`, run 2026-05-17 on an RTX 3070 Ti. The
  real-time factors (48.3× / 44.7× / 26.9× / 18.0×) are verbatim. The story that the
  *slowest* model won on blind quality grading comes from `benchmark-quality.md`.
- **Cost comparison** — `context/aws/s3-egress-and-onprem-gpu-cost-analysis.md`.
- **804 commits, 494 Claude co-authored, 59 releases** — `git log`, through 2026-07-08.

Three claims I deliberately avoided, because the repos contradict themselves and the
stale side is more prominent: the job queue is **SQS**, not the Redis that `README.md`
still advertises; auth is **Cognito**, not the Auth0 that `CLAUDE.md` still names (it was
replaced in #215); and `family-tree.mmd` is a biblical genealogy diagram, not
infrastructure.

### The AWS architecture diagram

There is no "standardized ER diagram" for AWS components, because ER is the wrong
formalism — entity-relationship models describe data entities and cardinality, not
infrastructure topology. (OpenSermon already *has* a real ER diagram: `database.mmd`, a
Mermaid `erDiagram` over ~25 tables. That one's about the database.)

The de facto standard for infra is **AWS Architecture Icons** plus a diagram-as-code
tool. Worth knowing before you reach for them: the icons are **not open source**. The
`awslabs/aws-icons-for-plantuml` repo is MIT for its *code* but ships the icons under
**CC-BY-ND 2.0** — no derivatives — and AWS's trademark guidelines separately forbid
modifying them or implying endorsement. Fine for a whitepaper; awkward on a personal
site. So the diagram on `opensermon.html` uses generic colored glyphs following AWS's
*layout* convention (Region → VPC → AZ → subnet nesting, dashed subnet borders, service
category colors) without any AWS trademark.

If you want icons anyway, the real options:

| Tool | License | Notes |
|---|---|---|
| [`cfn-diagram`](https://github.com/ljacobsson/cfn-diagram) | MIT | **Generates from your CloudFormation.** Outputs draw.io, Mermaid, ASCII, visjs. Filters resource types so you can hide IAM noise. |
| [`awslabs/aws-icons-for-plantuml`](https://github.com/awslabs/aws-icons-for-plantuml) | MIT code / CC-BY-ND icons | Ships `dist/aws-icons-mermaid.json` for Mermaid `architecture-beta`. |
| [`mingrammer/diagrams`](https://github.com/mingrammer/diagrams) | MIT | Python, diagram-as-code, renders via Graphviz. |
| [D2](https://d2lang.com) | MPL-2.0 | Has an AWS shape library. |
| draw.io / diagrams.net | Apache-2.0 | AWS19/AWS25 shape libraries built in. |

`cfn-diagram` is the one that actually fits you, because the source of truth is already
eleven CloudFormation templates. `npx @mhlabs/cfn-diagram draw.io -t templates/root.yml`
gets you a diagram that can't drift from the infrastructure. A hand-drawn diagram is a
lie waiting to happen.

**The current diagram is hand-authored but parsed from source, not from memory.** I read
`templates/stacks/*.yml` — 102 resources across 11 stacks — and the diagram reflects what
they actually declare. That process corrected four things I'd originally written from the
research summary: both ECS services autoscale (not just the API); there are 2 queues + 2
DLQs, not 4 queues; the jobs queue is FIFO and the transcribe queue is standard; and
there is **no NAT Gateway at all** — Fargate tasks run in public subnets with public IPs
and locked-down security groups, which `worker.yml` explains in a comment. That last one
is the most interesting thing in the whole stack and the original section missed it
entirely.

### The ingest chart

Built, from `admin-data-pipeline.html` — a saved render of the production admin Data
Pipeline page. The weekly series was recovered by decoding the Highcharts SVG path
coordinates against the y-axis scale (plot area 224px ≈ 20,000 sermons), so the bar values
carry roughly **±100**. The corpus totals in the stat tiles are exact, because those were
rendered as text. Both facts are stated on the page.

If you'd rather have exact weekly numbers than pixel-derived ones:

```sql
SELECT date_trunc('week', created_at) AS week, count(*) AS sermons
FROM sermon GROUP BY 1 ORDER BY 1;
```

**It is not a ramp, and that's the point.** Ingest sits near zero for weeks, then steps:
the week of Jun 15 brought ~16,200 sermons, 46% of the entire twelve-week window. Two
subtler things the chart exposes — the week of May 11 ingested nothing but transcribed
~4,400 (backlog draining), and Jun 15 *analyzed* ~18,000 while ingesting ~16,200 (LLM
analysis catching up). Ingest, transcription, and analysis are decoupled queues running at
different speeds, and you can see it.

The chart is inline SVG, no JS and no chart library, themed for light and dark. Colors were
run through the dataviz palette validator (light `#2a78d6`/`#1a4f95`, dark
`#2b6ab5`/`#4d95e8`) — both modes pass the lightness-band, chroma, CVD-separation, and
contrast checks. Peak bar is direct-labeled so the emphasis isn't color-alone, and there's a
`<details>` data table for screen readers.

### Don't call 7,072 a backlog of failures

The admin page's "Stuck & failed backlog" panel footers `50 of 7072`, but that's the count
on the **All** tab, and the tabs are All / Not started / Stuck / Failed. 7,072 is everything
not yet fully processed, and it decomposes exactly:

```
41,865 total − 40,646 transcribed =  1,219  (no transcript yet)
40,646 transcribed − 34,793 analyzed =  5,853  (awaiting LLM analysis)
                                       ─────
                                        7,072
```

So it's a queue tail, not a failure pile. The actually-stuck and actually-failed counts are
on the other tabs and aren't in the saved render — **don't state them.** The page now reports
1,219 awaiting transcription and 5,853 awaiting analysis, and says both drain on their own.

### One thing the admin page forced me to correct

The transcription section originally implied the GPU Whisper pool transcribed the corpus.
It didn't. **Whisper produced 2,197 transcripts — 5%.** YouTube auto-captions produced 65%,
and 29% predate model tracking. The Whisper benchmark work is real and it governs the
*upload* path, but the archive reached 40,000 sermons mostly by reading captions, which is
the cheaper decision. The page now says so plainly. It's a better engineering story than the
one I had, and it has the advantage of being true.
