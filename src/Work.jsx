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
const lede = { maxWidth: "720px", margin: "0 auto", padding: "0 16px" };
const progression = { color: "#555", fontSize: "13px" };

export class WorkComponent extends React.Component {
  render() {
    return (
      <>
        <p style={lede}>
          Seven years building product software, mostly on the front end,
          increasingly on the systems behind it.
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
                  Built an advanced search feature with a guaranteed sub-25 ms
                  time to results.
                </p>
              </li>
              <li>
                <p>
                  Integrated Zoom into the app ecosystem as an automated event
                  system, driving an immediate 50% increase in events created.
                </p>
              </li>
              <li>
                <p>
                  Migrated an outdated multi-page frontend architecture to
                  single-page React components.
                </p>
              </li>
              <li>
                <p>
                  Championed responsive, accessible UI &mdash; 50% more
                  responsive components.
                </p>
              </li>
              <li>
                <p>
                  Raised Cypress test coverage by 40%, documenting and fixing
                  the bugs it surfaced.
                </p>
              </li>
              <li>
                <p>Mentored and coached two engineers new to the team.</p>
              </li>
            </ul>
            <Chip style={chip} color="primary" label={"Next.js"} />
            <Chip style={chip} color="primary" label={"React"} />
            <Chip style={chip} color="primary" label={"Apollo"} />
            <Chip style={chip} color="secondary" label={"Node.js"} />
            <Chip style={chip} color="secondary" label={"Ruby on Rails"} />
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
                  Cucumber test design.
                </p>
              </li>
              <li>
                <p>
                  Led the team through a migration to new source control
                  management.
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
