import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import Home from './Home';
import Store from '../Store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'

const enterHomePage = () => {
  console.log("onEnter home");
}

const requireAuth = (nextState, replace) => {
  console.log("On enter dashboard");
  if(Store.getState().LoginUser.success == true)
    console.log("User logged in, we can access dashboard!");
  else{
      console.log("Failed login going back to homepage");
      replace('/');
  }
}

class AppRoot extends Component {
  render() {
    return (
    <MuiThemeProvider>
      <Provider store={Store}>
          <Router history = {browserHistory}>
                <Route path="/" component={Home} onEnter={enterHomePage}/>
                <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
          </Router>
      </Provider>
    </MuiThemeProvider>

    );
  }
}

export default AppRoot;
