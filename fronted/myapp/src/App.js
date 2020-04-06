import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routers/login";
import Inscription from "./routers/inscription";
import ConfirmationInscription from "./routers/confirmationInscription";
import ER from "./helpers/ER";
import Home from './routers/home';


class App extends Component {

 


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login/:eruer" component={ER} />
          <Route path="/Login/" component={Login} />
          <Route path="/Inscription/:eruer" component={ER} />
          <Route path="/Inscription/" component={Inscription} />
          <Route path="/Confirmation-Inscription/:eruer" component={ER} />
          <Route path="/Confirmation-Inscription/" component={ConfirmationInscription}
          />
          <Route exact path="/:eruer" component={ER} />

        </Switch>

      </BrowserRouter>
    );
  }




}

export default App;
