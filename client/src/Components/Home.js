import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import Login from './Login';
import Signup from './Signup';
import TeamSelector from './TeamSelector';

class Home extends Component {
    render() {
        return(
            <div>
                <h1>
                    Welcome to Sid's Fantasy Cricket!
                </h1>
               <Signup />
            </div>
        );
    }
}
 
export default Home;



