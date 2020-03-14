import React , { Component  } from 'react';

import {BrowserRouter , Route ,Switch} from "react-router-dom";


class App extends Component {
 
  render(){
    return (
      <BrowserRouter>
      <Switch>
          {/* <Route exact path="/" component={Page} />
          <Route  path = "/user/:eruer"  component ={ER} />
          
          <Route  path="/user/" component={User} />
          <Route  path = "/signun/:eruer"  component ={ER} />
          <Route  path="/signun" component={Inscription} />
          <Route exact path="/admin/" component={Admin} />
          <Route  path = "/:eruer"  component ={ER} /> */}
          
      </Switch>

  </BrowserRouter>
    ); 
  }
}

export default App;
 