import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import { connect } from 'react-redux';

//import '../stylesheets/bootstrap.min.css';

class NavigationBar extends Component {
  render() {
    return (
    <Navbar inverse collapseOnSelect fluid={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#" style={{color:'#3F51B5', fontSize:"300%"}}><strong>GOOGLY</strong></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">{this.props.loginUserSuccess && <LogoutButton />}</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        loginUserSuccess: state.LoginUser.success,
    };
};


export default connect(mapStateToProps)(NavigationBar);
