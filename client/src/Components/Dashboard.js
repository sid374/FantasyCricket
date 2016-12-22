import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './NavigationBar';
import { browserHistory } from 'react-router'


class Dashboard extends Component {
	componentWillReceiveProps(nextProps){
		console.log("Dashboard will receive props");
		if(nextProps.loginUserSuccess === false)
			browserHistory.push('/')
	}
    render() {
    	console.log("rendering dashboard");
        return(
            <div>
            	<Navbar />
                <h1>
                    You are logged in!
                </h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginUserSuccess: state.LoginUser.success,
        loginUserErrored: state.LoginUser.hasErrored,
        loginUserInProgress: state.LoginUser.inProgress
    };
};

export default connect(mapStateToProps)(Dashboard);



