import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class NavigationBar extends Component {
  render() {
    return (
    	<Navbar>
        	<Navbar.Header>
          		<Navbar.Brand>
          			Fantasy Cricket
          		</Navbar.Brand>
         	</Navbar.Header>

      		<Nav pullRight>
        		<Button bsStyle="success">Login</Button>
     		</Nav>
      	</Navbar>
    );
  }
}

export default NavigationBar;
