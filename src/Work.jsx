import React from "react";
import Code from "@mui/icons-material/Code";
import Star from "@mui/icons-material/Star";
import Chip from "@mui/material/Chip";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./assets/work-styles.css";

const timelineStyle = { width: "100%" };
const chip = { margin: "5px", fontSize: "13px" };
const lede = { maxWidth: "720px", margin: "24px auto 0", padding: "0 16px" };
const progression = { color: "#555", fontSize: "13px" };

export class WorkComponent extends React.Component {
  render() {
    return (
      <>
        <p style={lede}>
          Seven years building product software: micro-frontend architecture at
          enterprise scale, the engineers building on it, and the asynchronous,
          event-driven systems and cloud infrastructure underneath. Currently
          tech lead for Scorecards, Seismic&rsquo;s AI scorecard product.
        </p>
        <VerticalTimeline style={timelineStyle}>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">
              March 2020 - present
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">
              Senior Software Engineer II
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Seismic (formerly Lessonly) &middot; Indianapolis, IN
            </h4>
            <p style={progression}>
              Senior Software Engineer II 2025&ndash;present &middot; Senior
              Software Engineer 2022&ndash;2025 &middot; Software Engineer
              2020&ndash;2022
            </p>
            <ul>
              <li>
                <p>
                  Bootstrapped <code>web-skills-assets</code>, the
                  micro-frontend platform that now underpins the entire Skills
                  2.0 surface: import-map build system, Webpack config, Jenkins
                  CI/CD, and branch-deploy infrastructure. 700+ PRs from the
                  wider team have since landed on it.
                </p>
              </li>
              <li>
                <p>
                  Led Scorecards from first commit to launch: Seismic&rsquo;s AI
                  scorecard product, shipped as a new SKU and delivered on time.
                  Owned the technical delivery as well as the code, organizing
                  the project leads on each contributing team into a working
                  cadence so the pieces landed together.
                </p>
              </li>
              <li>
                <p>
                  Stood up <code>web-scorecards-assets</code>, the ~20-component
                  library the product is built on, and still own its release
                  schedule. Adoption grew from my team alone to 3 internal teams
                  across 6 interfacing features, driving 10K+ AI scorecards for
                  100 customers in 6 months.
                </p>
              </li>
              <li>
                <p>
                  Migrated Skills onto Seismic&rsquo;s Next Gen micro-frontend
                  architecture, unblocking shared runtime upgrades and
                  independent deploys; moved its builds from CommonJS to ESM,
                  unblocking import-map compatibility platform-wide.
                </p>
              </li>
              <li>
                <p>
                  Mentored 5 engineers onto the platform and its build system (2
                  formally, 3 informally), and handed off ownership of multiple
                  components to them.
                </p>
              </li>
              <li>
                <p>
                  Introduced a Repository &rarr; Service &rarr; Route layering
                  and won support for it across both the Assessment Service and
                  the Skills microservices. Shipped advanced search returning
                  results in under 25&nbsp;ms.
                </p>
              </li>
              <li>
                <p>
                  Built the queued background job service behind Skills&rsquo;
                  LLM-backed features: prompt construction and output-structure
                  orchestration against internal LLM APIs, with polling for
                  state and results.
                </p>
              </li>
              <li>
                <p>
                  Took the individual rep view from beta to GA with backing REST
                  data endpoints and scoped service-to-service tokens, clearing
                  the high-priority QA blockers ahead of launch.
                </p>
              </li>
              <li>
                <p>
                  Shipped production Ruby on Rails through the first 18 months at
                  Seismic; Postgres continuously on every instance since.
                </p>
              </li>
              <li>
                <p>
                  Owned Assessment-level Reporting end to end (group and profile
                  filtering, performance tables, heatmaps, skill breakdowns),
                  then refactored the service layer across 74 files to lift data
                  access out of components and centralize loading state.
                </p>
              </li>
              <li>
                <p>
                  Earlier: tenant-aware custom-domain support for Skills,
                  enabling white-label enterprise deployments; the ManagerBFF
                  layer behind Journey Builder V2; and a Zoom event integration
                  that drove a 50% increase in events created.
                </p>
              </li>
            </ul>
            <Chip style={chip} color="primary" label={"React"} />
            <Chip style={chip} color="primary" label={"TypeScript"} />
            <Chip style={chip} color="primary" label={"Next.js"} />
            <Chip style={chip} color="primary" label={"Micro-frontends"} />
            <Chip style={chip} color="primary" label={"Apollo / GraphQL"} />
            <Chip style={chip} color="secondary" label={"Node.js"} />
            <Chip style={chip} color="secondary" label={"Ruby on Rails"} />
            <Chip style={chip} color="secondary" label={"PostgreSQL"} />
            <Chip style={chip} color="secondary" label={"Jenkins CI/CD"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">
              May 2019 - February 2020
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">
              Software Engineer I
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Ontario Systems &middot; Muncie, IN
            </h4>
            <ul>
              <li>
                <p>
                  Increased automated test coverage by 300% by reworking the
                  Cucumber test design, and led the team through a migration to
                  a new source control management platform.
                </p>
              </li>
              <li>
                <p>
                  First intern of 30 offered a full-time position, two months
                  ahead of schedule.
                </p>
              </li>
            </ul>
            <Chip style={chip} color="primary" label={"Agile"} />
            <Chip style={chip} variant="outlined" label={"Telephony"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
            icon={<Star />}
          />
        </VerticalTimeline>
      </>
    );
  }
}
