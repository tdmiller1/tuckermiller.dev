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
          Seven years building product software &mdash; micro-frontend
          architecture at enterprise scale, and the distributed systems and
          cloud infrastructure underneath it.
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
                  micro-frontend that now underpins the entire Skills 2.0
                  surface &mdash; import-map build system, Webpack config,
                  Jenkins CI/CD, and branch-deploy infrastructure. 700+ PRs
                  from the wider team have since landed on it.
                </p>
              </li>
              <li>
                <p>
                  Migrated Skills onto Seismic&rsquo;s Next Gen micro-frontend
                  architecture (entry points, build scripts, environment
                  rollout), unblocking shared runtime upgrades and independent
                  deploys.
                </p>
              </li>
              <li>
                <p>
                  Owned Assessment-level Reporting end to end &mdash; group and
                  profile filtering, performance tables, heatmaps, skill
                  breakdowns &mdash; then refactored the service layer across 74
                  files to lift data access out of components and centralize
                  loading state.
                </p>
              </li>
              <li>
                <p>
                  Delivered the Scorecards front end &mdash; creation flows,
                  benchmark and derived-rating inputs, analytics instrumentation
                  &mdash; and migrated its builds from CommonJS to ESM,
                  unblocking import-map compatibility platform-wide.
                </p>
              </li>
              <li>
                <p>
                  Took the individual rep view from internal beta to GA with
                  backing data endpoints and scoped service-to-service tokens,
                  clearing the high-priority QA blockers ahead of launch.
                </p>
              </li>
              <li>
                <p>
                  Shipped tenant-aware custom-domain support for Skills,
                  enabling white-label enterprise deployments, and built the
                  ManagerBFF layer behind Journey Builder V2.
                </p>
              </li>
              <li>
                <p>
                  Earlier: advanced search returning results in under 25&nbsp;ms;
                  a Zoom event integration that drove a 50% increase in events
                  created; mentored two engineers new to the team.
                </p>
              </li>
            </ul>
            <Chip style={chip} color="primary" label={"React"} />
            <Chip style={chip} color="primary" label={"Next.js"} />
            <Chip style={chip} color="primary" label={"Micro-frontends"} />
            <Chip style={chip} color="primary" label={"Apollo / GraphQL"} />
            <Chip style={chip} color="secondary" label={"Node.js"} />
            <Chip style={chip} color="secondary" label={"Ruby on Rails"} />
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
