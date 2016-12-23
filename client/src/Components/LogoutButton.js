import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { logoutUser } from '../Actions/LoginActions'

/*
    Simple login form with username and password field. 
    On form submit it dispatches login action, which talks to the api and sends the appropriate actions.
*/

class LogoutButton extends Component {
    componentWillReceiveProps(){
        console.log("Logout button will receive props")
    }
    
    render() {
        return(
            <div>
                <FlatButton label="Logout" 
                backgroundColor="red"
                onTouchTap={this.props.logout}/>
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

const mapDispatchToProps = (dispatch) => {
     return{
         logout: (user, pw) => {
            dispatch(logoutUser());
         }
     };
 };
 
 
export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

 



