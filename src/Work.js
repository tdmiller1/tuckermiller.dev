import React from "react";
import Work from "@material-ui/icons/Work";
import Code from "@material-ui/icons/Code";
import Star from "@material-ui/icons/Star";
import Chip from "@material-ui/core/Chip";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './assets/work-styles.css';

const timelineStyle = {width:"100%"}
const chip = { margin: "5px", fontSize:'13px' }

export class WorkComponent extends React.Component {

  render() {
    return (
        <VerticalTimeline style={timelineStyle}>
        
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">May 2019 - August 2019</h3>
            <hr></hr>
            <h3 className="vertical-timeline-element-title">Software Engineer I</h3>
            <h4 className="vertical-timeline-element-subtitle">Muncie, IN</h4>
            <p>Ontario Systems</p>
            <p>
              Develop technical solutions following the Ontario Systems Development Framework (ODF)</p>
            <p>Review and resolve software defect investigations</p>
            <p>Participate in detailed design reviews and code walkthroughs/reviews as a peer contributor</p>
            <p>
              Agile Software Development
            </p>
            <Chip style={chip} color="primary" label={"Agile"} />
            <Chip style={chip} variant="outlined" label={"Mac OS/Windows"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Work />}
          >
            <h3 className="vertical-timeline-element-title">March 2018 - April 2019</h3>
            <hr></hr>
            <h3 className="vertical-timeline-element-title">Computer Service Technician</h3>
            <h4 className="vertical-timeline-element-subtitle">Muncie, IN</h4>
            <p>Ball State Housing and Residence Life</p>
            <p>
              Update computer lab, troubleshoot networking, and assist student device issues
            </p>
            <Chip style={chip} color="primary" label={"Customer Service"} />
            <Chip style={chip} variant="outlined" label={"Mac OS/Windows"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">May 2017 - August 2017</h3>
            <hr></hr>
            <h3 className="vertical-timeline-element-title">Software Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Decatur, IN</h4>
            <p>Monroe Valley</p>
            <p>
              Bug Tested, Documentation of Web API, and build customer websites
            </p>
            <p>
              Documented ASP.NET Web API through Swagger and Swashbuckle
            </p>
            <Chip style={chip} color="primary" label={".NET"} />
            <Chip style={chip} color="primary" label={"Swashbuckle"} />
            <Chip style={chip} color="primary" label={"Javascript"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Code />}
          >
            <h3 className="vertical-timeline-element-title">May 2016 - August 2016</h3>
            <hr></hr>
            <h3 className="vertical-timeline-element-title">Web Developer Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Monroe, IN</h4>
            <p>eGenuity, LLC</p>
            <p>
              Implemented AngularJS Modular template designs and designed HTML/CSS pages for kiosk users
            </p>
            <p>
              Worked on a team of six designing a new kiosk admin control layout enabling easier settings configuration
            </p>
            <Chip style={chip} color="primary" label={"AngularJS"} />
            <Chip style={chip} color="primary" label={"HTML/CSS"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Work />}
          >
            <h3 className="vertical-timeline-element-title">May 2015 - August 2015</h3>
            <hr></hr>
            <h3 className="vertical-timeline-element-title">Data Entry</h3>
            <h4 className="vertical-timeline-element-subtitle">Decatur, IN</h4>
            <p>Biggs Property Management</p>
            <p>
              Transferred old system over to RealPage RPM software
            </p>
            <Chip style={chip} color="primary" label={"RealPage"} />
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<Star />}
          />
        </VerticalTimeline>
    );
  }
}
