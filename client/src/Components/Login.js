import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { loginUser } from '../Actions/LoginActions'
import { browserHistory } from 'react-router'

/*
    Simple login form with username and password field. 
    On form submit it dispatches login action, which talks to the api and sends the appropriate actions.
*/

class Login extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
            e.preventDefault();
            this.props.logInClick(e.target[0].value, e.target[1].value);
        }
    render() {
        let resultMessage = ""
        if(this.props.loginUserErrored == true)
            resultMessage = "Login Failed, Please try again";
        else if(this.props.loginUserSuccess == true){
            resultMessage = "Login successful!"
            browserHistory.push('/dashboard')
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField floatingLabelText="Username"/><br/>
                    <TextField floatingLabelText="Password"
                                type="password"/><br/>
                    <FlatButton label="Log in" type="submit"/>
                </form>
                {resultMessage}
            </div>
        );
    }
}


const mapStateToLinkProps = (state) => {
    return {
        loginUserSuccess: state.LoginUser.success,
        loginUserErrored: state.LoginUser.hasErrored,
        loginUserInProgress: state.LoginUser.inProgress
    };
};

const mapDispatchToLinkProps = (dispatch) => {
     return{
         logInClick: (user, pw) => {
            dispatch(loginUser(user, pw));
         }
     };
 };
 
export default connect(mapStateToLinkProps, mapDispatchToLinkProps)(Login);

 



