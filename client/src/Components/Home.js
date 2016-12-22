import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import Navbar from './NavigationBar';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {
    render() {
        console.log("Rendering home");
        return(
            <div>
                <Navbar />
                    <Grid fluid={false}>
                        <Row className="Header">
                            <Col sm={12} style={{backgroundColor:'green'}}>
                            <h1>
                                Welcome to Sid's Fantasy Cricket! 
                            </h1>
                            </Col>
                        </Row>
                        <Row className="Comps">
                            <Col sm={4}>
                                Login to get started!
                                <Login />
                            </Col>
                            <Col sm={4}>
                                Don't have an account? sign up it's fast and easy!
                                <Signup />
                            </Col>
                        </Row>
                    </Grid>
                    {this.props.route.message}
                    <div>
                        <div style={{display: 'inline-block'}}></div>
                        <div style={{display: 'inline-block'}}></div>
                    </div>
                
            </div>
        );
    }
}
 
export default Home;



