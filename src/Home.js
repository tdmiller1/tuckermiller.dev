import * as React from "react";

import TuckerPng from './assets/tucker.jfif';
import { Button, Typography } from "@material-ui/core";

const container = { textAlign: 'center' }
const button = { margin: '10px', fontSize:'25px' }

export class Home extends React.Component {
  
  render() {
    return (
      <div style={container}>
        <img src={TuckerPng} alt="Tucker Miller" /><br /><br /><br />
        <Typography variant="h1">Hey, I'm Tucker :) </Typography><br /><br /><br />
        <Typography variant="h4">Welcome to my site, connect with me on LinkedIn! </Typography><br /><br /><br />
        <Button style={button} variant="contained" color="primary" href="https://linkedin.com/in/tuckermiller7" target="#">LinkedIn Account</Button>
      </div>
    )
  }
}