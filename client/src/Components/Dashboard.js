import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './NavigationBar';
import SelectSeries from './SelectSeries';
import { browserHistory } from 'react-router';


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
                <SelectSeries / >
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



