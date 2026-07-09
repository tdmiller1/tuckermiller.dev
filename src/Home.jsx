import * as React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

const container = { maxWidth: "820px", margin: "0 auto", padding: "20px" };
const lede = { fontSize: "20px", lineHeight: 1.6, margin: "20px 0 40px" };
const sectionHeading = { margin: "30px 0 20px" };
const card = { margin: "20px 0" };
const dimSmall = { color: "#666", fontSize: "14px", margin: "4px 0 12px" };
const body = { lineHeight: 1.6, margin: "0 0 16px" };
const chipsRow = { display: "flex", flexWrap: "wrap", gap: "8px" };
const chip = { margin: "0" };
const statsRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  margin: "16px 0",
};
const stat = { flex: "1 1 140px", textAlign: "center" };
const statNumber = { fontSize: "28px", fontWeight: 700, display: "block" };
const statLabel = { fontSize: "13px", color: "#666" };
const source = { fontSize: "13px", color: "#666", margin: "12px 0" };
const readMore = { fontWeight: 600 };

export class Home extends React.Component {

  render() {
    return (
      <div style={container}>
        <Typography variant="h1">Hey, I'm Tucker.</Typography>
        <p style={lede}>
          Senior Software Engineer in Indianapolis. I build search, data
          pipelines, and the infrastructure underneath them &mdash; most
          recently a searchable archive of 40,000+ transcribed sermons.
        </p>

        <Typography variant="h4" style={sectionHeading}>
          The last 12 months
        </Typography>

        <Card style={card}>
          <CardContent>
            <Typography variant="h5">
              Promoted to Senior Software Engineer II
            </Typography>
            <p style={dimSmall}>
              Seismic (formerly Lessonly) &middot; Indianapolis, IN &middot;
              2025
            </p>
            <p style={body}>
              Recognized for front-end architecture work, mentorship of junior
              engineers, and pushing the team toward accessible, responsive UI.
            </p>
            <div style={chipsRow}>
              <Chip style={chip} label="React" color="primary" />
              <Chip style={chip} label="Next.js" color="primary" />
              <Chip style={chip} label="Apollo" />
              <Chip style={chip} label="Node.js" />
              <Chip style={chip} label="Ruby on Rails" />
            </div>
          </CardContent>
        </Card>

        <Card style={card}>
          <CardContent>
            <Typography variant="h5">
              Built OpenSermon &mdash; an open archive of sermons
            </Typography>
            <p style={dimSmall}>Personal project &middot; Feb 2026 &ndash; present</p>
            <p style={body}>
              A distributed crawl-and-transcribe pipeline feeding a searchable
              web app. Six-stage job system, GPU Whisper transcription, Postgres
              full-text search over 46 million transcript segments, and an
              eleven-stack CloudFormation deployment on AWS.
            </p>
            <div style={statsRow}>
              <div style={stat}>
                <span style={statNumber}>40,646</span>
                <span style={statLabel}>sermons transcribed</span>
              </div>
              <div style={stat}>
                <span style={statNumber}>615</span>
                <span style={statLabel}>churches</span>
              </div>
              <div style={stat}>
                <span style={statNumber}>46.3M</span>
                <span style={statLabel}>transcript segments</span>
              </div>
            </div>
            <p style={source}>
              Measured against the production corpus, June&ndash;July 2026.
            </p>
            <p>
              <Link to="/opensermon" style={readMore}>
                Read the full breakdown &rarr;
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
