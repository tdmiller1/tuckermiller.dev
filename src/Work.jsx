import React from "react";
import Work from "@material-ui/icons/Work";
import Code from "@material-ui/icons/Code";
import Star from "@material-ui/icons/Star";
import Chip from "@material-ui/core/Chip";
import Image from "material-ui-image";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./assets/work-styles.css";

const timelineStyle = { width: "100%" };
const chip = { margin: "5px", fontSize: "13px" };

export class WorkComponent extends React.Component {
  render() {
    return (
      <>
        <VerticalTimeline style={timelineStyle}>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">
              March 2020 - Current
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">
              Senior Software Engineer
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Indianapolis, IN
            </h4>
            <Image
              src="https://www.betterbuys.com/wp-content/uploads/2016/03/Lessonly.png"
              aspectRatio="1"
            />
            <ul>
              <li>
                <p>
                  Created an advanced search feature that increased time to
                  results for users guaranteed under 25 ms
                </p>
              </li>
              <li>
                <p>
                  Integrated with Zoom to create an automated event system
                  integrated within our app ecosystem. Resulting in an immediate
                  50% increase in events created
                </p>
              </li>
              <li>
                <p>
                  Focused on front-end development, providing mentorship and
                  coaching to two new engineers
                </p>
              </li>
              <li>
                <p>
                  Championed for a responsive and accessible UI with 50%
                  increase in responsive components
                </p>
              </li>
              <li>
                <p>
                  Transformed outdated Multi-Page view based frontend
                  architecture to Single-Page react components
                </p>
              </li>
              <li>
                <p>
                  Increased cypress test coverage by 40% and in the process
                  removal and documentation of found bugs
                </p>
              </li>
            </ul>
            <Chip style={chip} color="primary" label={"NextJS"} />
            <Chip style={chip} color="primary" label={"ReactJS"} />
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
            <h4 className="vertical-timeline-element-subtitle">Muncie, IN</h4>
            <p>Ontario Systems</p>
            <p>
              Increased automated test coverage by 300% by reevaluating Cucumber
              test design
            </p>
            <p>Led the team in converting to new source control management</p>
            <p>
              First intern out of 30 to be offered full time position 2 months
              ahead of schedule
            </p>
            <Chip style={chip} color="primary" label={"Agile"} />
            <Chip style={chip} variant="outlined" label={"Telephony"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Work />}
          >
            <h3 className="vertical-timeline-element-title">
              March 2018 - April 2019
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">
              Computer Service Technician
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Muncie, IN</h4>
            <p>Ball State Housing and Residence Life</p>
            <p>
              Update computer lab, troubleshoot networking, and assist student
              device issues
            </p>
            <Chip style={chip} color="primary" label={"Customer Service"} />
            <Chip style={chip} variant="outlined" label={"Mac OS/Windows"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">
              May 2017 - August 2017
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">Software Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Decatur, IN</h4>
            <p>Monroe Valley</p>
            <p>
              Bug Tested, Documentation of Web API, and build customer websites
            </p>
            <p>Documented ASP.NET Web API through Swagger and Swashbuckle</p>
            <Chip style={chip} color="primary" label={".NET"} />
            <Chip style={chip} color="primary" label={"Swagger"} />
            <Chip style={chip} color="primary" label={"Javascript"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">
              May 2016 - August 2016
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">
              Web Developer Intern
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Monroe, IN</h4>
            <p>eGenuity, LLC</p>
            <p>
              Implemented AngularJS Modular template designs and designed
              HTML/CSS pages for kiosk users
            </p>
            <p>
              Worked on a team of six designing a new kiosk admin control layout
              enabling easier settings configuration
            </p>
            <Chip style={chip} color="primary" label={"AngularJS"} />
            <Chip style={chip} color="primary" label={"HTML/CSS"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<Work />}
          >
            <h3 className="vertical-timeline-element-title">
              May 2015 - August 2015
            </h3>
            <hr />
            <h3 className="vertical-timeline-element-title">Data Entry</h3>
            <h4 className="vertical-timeline-element-subtitle">Decatur, IN</h4>
            <p>Biggs Property Management</p>
            <p>Transferred old system over to RealPage RPM software</p>
            <Chip style={chip} color="primary" label={"RealPage"} />
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
