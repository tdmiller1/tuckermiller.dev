import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Body } from "./containers";

import { Home } from "./Home";
import { Projects } from "./Projects";
import { WorkComponent } from "./Work";
import { Education } from "./Education";
import GitHub from "./Github";
import LinkedIn from "./Linkedin";
import { Home as HomePage } from "./OneAmerica/Home"
import Results from "./OneAmerica/Results"
import Dashboard from "./OneAmerica/Dashboard"
import Login from "./OneAmerica/Login"
import CreateUser from "./OneAmerica/CreateUser"

export default class AppRouter extends React.Component {

    render(){
        return (
        <Router>
            <Body>
              <Switch>
                <Route path="/projects" exact component={Projects} />
                <Route path="/work experience" component={WorkComponent} />
                <Route path="/education" component={Education} />
                <Route path="/home" component={Home} />
                <Route path="/github" component={GitHub} />
                <Route path="/linkedin" component={LinkedIn} />
                <Route exact path="/oneamerica" component={HomePage} />
                <Route path="/oneamerica/results" component={Results} />
                <Route path="/oneamerica/login" component={Login} />
                <Route path="/oneamerica/createuser" component={CreateUser} />
                <Route path="/oneamerica/dashboard" component={Dashboard} />
                <Route path="/" exact component={Home} />
              </Switch>
            </Body>
        </Router>
        )
    }
}