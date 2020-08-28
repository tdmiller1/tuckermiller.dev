import React from "react";
import BallStatePng from "./assets/ballstate.png";
import { Typography, Chip, Card, CardContent, Divider } from "@material-ui/core";
import './assets/education.css';

const card = {margin:"25px", minWidth:"300px"}
const mainCard = {margin:"25px", minWidth:"300px"}
const chip = { margin: "5px" }

export class Education extends React.Component {
  
  render() {
    return (
      <div id="containerEdu">
        <img alt="Ball State Logo" src={BallStatePng} id="ballstateLogo" />
        <Card style={mainCard}>
            <CardContent>
              <Typography variant="h4">August 2016 - May 2019</Typography>
              <br />
              <Typography variant="h5">Major: Computer Science</Typography>
              <Typography variant="h5">Minor: Foundations of Business</Typography>
              <Typography variant="h5">GPA: 3.6</Typography>
            </CardContent>
        </Card>
        <Typography variant="h2" component="h3">Featured Coursework</Typography>
        <div id="card-container">
            <Card style={card}>
                <CardContent>
                  <Typography variant="h4" component="h3">CS 499</Typography>
                  <Divider/>
                  <Typography variant="h5" component="h3">Independent Study</Typography>
                  <Typography variant="subtitle1" component="h3">Unreal Engine, Mobile Game Development, and User testing</Typography>
                  <Chip color="secondary" label={"Agile"} />
                </CardContent>
            </Card>

            <Card style={card}>
                <CardContent>
                  <Typography variant="h4" component="h3">CS 224</Typography>
                  <Divider/>
                  <Typography variant="h5" component="h3">Design and Analysis of Algorithms</Typography>
                  <Typography variant="subtitle1" component="h3">Introduction to algorithm analysis, including probabilistic, geometric, combinatorial, and graph algorithms</Typography>
                  <Chip color="primary" label={"Python"} />
                </CardContent>
            </Card>
          <Card style={card}>
              <CardContent>
                <Typography variant="h4" component="h3">CS 222</Typography>
                  <Divider/>
                <Typography variant="h5" component="h3">Advanced Programming</Typography>
                <Typography variant="subtitle1" component="h3">Project-intensive study of advanced topics and best practices in software development, including advanced language features, modular decomposition, and development tools</Typography>
                <Chip color="primary" label={"Java"} />
              </CardContent>
          </Card>
          
          <Card style={card}>
              <CardContent>
                <Typography variant="h4" component="h3">CS 418</Typography>
                  <Divider/>
                <Typography variant="h5" component="h3">Database Design</Typography>
                <Typography variant="subtitle1" component="h3">An introduction to database requirements analysis, modeling, creation, and usage</Typography>
                <Chip style={chip} variant="outlined"  label={"MySQL"} />
                <Chip style={chip} variant="outlined" label={"MongoDB"} />
              </CardContent>
          </Card>
          <Card style={card}>
              <CardContent>
                <Typography variant="h4" component="h3">CS 455</Typography>
                  <Divider/>
                <Typography variant="h5" component="h3">Data Mining</Typography>
                <Typography variant="subtitle1" component="h3">Introduction to data mining algorithms, implementations, and applications. Topics include data preprocessing, clustering analysis, etc.</Typography>
                <Chip color="primary" label={"Python"} />
              </CardContent>
          </Card>

          <Card style={card}>
              <CardContent>
                <Typography variant="h4" component="h3">CS 495/498</Typography>
                  <Divider/>
                <Typography variant="h5" component="h3">Software Engineering</Typography>
                <Typography variant="subtitle1" component="h3">Introduction to software engineering: process, requirements, design, quality assurance, project management, and tools</Typography>
                <Chip style={chip} variant="outlined" label={"ReactJS"} />
                <Chip style={chip} variant="outlined" label={"ExpressJS"} />
              </CardContent>
          </Card>
          </div>
      </div>
    );
  }
}
