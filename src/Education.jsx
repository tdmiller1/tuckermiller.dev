import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import './assets/education.css';

const mainCard = {margin:"25px", minWidth:"300px"}

export class Education extends React.Component {

  render() {
    return (
      <div id="containerEdu">
        <Card style={mainCard}>
            <CardContent>
              <Typography variant="h4">Ball State University</Typography>
              <br />
              <Typography variant="h5">August 2016 - May 2019</Typography>
              <br />
              <Typography variant="h5">Major: Computer Science</Typography>
              <Typography variant="h5">Minor: Foundations of Business</Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}
