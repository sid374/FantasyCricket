import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import Login from './Login';
import Signup from './Signup';
import Navbar from './NavigationBar';

import TeamSelector from './TeamSelector';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {
    render() {
        return(
            <div>
                <h1>
                    You are logged in!
                </h1>
            </div>
        );
    }
}
 
<Signup />

export default Dashboard;



