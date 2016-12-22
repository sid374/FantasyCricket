import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import Home from './Home';
import Store from '../Store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'

const userLoggedIn = (nextState, replace) => {
  if(Store.getState().LoginUser.success == true)
    console.log("Login was successfull!");
  else{
    replace('/');
    console.log("Failed login");
  }
}

class AppRoot extends Component {
  render() {
    return (
    <MuiThemeProvider>
      <Provider store={Store}>
          <Router history = {browserHistory}>
                <Route path="/" component={Home}/>
                <Route path="/dashboard" component={Dashboard} onEnter={userLoggedIn}/>
          </Router>
      </Provider>
    </MuiThemeProvider>

    );
  }
}

export default AppRoot;
