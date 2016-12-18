import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Store from '../Store'
import { Provider } from 'react-redux';

class AppRoot extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <Home />
        </div>
      </Provider>
    );
  }
}

export default AppRoot;
