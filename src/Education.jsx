import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import './assets/education.css';

/* No min-width: 300px + the container's 25px padding overflowed a 390px viewport. */
const mainCard = { margin: "25px auto", maxWidth: "480px" }

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
