import React from "react";
import { Typography, Card, Button, Paper } from "@material-ui/core";
import OneAmericaImage from "./assets/oneAmericaDashboard.png";
import BowlingImage from "./assets/DashboardView.PNG";

const paper = { padding: '20px', margin:'20px 10px' }
const button = { margin: '10px', fontSize:'15px' }
const body = { fontSize: '20px' }
const image = { height: '60%', width: 'calc(100vw - 370px)' };
const container = { padding: '25px' };

export class Projects extends React.Component {

  render() {
    return (
      <div style={container}>
        <Typography variant="h3">Bowling Statistics Application</Typography>

        <Paper style={paper}>
          <Typography variant="h5">Personal Project</Typography><br/>
          <Typography style={body} variant="body1">
            I like to go bowling so naturally I also keep track of each game I play. And my google sheets was getting tedious to keep
            up to date. So I thought that if I make a website that I can sign in to and just submit my scores it would be faster and others
            can also benefit. Eventually it will have graphs and more analytics implemented. Also in development is a mobile app designed to
            have the user take a picture of their game, and using image recognition scan the screen and submit the scores automatically (ideally).
          </Typography><br />

          <Typography variant="h5">Links</Typography><br/>
          <Button style={button} variant="contained" color="primary" target="#" href='https://www.bowlingstats.app/home'>Bowling Client</Button>
          <Button style={button} variant="contained" color="secondary" target="#" href='https://api-tuckermillerdev-staging.herokuapp.com/api/bowling/'>TuckerMillerDev API</Button>
          <Button style={button} variant="contained" color="primary" target="#" href='https://github.com/tdmiller1/BowlingStats-V2'>GitHub</Button>
          <br />
          <img alt="example bolwing dashboard" src={BowlingImage} style={image} />
        </Paper>

        <Typography variant="h3">OneAmerica Insurance Calculator</Typography>

        <Card style={paper}>
          <Typography variant="h5">Capstone Project</Typography><br/>
          <Typography style={body} variant="body1">
            Group of 4, Max Dryer, Michael Noonan, David James, and Tucker Miller.
            Our client was a OneAmerica employee Tony Waltermann, with whom we met on a weekly basis phone call meeting.
            The project initially started with needing just a website that a customer would input their information and then it
            calculates an insurance needs claim. Then asks them for their contact info. But we decided to also add a backend functionality
            for the OneAmerica Employees to view the leads that the website creates.
          </Typography>

          <Typography style={body} variant="body1">
            Employee Login - Username: 1234 Password: 1234
          </Typography>
          <br />

          <Typography variant="h5">Links</Typography><br/>
          <Button style={button} variant="contained" color="primary" target="#" href='http://oneamerica.tuckermillerdev.com'>OneAmerica Client</Button>
          <Button style={button} variant="contained" color="primary" target="#" href='http://oneamerica.tuckermillerdev.com/#/login'>OneAmerica Employee</Button>
          <Button style={button} variant="contained" color="secondary" target="#" href='https://oneamerica-nodemon.herokuapp.com'>OneAmerica Server</Button>
          <Button style={button} variant="contained" color="primary" target="#" href='https://github.com/tdmiller1/oneamerica-insurance-calculator'>GitHub</Button>

          <img alt="example dasboard" src={OneAmericaImage} style={image} />
        </Card>
      </div>
    );
  }
}
