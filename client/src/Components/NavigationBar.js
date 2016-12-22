import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import LogoutButton from './LogoutButton';

//import '../stylesheets/bootstrap.min.css';

class NavigationBar extends Component {
  render() {
    return (
    	<Navbar>
        	<Navbar.Header>
          		<Navbar.Brand>
          			Googly
          		</Navbar.Brand>
          </Navbar.Header>
          <NavItem>
            <LogoutButton />
          </ NavItem>
      </Navbar>
    );
  }
}

export default NavigationBar;
