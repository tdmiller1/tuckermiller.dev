import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Button, Paper, Chip } from "@mui/material";

const paper = { padding: '20px', margin: '20px 10px' };
const button = { margin: '10px', fontSize: '15px' };
const body = { fontSize: '20px' };
const container = { padding: '25px' };
const chip = { margin: '5px' };
const dim = { color: '#666' };
const spotlight = { fontSize: '18px', fontWeight: 'bold' };

export class Projects extends React.Component {

  render() {
    return (
      <div style={container}>
        <Typography variant="h3">Projects</Typography>

        <Typography variant="h4" style={{ marginTop: '20px' }}>OpenSermon</Typography>

        <Card style={paper}>
          <Typography variant="subtitle1" style={dim}>
            2026 – present · Python, FastAPI, React, Postgres, AWS
          </Typography><br />
          <Typography style={body} variant="body1">
            An open, searchable archive of sermons. A six-stage distributed crawler discovers and
            downloads sermon media, transcribes it, and pushes structured records into a web app with
            full-text search over 46 million transcript segments.
          </Typography><br />
          <Link to="/opensermon" style={spotlight}>Full project spotlight →</Link>
        </Card>

        <Typography variant="h4" style={{ marginTop: '20px' }}>Bowling Statistics Application</Typography>

        <Paper style={paper}>
          <Typography variant="subtitle1" style={dim}>Personal project</Typography><br />
          <Typography style={body} variant="body1">
            I bowl, and I tracked every game in a Google Sheet until keeping it current got tedious.
            So I built a site to sign in and submit scores instead. The longer-term idea was a mobile
            app that photographs the lane scoreboard and reads the scores off it with image recognition.
          </Typography><br />
          <div>
            <Chip style={chip} label="React" color="primary" />
            <Chip style={chip} label="Node.js" />
          </div>
          <Button
            style={button}
            variant="contained"
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/tdmiller1/BowlingStats-V2"
          >
            GitHub →
          </Button>
        </Paper>
      </div>
    );
  }
}
