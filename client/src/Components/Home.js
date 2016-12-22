import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import Login from './Login';
import Signup from './Signup';
import Navbar from './NavigationBar';

import TeamSelector from './TeamSelector';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
    render() {
        console.log("Rendering home");
        return(
            <div>
                <Navbar />
                <h1>
                    Welcome to Sid's Fantasy Cricket! 
                    {this.props.route.message}
                    <div>
                        <div style={{display: 'inline-block'}}><Login /></div>
                        <div style={{display: 'inline-block'}}><Signup /></div>
                    </div>
                </h1>
            </div>
        );
    }
}
 
<Signup />

export default Home;



