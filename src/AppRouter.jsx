import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./Home";
import { Projects } from "./Projects";
import { WorkComponent } from "./Work.jsx";
import { Education } from "./Education";
import GitHub from "./Github";
import LinkedIn from "./Linkedin";
import Proof from "./assets/components/Proof";

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/projects" exact component={Projects} />
          <Route path="/work experience" component={WorkComponent} />
          <Route path="/education" component={Education} />
          <Route path="/home" component={Home} />
          <Route path="/poc" component={Proof} />
          <Route path="/github" component={GitHub} />
          <Route path="/linkedin" component={LinkedIn} />
          <Route path="/" exact component={WorkComponent} />
        </Switch>
      </Router>
    );
  }
}
