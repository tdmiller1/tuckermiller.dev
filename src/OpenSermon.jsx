import React from "react";
import "./assets/opensermon.css";

export class OpenSermon extends React.Component {
  render() {
    return (
      <div className="os-page">
        <h1>OpenSermon</h1>
        <p className="lede">
          An open archive of sermons &mdash; searchable, accessible, and preserved over time.
          Two repositories: a distributed crawler that finds and transcribes sermon media, and a
          web app that makes 46 million transcript segments searchable from a single indexed lookup.
        </p>

        <p className="site-link">
          <a href="https://open-sermon.com" target="_blank" rel="noopener noreferrer">
            Visit open-sermon.com &rarr;
          </a>
        </p>

        <div className="stats">
          <div className="stat"><span className="n">40,646</span><span className="l">sermons transcribed</span></div>
          <div className="stat"><span className="n">615</span><span className="l">churches</span></div>
          <div className="stat"><span className="n">46.3M</span><span className="l">transcript segments</span></div>
          <div className="stat"><span className="n">915</span><span className="l">commits in 5 months</span></div>
        </div>
        <p className="small src">
          Transcript count from the production admin dashboard, July 2026. Churches and segment count
          measured 2026-06-24 (ADR-011). Commits across both repositories, 2026-02-02 &rarr; 2026-07-04.
        </p>

        {/* ============ PIPELINE ============ */}
        <h2>How a sermon gets here</h2>
        <p>
          Six stages, each an independent worker that claims jobs from a Postgres-backed queue via a
          FastAPI control plane. Workers never touch the database or credentials directly &mdash; they
          claim, do one thing, and report back. A stage can fail without stalling the others.
        </p>

        <div className="pipeline">
          <div className="pipeline-track">
            <div className="stage">
              <div className="dot">&#128269;</div>
              <div className="name">Discover</div>
              <div className="desc">Check robots.txt, then find the church&rsquo;s sermon page</div>
            </div>
            <div className="stage">
              <div className="dot">&#129527;</div>
              <div className="name">Extract</div>
              <div className="desc">Registry routes to a generic or site-specific scraper</div>
            </div>
            <div className="stage">
              <div className="dot">&#128279;</div>
              <div className="name">Resolve</div>
              <div className="desc">Turn Vimeo / iframe embeds into real media URLs</div>
            </div>
            <div className="stage">
              <div className="dot">&#11015;</div>
              <div className="name">Acquire</div>
              <div className="desc">Stream, hash in flight, PUT to object storage</div>
            </div>
            <div className="stage">
              <div className="dot">&#127908;</div>
              <div className="name">Transcribe</div>
              <div className="desc">Whisper on a dedicated GPU worker pool</div>
            </div>
            <div className="stage">
              <div className="dot">&#128228;</div>
              <div className="name">Push</div>
              <div className="desc">Ingest into OpenSermon, ledger every upload</div>
            </div>
          </div>
          <div className="pipeline-flow">
            <span className="packet"></span><span className="packet"></span><span className="packet"></span>
          </div>
        </div>

        <h3>The parts that were actually hard</h3>

        <div className="grid">
          <div className="card">
            <h3>Politeness is structural, not optional</h3>
            <p className="small">
              Stage 1 gates on <code>robots.txt</code> before anything else runs. A block records a{" "}
              <code>hard_fail</code> and the chain stops &mdash; there is no code path that scrapes a
              site that said no.
            </p>
          </div>
          <div className="card">
            <h3>YouTube is never downloaded</h3>
            <p className="small">
              Downloading YouTube media violates their terms, so the pipeline refuses. YouTube churches
              route to a separate caption-fetch stage that reads the auto-generated captions instead.
            </p>
          </div>
          <div className="card">
            <h3>Deduplication by identity, not URL</h3>
            <p className="small">
              Records key on <code>asset_key = hash(church_id, date, pastor, title)</code>, and bytes key
              on <code>content_hash</code>. A church that reshuffles its URLs doesn&rsquo;t produce a
              duplicate archive.
            </p>
          </div>
          <div className="card">
            <h3>The weekly tick runs Tuesday, on purpose</h3>
            <p className="small">
              Sermons upload Sunday. YouTube&rsquo;s auto-captioning takes about a day. So the crawl fires
              Tuesday 04:00 UTC, with a Thursday retry pass, and treats a missing caption as retryable for
              seven days before giving up.
            </p>
          </div>
        </div>

        {/* ============ SELECTION FUNNEL ============ */}
        <h2>Choosing 600 churches out of 102,079</h2>
        <p>
          The candidate pool is every church Google Places knows about. Picking which ones to crawl is a
          sampling problem with a hard constraint: a church whose videos have no captions is worthless to
          the archive, and you only find that out by trying.
        </p>

        <div className="stats">
          <div className="stat"><span className="n">102,079</span><span className="l">candidate churches</span></div>
          <div className="stat"><span className="n">2,619</span><span className="l">trial crawls run</span></div>
          <div className="stat"><span className="n">600</span><span className="l">accepted</span></div>
          <div className="stat"><span className="n">23%</span><span className="l">acceptance rate</span></div>
        </div>

        <p>
          Each candidate gets exactly one shot: a ten-video trial crawl. If more than 70% of those videos
          come back without captions, it&rsquo;s rejected and never re-drawn &mdash; the ledger is
          append-only, so the sample stays honest. The cap is 100 accepted churches per state across six
          Midwest states (Ohio, Michigan, Kentucky, Illinois, Indiana, Wisconsin), and all six filled.
        </p>

        {/* ============ TRANSCRIPTION ============ */}
        <h2>Picking a Whisper model</h2>
        <p>
          Four models, three real sermons (37&ndash;73 minutes), one RTX 3070&nbsp;Ti. The metric is
          real-time factor &mdash; how many minutes of audio you transcribe per minute of wall clock.
          Higher is faster.
        </p>

        <div className="bars">
          <div className="bar-row">
            <span>distil-whisper-small.en</span>
            <span className="track"><span className="fill" style={{ width: "100%" }}></span></span>
            <span className="val">48.3&times;</span>
          </div>
          <div className="bar-row">
            <span>distil-whisper-medium.en</span>
            <span className="track"><span className="fill" style={{ width: "92.6%" }}></span></span>
            <span className="val">44.7&times;</span>
          </div>
          <div className="bar-row">
            <span>faster-whisper-small</span>
            <span className="track"><span className="fill" style={{ width: "55.8%" }}></span></span>
            <span className="val">26.9&times;</span>
          </div>
          <div className="bar-row best">
            <span>faster-whisper-medium</span>
            <span className="track"><span className="fill" style={{ width: "37.3%" }}></span></span>
            <span className="val">18.0&times;</span>
          </div>
        </div>

        <p>
          <strong>The slowest model won.</strong> A blind A/B/C/D quality ranking &mdash; run headlessly
          through Claude Code so the grader never saw which model produced which transcript &mdash; put{" "}
          <code>faster-whisper-medium</code> first on all three sermons. The distilled models were roughly
          2.5&times; faster and noticeably more prone to repetition-loop hallucinations, which is exactly
          the failure mode that poisons a searchable archive. Speed you can buy with another GPU;
          a hallucinated Bible reference you cannot take back.
        </p>
        <p className="small src">benchmark-report.md &middot; benchmark-quality.md &middot; run 2026-05-17, faster-whisper 1.2.1</p>

        <p>
          Production runs <code>Systran/faster-distil-whisper-large-v3</code> on a GPU-only worker pool,
          with a two-hour duration guard: anything longer is marked <code>oversize</code> and handed off
          rather than allowed to occupy a GPU indefinitely. The GPU compose service pins{" "}
          <code>DEVICE=cuda</code> so a broken passthrough fails loudly instead of silently falling back
          to a 10&times;-slower CPU path.
        </p>

        {/* ============ DB ============ */}
        <h2>The query that took ten minutes</h2>
        <p>
          Transcripts arrived as a JSON array of segments on each row. Fine for reading one sermon. But
          &ldquo;how often is this phrase preached across every church?&rdquo; means unnesting 46.3 million
          JSON elements, and Postgres cannot index inside a JSON blob.
        </p>

        <div className="ba">
          <div className="before">
            <div className="lbl">Before &mdash; unnest JSON at query time</div>
            <div className="v">&gt; 60 s</div>
            <p className="small" style={{ margin: 0 }}>
              Timed out. Realistically 3&ndash;10+ minutes across all churches. A single church
              (~2.4M segments) already took ~10 s.
            </p>
          </div>
          <div className="after">
            <div className="lbl">After &mdash; segment table + GIN index</div>
            <div className="v">indexed lookup</div>
            <p className="small" style={{ margin: 0 }}>
              Flattened to one row per segment with a generated <code>tsvector</code> STORED column and a
              GIN index. Costs ~5&ndash;15 GB. Shipped in migration <code>0040</code>; end-to-end latency
              not yet measured.
            </p>
          </div>
        </div>

        <p>
          That&rsquo;s the trade the whole search feature rests on: spend disk, buy latency. The same move
          happens one level up &mdash; search v0.3 replaced an in-memory Python regex scan (hard-capped at
          1,000 sermons, which silently dropped the newest results) with Postgres full-text search using{" "}
          <code>tsquery</code> and <code>ts_rank</code>. Targets: p50 under 500&nbsp;ms for a single
          keyword across the full corpus, p95 under 1&nbsp;s for a three-term boolean query.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Materialized view</h3>
            <p className="small"><code>sermon_analytics</code>, refreshed <code>CONCURRENTLY</code> so
            dashboards never block on a rebuild.</p>
          </div>
          <div className="card">
            <h3>Trigger-maintained tsvector</h3>
            <p className="small">A <code>BEFORE INSERT/UPDATE</code> trigger keeps the search column current;
            no application code can forget to update it.</p>
          </div>
          <div className="card">
            <h3>40 + 20 migrations</h3>
            <p className="small">Forty sequential SQL migrations in the app, twenty Alembic revisions in the
            crawler. Every schema change is reviewable and reversible.</p>
          </div>
        </div>

        {/* ============ ARCHITECTURE ============ */}
        <h2>AWS architecture</h2>
        <p>
          Eleven CloudFormation stacks, composed by a root template. Staging and production share one RDS
          instance with separate logical databases; everything else is parameterized per environment.
        </p>

        {/* Glyph sprite for the flow diagram's tiles. Symbols carry geometry only;
            stroke and stroke-width are inherited from the <use> that references them. */}
        <svg className="os-sprite" aria-hidden="true" focusable="false">
          <defs>
            <symbol id="os-i-globe" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8.4" />
              <path d="M3.6 12h16.8" />
              <path d="M12 3.6c2.2 2.3 3.4 5.3 3.4 8.4s-1.2 6.1-3.4 8.4c-2.2-2.3-3.4-5.3-3.4-8.4s1.2-6.1 3.4-8.4z" />
            </symbol>
            <symbol id="os-i-compute" viewBox="0 0 24 24">
              <path d="M12 3.4 20.3 7.7v8.6L12 20.6 3.7 16.3V7.7z" />
              <path d="M3.7 7.7 12 12l8.3-4.3" />
              <path d="M12 12v8.6" />
            </symbol>
            <symbol id="os-i-queue" viewBox="0 0 24 24">
              <rect x="3.6" y="4.6" width="16.8" height="4.2" rx="1.3" />
              <rect x="3.6" y="10.3" width="16.8" height="4.2" rx="1.3" />
              <rect x="3.6" y="16" width="16.8" height="4.2" rx="1.3" />
            </symbol>
            <symbol id="os-i-chip" viewBox="0 0 24 24">
              <rect x="6.6" y="6.6" width="10.8" height="10.8" rx="1.6" />
              <rect x="9.9" y="9.9" width="4.2" height="4.2" rx="0.8" />
              <path d="M9.6 6.6V3.5M14.4 6.6V3.5M9.6 20.5v-3.1M14.4 20.5v-3.1M6.6 9.6H3.5M6.6 14.4H3.5M20.5 9.6h-3.1M20.5 14.4h-3.1" />
            </symbol>
            <symbol id="os-i-shield" viewBox="0 0 24 24">
              <path d="M12 3.3 19.5 6v6c0 4.3-3.1 7.5-7.5 8.6C7.6 19.5 4.5 16.3 4.5 12V6z" />
              <path d="m9.2 12.1 2 2 3.6-3.9" />
            </symbol>
            <symbol id="os-i-key" viewBox="0 0 24 24">
              <circle cx="9" cy="9.4" r="4.2" />
              <path d="m12 12.4 8.4 8.4M17.6 18l1.9-1.9M14.8 15.2l1.9-1.9" />
            </symbol>
            <symbol id="os-i-db" viewBox="0 0 24 24">
              <ellipse cx="12" cy="6.3" rx="7.4" ry="2.9" />
              <path d="M4.6 6.3v11.4c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9V6.3" />
              <path d="M19.4 12c0 1.6-3.3 2.9-7.4 2.9S4.6 13.6 4.6 12" />
            </symbol>
            <symbol id="os-i-lb" viewBox="0 0 24 24">
              <circle cx="12" cy="4.9" r="2.3" />
              <circle cx="4.9" cy="19.1" r="2.3" />
              <circle cx="19.1" cy="19.1" r="2.3" />
              <path d="M12 7.2v4.6M4.9 16.8v-5h14.2v5" />
            </symbol>
            <symbol id="os-i-store" viewBox="0 0 24 24">
              <path d="M4.9 5.6h14.2l-1.7 13a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" />
              <path d="M3.6 5.6h16.8" />
            </symbol>
            <symbol id="os-i-users" viewBox="0 0 24 24">
              <circle cx="8.8" cy="8.2" r="3.4" />
              <path d="M2.8 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              <circle cx="17" cy="9.6" r="2.7" />
              <path d="M15.2 14.4c3 .2 5.4 2.7 5.4 5.6" />
            </symbol>
          </defs>
        </svg>

        <div className="aws">
          <p className="chart-title">Ingest and serve path</p>
          <p className="chart-sub">Numbered steps are described below the diagram.</p>

          <div className="flow">
            <svg viewBox="0 0 1052 392" role="img" aria-labelledby="os-flow-t os-flow-d">
              <title id="os-flow-t">How a sermon moves through the AWS account</title>
              <desc id="os-flow-d">
                The API enqueues a job on a FIFO SQS queue. A Fargate worker claims it, pulls the video
                from YouTube, and delegates transcription to an on-prem GPU by way of a second, standard
                queue. That GPU posts the transcript back to the FastAPI service, which writes segments to
                RDS PostgreSQL; readers search that index through the load balancer. Media the worker
                stored in S3 reaches readers as presigned URLs.
              </desc>

              <defs>
                <linearGradient id="os-g-compute" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f58536" /><stop offset="1" stopColor="#e1690b" />
                </linearGradient>
                <linearGradient id="os-g-store" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9bc53d" /><stop offset="1" stopColor="#6e9414" />
                </linearGradient>
                <linearGradient id="os-g-db" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#d858de" /><stop offset="1" stopColor="#b01fb8" />
                </linearGradient>
                <linearGradient id="os-g-net" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a47bff" /><stop offset="1" stopColor="#7b39ff" />
                </linearGradient>
                <linearGradient id="os-g-int" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f0479a" /><stop offset="1" stopColor="#d5006e" />
                </linearGradient>
                <linearGradient id="os-g-sec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e8616f" /><stop offset="1" stopColor="#ce2438" />
                </linearGradient>
                <linearGradient id="os-g-ext" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8a93a1" /><stop offset="1" stopColor="#5b6472" />
                </linearGradient>
                <marker id="os-arrow" viewBox="0 0 10 8" refX="9" refY="4"
                        markerWidth="10" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
                  <path d="M0 0 10 4 0 8z" fill="#59636e" />
                </marker>
              </defs>

              <rect className="frame" x="6" y="6" width="1040" height="380" rx="16" />

              {/* ---- edges ---- */}
              <path className="edge" d="M90 196H164" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M224 196H298" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M358 196H432" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M492 196H566" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M626 196H700" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M760 196H834" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M894 196H966" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M196 128V164" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M534 128 578 164" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M650 128 618 164" markerEnd="url(#os-arrow)" />
              {/* media branch: the worker stores media, readers fetch it presigned */}
              <path className="edge" d="M196 264v36h370" markerEnd="url(#os-arrow)" />
              <path className="edge" d="M626 300h320V214h20" markerEnd="url(#os-arrow)" />

              {/* ---- spine ---- */}
              <rect className="tile" x="34" y="168" width="56" height="56" rx="7" fill="url(#os-g-int)" />
              <use href="#os-i-queue" x="49" y="183" width="26" height="26" />
              <text className="l1" x="62" y="242" textAnchor="middle">SQS jobs.fifo</text>
              <text className="l2" x="62" y="254" textAnchor="middle">ordered, 3 retries</text>

              <rect className="tile" x="168" y="168" width="56" height="56" rx="7" fill="url(#os-g-compute)" />
              <use href="#os-i-compute" x="183" y="183" width="26" height="26" />
              <text className="l1" x="196" y="242" textAnchor="middle">Fargate worker</text>
              <text className="l2" x="196" y="254" textAnchor="middle">ECS, autoscaled</text>

              <rect className="tile" x="302" y="168" width="56" height="56" rx="7" fill="url(#os-g-int)" />
              <use href="#os-i-queue" x="317" y="183" width="26" height="26" />
              <text className="l1" x="330" y="242" textAnchor="middle">SQS</text>
              <text className="l2" x="330" y="254" textAnchor="middle">transcribe-remote</text>

              <rect className="tile" x="436" y="168" width="56" height="56" rx="7" fill="url(#os-g-ext)" />
              <use href="#os-i-chip" x="451" y="183" width="26" height="26" />
              <text className="l1" x="464" y="242" textAnchor="middle">On-prem GPU</text>
              <text className="l2" x="464" y="254" textAnchor="middle">faster-whisper</text>

              <rect className="tile" x="570" y="168" width="56" height="56" rx="7" fill="url(#os-g-compute)" />
              <use href="#os-i-compute" x="585" y="183" width="26" height="26" />
              <text className="l1" x="598" y="242" textAnchor="middle">Fargate api</text>
              <text className="l2" x="598" y="254" textAnchor="middle">FastAPI</text>

              <rect className="tile" x="704" y="168" width="56" height="56" rx="7" fill="url(#os-g-db)" />
              <use href="#os-i-db" x="719" y="183" width="26" height="26" />
              <text className="l1" x="732" y="242" textAnchor="middle">RDS</text>
              <text className="l2" x="732" y="254" textAnchor="middle">PostgreSQL 15</text>

              <rect className="tile" x="838" y="168" width="56" height="56" rx="7" fill="url(#os-g-net)" />
              <use href="#os-i-lb" x="853" y="183" width="26" height="26" />
              <text className="l1" x="866" y="242" textAnchor="middle">ALB</text>
              <text className="l2" x="866" y="254" textAnchor="middle">HTTPS listener</text>

              {/* ---- feeders ---- */}
              <rect className="tile" x="168" y="34" width="56" height="56" rx="7" fill="url(#os-g-ext)" />
              <use href="#os-i-globe" x="183" y="49" width="26" height="26" />
              <text className="l1" x="196" y="108" textAnchor="middle">YouTube</text>
              <text className="l2" x="196" y="120" textAnchor="middle">video + captions</text>

              <rect className="tile" x="506" y="34" width="56" height="56" rx="7" fill="url(#os-g-sec)" />
              <use href="#os-i-shield" x="521" y="49" width="26" height="26" />
              <text className="l1" x="534" y="108" textAnchor="middle">Cognito</text>
              <text className="l2" x="534" y="120" textAnchor="middle">Google / Facebook</text>

              <rect className="tile" x="622" y="34" width="56" height="56" rx="7" fill="url(#os-g-sec)" />
              <use href="#os-i-key" x="637" y="49" width="26" height="26" />
              <text className="l1" x="650" y="108" textAnchor="middle">Secrets Manager</text>
              <text className="l2" x="650" y="120" textAnchor="middle">&amp; SSM</text>

              {/* ---- media branch ---- */}
              <rect className="tile" x="570" y="272" width="56" height="56" rx="7" fill="url(#os-g-store)" />
              <use href="#os-i-store" x="585" y="287" width="26" height="26" />
              <text className="l1" x="598" y="346" textAnchor="middle">S3 &mdash; media</text>
              <text className="l2" x="598" y="358" textAnchor="middle">presigned URLs</text>

              {/* ---- reader ---- */}
              <use className="actor" href="#os-i-users" x="974" y="170" width="52" height="52" />
              <text className="l1" x="1000" y="240" textAnchor="middle">Readers</text>

              {/* ---- step badges ---- */}
              <g className="bdg-g">
                <rect className="bdg" x="119.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="127" y="183" textAnchor="middle">1</text>
                <rect className="bdg" x="204" y="138" width="15" height="15" rx="2.5" />
                <text className="bnum" x="211.5" y="149" textAnchor="middle">2</text>
                <rect className="bdg" x="253.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="261" y="183" textAnchor="middle">3</text>
                <rect className="bdg" x="387.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="395" y="183" textAnchor="middle">4</text>
                <rect className="bdg" x="521.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="529" y="183" textAnchor="middle">5</text>
                <rect className="bdg" x="584.5" y="133" width="15" height="15" rx="2.5" />
                <text className="bnum" x="592" y="144" textAnchor="middle">6</text>
                <rect className="bdg" x="655.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="663" y="183" textAnchor="middle">7</text>
                <rect className="bdg" x="789.5" y="172" width="15" height="15" rx="2.5" />
                <text className="bnum" x="797" y="183" textAnchor="middle">8</text>
                <rect className="bdg" x="204" y="270" width="15" height="15" rx="2.5" />
                <text className="bnum" x="211.5" y="281" textAnchor="middle">9</text>
                <rect className="bdg" x="777" y="276" width="19" height="15" rx="2.5" />
                <text className="bnum" x="786.5" y="287" textAnchor="middle">10</text>
              </g>
            </svg>
          </div>

          <ol className="steps">
            <li>An ingest route on the API enqueues a job &mdash; <code>IngestChannel</code>,{" "}
              <code>ProcessVideo</code>, <code>TranscribeMedia</code> &mdash; on{" "}
              <code>open-sermon-jobs.fifo</code>, and records it in the DynamoDB ledger. A Fargate worker
              long-polls the queue.</li>
            <li>The worker resolves the church&rsquo;s YouTube channel, takes the captions when they exist,
              and otherwise downloads the media to S3.</li>
            <li>When no captions exist, <code>TranscribeMedia</code> picks a provider. Choosing{" "}
              <code>remote_whisper</code> publishes the job to <code>transcribe-remote</code>, a standard
              queue with a one-hour visibility timeout.</li>
            <li>The on-prem GPU box long-polls that queue under a scoped IAM user, pulls the audio from S3,
              and runs faster-whisper &mdash; extending the visibility timeout by heartbeat while it works.</li>
            <li>It POSTs the transcript to the API&rsquo;s internal callback, then deletes the message.</li>
            <li>Cognito authorizes browser traffic; SSM and Secrets Manager supply config and the database
              password. Nothing holds a long-lived secret.</li>
            <li>The API writes transcript segments to RDS Postgres, where a trigger keeps the{" "}
              <code>tsvector</code> current.</li>
            <li>Readers&rsquo; search queries reach that index through the load balancer&rsquo;s HTTPS
              listener.</li>
            <li>Media the worker downloaded stays in the private media bucket.</li>
            <li>To play a sermon, the API hands the browser a presigned S3 URL, good for an hour. The
              bucket itself is never public.</li>
          </ol>
        </div>

        <h3>Where it all lives</h3>

        <div className="aws">

          <div className="zone">
            <span className="zone-label">AWS Region</span>

            <div className="group">
              <span className="group-label">Edge &amp; identity</span>
              <div className="nodes">
                <span className="node"><i className="g net"></i>CloudFront + OAC</span>
                <span className="node"><i className="g store"></i>S3 &mdash; SPA bundle</span>
                <span className="node"><i className="g sec"></i>Cognito &mdash; Google / Facebook IdP</span>
                <span className="node"><i className="g compute"></i>3 &times; &lambda; Cognito trigger</span>
              </div>
            </div>

            <div className="group">
              <span className="group-label">Queues, state &amp; images</span>
              <div className="nodes">
                <span className="node"><i className="g int"></i><span>SQS jobs<span className="dim">.fifo</span></span></span>
                <span className="node"><i className="g int"></i>SQS transcribe-remote</span>
                <span className="node"><i className="g int"></i>2 &times; DLQ</span>
                <span className="node"><i className="g db"></i>DynamoDB job-ledger</span>
                <span className="node"><i className="g store"></i>S3 &mdash; media, pg-dumps, transcribe</span>
                <span className="node"><i className="g compute"></i>3 &times; ECR</span>
              </div>
            </div>

            <div className="group">
              <span className="group-label">Ops &amp; secrets</span>
              <div className="nodes">
                <span className="node"><i className="g ops"></i>9 &times; CloudWatch alarm</span>
                <span className="node"><i className="g int"></i>SNS</span>
                <span className="node"><i className="g sec"></i>SSM Parameter Store</span>
                <span className="node"><i className="g sec"></i>Secrets Manager</span>
                <span className="node"><i className="g sec"></i>IAM OIDC &larr; GitHub Actions</span>
              </div>
            </div>

            <div className="zone vpc">
              <span className="zone-label">VPC 10.0.0.0/16</span>

              <div className="nodes" style={{ marginBottom: "12px" }}>
                <span className="node"><i className="g net"></i>Internet Gateway</span>
                <span className="node"><i className="g net"></i>ALB (internet-facing, 2 listeners)</span>
              </div>

              <div className="azs">
                <div className="zone az">
                  <span className="zone-label">Availability Zone A</span>
                  <div className="zone public">
                    <span className="zone-label">Public 10.0.0.0/24</span>
                    <div className="nodes">
                      <span className="node"><i className="g compute"></i>Fargate api</span>
                      <span className="node"><i className="g compute"></i>Fargate worker</span>
                      <span className="node"><i className="g compute"></i>Bastion t4g.nano</span>
                    </div>
                  </div>
                  <div className="zone private">
                    <span className="zone-label">Private 10.0.10.0/24</span>
                    <div className="nodes">
                      <span className="node"><i className="g db"></i>RDS PostgreSQL 15</span>
                    </div>
                  </div>
                </div>

                <div className="zone az">
                  <span className="zone-label">Availability Zone B</span>
                  <div className="zone public">
                    <span className="zone-label">Public 10.0.1.0/24</span>
                    <div className="nodes">
                      <span className="node"><i className="g compute"></i>Fargate api</span>
                      <span className="node"><i className="g compute"></i>Fargate worker</span>
                    </div>
                  </div>
                  <div className="zone private">
                    <span className="zone-label">Private 10.0.11.0/24</span>
                    <div className="nodes">
                      <span className="node dim"><i className="g db"></i>DB subnet group</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="zone external" style={{ marginBottom: 0 }}>
            <span className="zone-label">Off-AWS</span>
            <div className="nodes">
              <span className="node"><i className="g ext"></i>On-prem GPU Whisper worker</span>
              <span className="node"><i className="g ext"></i>Stripe webhooks (HMAC-SHA256)</span>
            </div>
            <p className="flow-note">
              The GPU box holds an IAM user&rsquo;s credentials, long-polls{" "}
              <code>transcribe-remote</code>, pulls audio from S3, and posts transcripts back to the API.
              It is the only part of the system AWS does not run.
            </p>
          </div>

          <div className="legend">
            <span><i className="g compute"></i>Compute</span>
            <span><i className="g store"></i>Storage</span>
            <span><i className="g db"></i>Database</span>
            <span><i className="g net"></i>Networking</span>
            <span><i className="g int"></i>Messaging</span>
            <span><i className="g sec"></i>Identity &amp; security</span>
            <span><i className="g ops"></i>Management &amp; ops</span>
            <span><i className="g ext"></i>Off-AWS</span>
          </div>
        </div>

        <h3>Three decisions the diagram encodes</h3>

        <p>
          <strong>There is no NAT Gateway.</strong> A NAT Gateway costs roughly $32/month per
          availability zone before it passes a single byte, which is real money against an $81/month
          egress bill. So the Fargate tasks run in <em>public</em> subnets with public IPs &mdash; that&rsquo;s
          how they reach ECR, SQS, and SSM without one. Inbound is still closed: the worker&rsquo;s security
          group has no ingress rules at all, and the API only accepts traffic from the load balancer. The
          database stays in private subnets with <code>PubliclyAccessible: false</code>. It&rsquo;s a
          deliberate cost trade, and the template says so in a comment that names the exit path &mdash;
          private subnets plus NAT or VPC endpoints, once the bill justifies it.
        </p>

        <p>
          <strong>The job queue is FIFO; the transcription queue isn&rsquo;t.</strong>
          <code>open-sermon-jobs.fifo</code> enforces ordering and exactly-once delivery because pipeline
          stages must not run twice or out of sequence. <code>transcribe-remote</code> is a standard
          queue &mdash; transcription is idempotent and keyed by content hash, so a duplicate delivery
          costs GPU time and nothing else. Both have dead-letter queues.
        </p>

        <p>
          <strong>Nothing holds a long-lived secret.</strong> Config resolves from SSM Parameter Store,
          the database password is fetched from Secrets Manager per connection rather than baked into a
          task definition, and CI deploys through an IAM OIDC provider instead of a stored access key.
          The one exception is the on-prem GPU worker, which cannot assume a role from outside AWS and so
          carries an IAM user&rsquo;s credentials scoped to exactly two queues and one bucket.
        </p>

        <p>
          Both ECS services autoscale on CPU, and the worker ships with a <strong>deployment circuit
          breaker</strong> &mdash; a bad task definition rolls itself back rather than draining the queue
          into a crash loop.
        </p>

        <p className="small src">
          Diagrams derived from <code>templates/stacks/*.yml</code> (11 CloudFormation stacks, 102
          resources). Category colors follow AWS&rsquo;s, but the icons are drawn here: the official AWS
          Architecture Icons are CC-BY-ND and trademarked, which makes them a poor fit for a personal site.
        </p>

        <h3>Why not just use AWS Transcribe?</h3>
        <p>
          Because it costs 50&ndash;100&times; more. At 20,000 sermons/month, managed transcription runs
          about <strong>$17,000/mo</strong> against roughly <strong>$81/mo</strong> in S3 egress for the
          self-hosted GPU path. At the 100,000/month goal the gap is $58,000 versus $441. Egress works out
          to $0.0045 per sermon.
        </p>

        {/* ============ PAGE LAYOUTS ============ */}
        <h2>The web app</h2>
        <p>React 18 + Vite + Tailwind, backed by 73 route modules on a FastAPI service.</p>

        <div className="grid">
          <div className="card">
            <h3>Browse &amp; discover</h3>
            <p className="small">A national church map rendered on canvas with pin and state-bubble layers,
            denomination filtering, a people index, and a cross-church comparison view for scripture,
            themes, and political salience.</p>
          </div>
          <div className="card">
            <h3>Search</h3>
            <p className="small">Full-text and boolean search across every transcript, ranked with{" "}
            <code>ts_rank</code>, virtualized so a result set of thousands scrolls smoothly.</p>
          </div>
          <div className="card">
            <h3>Sermon detail</h3>
            <p className="small">Player plus structured analysis: scripture references, themes, people
            mentioned, sentiment, translation switcher, and a report-an-issue path.</p>
          </div>
          <div className="card">
            <h3>Contribute</h3>
            <p className="small">Upload with live pipeline progress, crowdsourced church and sermon
            submissions, a moderation queue, and a church-manager area with change requests.</p>
          </div>
          <div className="card">
            <h3>Admin</h3>
            <p className="small">Pipeline health, job inspect and retry, queue depth, cost calculator, traffic
            via PostHog, and a lost-transcriptions recovery view.</p>
          </div>
          <div className="card">
            <h3>Data pipeline</h3>
            <p className="small">Coverage percentage, growth trend, backlog and stuck-job monitoring &mdash;
            the operator&rsquo;s view of whether the archive is actually growing.</p>
          </div>
        </div>

        {/* ============ INGEST RAMP ============ */}
        <h2>Ingest isn&rsquo;t a ramp. It&rsquo;s a step.</h2>
        <p>
          You would expect an archive to accumulate steadily. It doesn&rsquo;t. Ingest sits near zero for
          weeks, then a batch of churches gets registered and tens of thousands of sermons arrive at once.
          The week of June 15 alone brought in roughly 16,200 sermons &mdash; about 46% of everything
          ingested in this twelve-week window.
        </p>

        <div className="chart">
          <p className="chart-title">Sermons ingested per week</p>
          <p className="chart-sub">Twelve weeks ending July 6, 2026</p>
          <svg viewBox="0 0 940 280" role="img" aria-labelledby="ingest-title">
            <title id="ingest-title">Bar chart of sermons ingested per week. Near zero most weeks, peaking at about 16,200 the week of June 15, 2026.</title>
            <line className="grid" x1="58" y1="244.0" x2="916" y2="244.0" />
            <text className="ytick" x="48" y="248.0" textAnchor="end">0</text>
            <line className="grid" x1="58" y1="177.5" x2="916" y2="177.5" />
            <text className="ytick" x="48" y="181.5" textAnchor="end">5k</text>
            <line className="grid" x1="58" y1="111.1" x2="916" y2="111.1" />
            <text className="ytick" x="48" y="115.1" textAnchor="end">10k</text>
            <line className="grid" x1="58" y1="44.6" x2="916" y2="44.6" />
            <text className="ytick" x="48" y="48.6" textAnchor="end">15k</text>

            <text className="xtick" x="93.8" y="264" textAnchor="middle">Apr 20</text>
            <line className="zero" x1="74.8" y1="244" x2="112.8" y2="244" />
            <text className="xtick" x="165.3" y="264" textAnchor="middle">Apr 27</text>
            <line className="zero" x1="146.3" y1="244" x2="184.3" y2="244" />
            <text className="xtick" x="236.8" y="264" textAnchor="middle">May 4</text>
            <path className="bar" d="M217.8,244 V113.8 Q217.8,109.8 221.8,109.8 H251.8 Q255.8,109.8 255.8,113.8 V244 Z"><title>May 4: ~6,300 sermons ingested</title></path>
            <text className="xtick" x="308.3" y="264" textAnchor="middle">May 11</text>
            <line className="zero" x1="289.3" y1="244" x2="327.3" y2="244" />
            <text className="xtick" x="379.8" y="264" textAnchor="middle">May 18</text>
            <path className="bar" d="M360.8,244 V216.7 Q360.8,212.7 364.8,212.7 H394.8 Q398.8,212.7 398.8,216.7 V244 Z"><title>May 18: ~1,600 sermons ingested</title></path>
            <text className="xtick" x="451.3" y="264" textAnchor="middle">May 25</text>
            <path className="bar" d="M432.3,244 V188.5 Q432.3,184.5 436.3,184.5 H466.3 Q470.3,184.5 470.3,188.5 V244 Z"><title>May 25: ~2,200 sermons ingested</title></path>
            <text className="xtick" x="522.8" y="264" textAnchor="middle">Jun 1</text>
            <path className="bar" d="M503.8,244 V241.4 Q503.8,237.4 507.8,237.4 H537.8 Q541.8,237.4 541.8,241.4 V244 Z"><title>Jun 1: ~500 sermons ingested</title></path>
            <text className="xtick" x="594.3" y="264" textAnchor="middle">Jun 8</text>
            <path className="bar" d="M575.3,244 V125.2 Q575.3,121.2 579.3,121.2 H609.3 Q613.3,121.2 613.3,125.2 V244 Z"><title>Jun 8: ~5,900 sermons ingested</title></path>
            <text className="xtick" x="665.8" y="264" textAnchor="middle">Jun 15</text>
            <path className="bar peak" d="M646.8,244 V32.8 Q646.8,28.8 650.8,28.8 H680.8 Q684.8,28.8 684.8,32.8 V244 Z"><title>Jun 15: ~16,200 sermons ingested</title></path>
            <text className="dlabel" x="665.8" y="19.8" textAnchor="middle">~16,200</text>
            <text className="xtick" x="737.3" y="264" textAnchor="middle">Jun 22</text>
            <path className="bar" d="M718.3,244 V241.4 Q718.3,237.4 722.3,237.4 H752.3 Q756.3,237.4 756.3,241.4 V244 Z"><title>Jun 22: ~500 sermons ingested</title></path>
            <text className="xtick" x="808.8" y="264" textAnchor="middle">Jun 29</text>
            <path className="bar" d="M789.8,244 V230.7 Q789.8,226.7 793.8,226.7 H823.8 Q827.8,226.7 827.8,230.7 V244 Z"><title>Jun 29: ~1,000 sermons ingested</title></path>
            <text className="xtick" x="880.3" y="264" textAnchor="middle">Jul 6</text>
            <path className="bar" d="M861.3,244 V233.4 Q861.3,229.4 865.3,229.4 H895.3 Q899.3,229.4 899.3,233.4 V244 Z"><title>Jul 6: ~800 sermons ingested</title></path>
          </svg>

          <details className="table">
            <summary>Data table</summary>
            <table>
              <thead><tr><th>Week of</th><th>Ingested</th><th>Transcribed</th><th>Analyzed</th></tr></thead>
              <tbody>
                <tr><td>Apr 20</td><td>0</td><td>0</td><td>0</td></tr>
                <tr><td>Apr 27</td><td>0</td><td>0</td><td>0</td></tr>
                <tr><td>May 4</td><td>6,300</td><td>1,600</td><td>700</td></tr>
                <tr><td>May 11</td><td>0</td><td>4,400</td><td>0</td></tr>
                <tr><td>May 18</td><td>1,600</td><td>1,800</td><td>100</td></tr>
                <tr><td>May 25</td><td>2,200</td><td>2,200</td><td>1,700</td></tr>
                <tr><td>Jun 1</td><td>500</td><td>500</td><td>500</td></tr>
                <tr><td>Jun 8</td><td>5,900</td><td>5,900</td><td>5,900</td></tr>
                <tr><td>Jun 15</td><td>16,200</td><td>16,200</td><td>18,000</td></tr>
                <tr><td>Jun 22</td><td>500</td><td>500</td><td>500</td></tr>
                <tr><td>Jun 29</td><td>1,000</td><td>1,000</td><td>1,000</td></tr>
                <tr><td>Jul 6</td><td>800</td><td>800</td><td>800</td></tr>
              </tbody>
            </table>
            <p className="small src" style={{ marginTop: "10px" }}>
              Read off the admin Data Pipeline chart, so values carry roughly &plusmn;100. The corpus
              totals below are exact.
            </p>
          </details>
        </div>

        <p>
          Two details in that series are more interesting than the spike. The week of May 11 ingested{" "}
          <em>nothing</em> and still transcribed ~4,400 sermons &mdash; the backlog draining behind the
          previous week&rsquo;s burst. And the week of June 15 <em>analyzed</em> ~18,000 sermons while
          ingesting ~16,200, because LLM analysis was catching up on transcripts that had been sitting
          unprocessed. Ingest, transcription, and analysis are decoupled queues, and the chart shows them
          running at different speeds.
        </p>

        <h3>Where the corpus stands</h3>

        <div className="stats">
          <div className="stat"><span className="n">41,865</span><span className="l">sermons total</span></div>
          <div className="stat"><span className="n">40,646</span><span className="l">with transcript (97%)</span></div>
          <div className="stat"><span className="n">34,793</span><span className="l">analyzed (86%)</span></div>
          <div className="stat"><span className="n">1,219</span><span className="l">awaiting transcription</span></div>
        </div>

        <p>
          The remaining work is the tail of a queue, not a pile of failures: 1,219 sermons have no
          transcript yet, and another 5,853 are transcribed but haven&rsquo;t been through LLM analysis.
          Both numbers move on their own as the workers drain.
        </p>

        <div className="bars">
          <div className="bar-row">
            <span>YouTube</span>
            <span className="track"><span className="fill" style={{ width: "100%" }}></span></span>
            <span className="val">100%</span>
          </div>
          <div className="bar-row">
            <span>Direct upload</span>
            <span className="track"><span className="fill" style={{ width: "89%" }}></span></span>
            <span className="val">89%</span>
          </div>
        </div>
        <p className="small src">
          Transcript coverage by source: 31,285 / 31,386 YouTube, 9,361 / 10,479 uploaded.
        </p>

        <div className="note">
          <strong>The honest version of the transcription story:</strong> the GPU Whisper pool has
          produced only <strong>2,197 transcripts &mdash; 5% of the corpus</strong>. Another 65% came
          from YouTube&rsquo;s own auto-captions, and 29% predate model tracking. The benchmark work above
          decided how the <em>upload</em> path transcribes, and it&rsquo;s the path that scales when
          captions aren&rsquo;t available &mdash; but the archive got to 40,000 sermons mostly by asking
          YouTube nicely, not by burning GPU hours. That&rsquo;s the cheaper engineering decision, and
          pretending otherwise would be a nicer story than a true one.
        </div>

        {/* ============ CLAUDE WORKFLOW ============ */}
        <h2>How it was built</h2>
        <p>
          Five months, 915 commits across two repositories, 58 tagged releases from <code>0.0.2</code>{" "}
          to <code>v1.0.19</code>. The work ran through a structured agent pipeline rather than
          ad-hoc prompting.
        </p>

        <div className="stats">
          <div className="stat"><span className="n">915</span><span className="l">commits</span></div>
          <div className="stat"><span className="n">70</span><span className="l">co-authored by Claude</span></div>
          <div className="stat"><span className="n">58</span><span className="l">releases</span></div>
          <div className="stat"><span className="n">748</span><span className="l">crawler tests</span></div>
        </div>
        <p className="small src">
          Counted with <code>git rev-list</code> over both repositories. &ldquo;Co-authored by
          Claude&rdquo; counts commits carrying an Anthropic co-author trailer, and excludes
          commits pushed by the <code>claude[bot]</code> GitHub App.
        </p>

        <h3>The story pipeline</h3>
        <p>
          A feature starts as <code>/feature-spec</code>, which decomposes it into numbered user stories
          with declared dependencies. Each story then runs four phases in sequence &mdash;{" "}
          <strong>research &rarr; plan &rarr; implement &rarr; validate</strong> &mdash; each phase a
          separate agent invocation with its own model and turn budget. Planning gets the strongest model;
          implementation gets a faster one.
        </p>
        <p>
          An <code>engineering-manager</code> command orchestrates the whole graph. It reads the{" "}
          <code>depends_on</code> frontmatter, builds a wave schedule, and runs every story in a wave
          concurrently &mdash; each in its own git worktree, so four agents can implement four stories
          without touching each other&rsquo;s files. Wave <em>N+1</em> doesn&rsquo;t start until every
          story in wave <em>N</em> reaches DONE. It refuses to start on a dirty tree, and it commits
          between phases but never pushes.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Purpose-built skills</h3>
            <p className="small">
              <code>evaluate-sermon-output</code> scores a crawl against thresholds and decides pass /
              partial / fail. On anything but pass it hands off to{" "}
              <code>recover-low-sermon-output</code>, which inspects the registry, scaffolds a
              site-specific scraper module, and gives up after three attempts rather than looping forever.
            </p>
          </div>
          <div className="card">
            <h3>Review subagents</h3>
            <p className="small">
              <code>db-migration-reviewer</code> checks every SQL migration for reversibility.{" "}
              <code>fastapi-router-reviewer</code> exists because of one specific footgun: a trailing
              slash on a webhook route that silently 307s and breaks Stripe signature verification.
            </p>
          </div>
          <div className="card">
            <h3>Diagnosis without patching</h3>
            <p className="small">
              <code>bug-expert</code> is deliberately forbidden from writing a fix. It ranks three to five
              hypotheses, each with a mechanism, a <code>file:line</code> citation, and a query that would
              confirm it. Separating diagnosis from repair keeps it from pattern-matching a plausible
              patch onto the wrong cause.
            </p>
          </div>
          <div className="card">
            <h3>Scheduled security review</h3>
            <p className="small">
              A recurring agent reviews everything merged to <code>main</code> since the last reviewed
              SHA, writes dated findings to a pattern ledger, and opens deduplicated GitHub issues. It
              runs whether or not anyone remembers to ask.
            </p>
          </div>
        </div>

        <h3>Context as a first-class artifact</h3>
        <p>
          Both repos keep an Obsidian vault at <code>context/</code> &mdash; 26 architecture decision
          records, 38 session logs, and a feature/story tree &mdash; wired into agents through an MCP
          filesystem server scoped to that directory, alongside a read-only Postgres MCP server. The
          agents don&rsquo;t rediscover the architecture every session; they read the ADR that explains
          why it is the way it is.
        </p>
        <p className="small src">
          Sources: <code>context/decisions/</code> &middot; <code>.claude/commands/</code> &middot;{" "}
          <code>.mcp.json</code> &middot; <code>NEW_FEATURE.md</code> &middot; git log through 2026-07-04
        </p>
      </div>
    );
  }
}
