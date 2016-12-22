import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
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

      		<Nav pullRight>
     		   </Nav>
      	</Navbar>
    );
  }
}

export default NavigationBar;
