import React from "react";
import { Typography, Card, Button, Paper } from "@material-ui/core";
import Image from 'material-ui-image';
import OneAmericaImage from "./assets/oneAmericaDashboard.png";
import BowlingImage from "./assets/example.PNG";

const paper = { padding: '20px', margin:'20px 10px' }
const button = { margin: '10px', fontSize:'15px' }
const body = { fontSize: '20px' }
const image = { height: '75%', width: '100%' };

export class Projects extends React.Component {

  render() {
    return (
      <div>
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
          <br />
          <Typography variant="h5">Links</Typography><br/>
          <Button style={button} variant="contained" color="primary" target="#" href='http://oneamerica.tuckermillerdev.com'>OneAmerica Client</Button>
          <Button style={button} variant="contained" color="primary" target="#" href='http://oneamerica.tuckermillerdev.com/#/login'>OneAmerica Employee</Button>
          <Button style={button} variant="contained" color="secondary" target="#" href='https://oneamerica-nodemon.herokuapp.com'>OneAmerica Server</Button><br/>
          <Button style={button} color="primary" target="#" href='https://github.com/tdmiller1/oneamerica-insurance-calculator'>GitHub</Button>
          <div>
            <Image src={OneAmericaImage} aspectRatio="1.4" imageStyle={image} />
          </div>
        </Card>
        <Typography variant="h3">Bowling Statistics Application</Typography>
        <Paper style={paper}>
          <Typography variant="h5">Personal Project</Typography><br/>
          <Typography style={body} variant="body1">
            I like to go bowling so naturally I also keep track of each game I play. And my google sheets was getting tedious to keep
            up to date. So I thought that if I make a website that I can sign in to and just submit my scores it would be faster and others
            can also benefit. Eventually it will have graphs and more analytics implemented. Also in development is a mobile app designed to 
            have the user take a picture of their game, and using image recognition scan the screen and submit the scores automatically (ideally).
          </Typography>
          <br />
          <Typography variant="h5">Links</Typography><br/>
          <Button style={button} variant="contained" color="primary" target="#" href='http://bowling.tuckermillerdev.com'>Bowling Client</Button>
          <Button style={button} variant="contained" color="primary" target="#" href='https://tuckermillerdev-api.herokuapp.com/'>TuckerMillerDev API</Button>
          <Button style={button} variant="contained" color="secondary" target="#" href='http://api.tuckermillerdev.com'>Bowling Host</Button><br/>
          <Button style={button} color="primary" target="#" href='https://github.com/tdmiller1/bowling-stats-web'>GitHub</Button>
          <div>
            <Image src={BowlingImage} aspectRatio="1.4" imageStyle={image} />
          </div>
        </Paper>
        <Typography variant="h3">Destination Application</Typography>
        <Paper style={paper}>
          <Typography variant="h5">Class Project</Typography><br/>
          <Typography style={body} variant="body1">
            Group of 4 developed a Java windows application that would list to the user possible places to visit based on the location they enter.
            Using Google Places API, the application would search within the radius and place map flags on the Google Maps UI element. Along with listing 
            the results in a table view on the right hand side.
          </Typography>
          <br />
          <Typography variant="h5">Links</Typography><br/>
          <Button style={button} color="primary" target="#" href='https://github.com/tdmiller1/Destination-Application'>GitHub</Button>
        </Paper>
      </div>
    );
  }
}
