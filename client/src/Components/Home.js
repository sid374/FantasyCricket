import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import Login from './Login';

class Home extends Component {
    render() {
        return(
            <div>
                <h1>
                    Welcome to Sid's Fantasy Cricket!
                </h1>
               <Login/>
            </div>
        );
    }
}
 
export default Home;



