import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'

class Login extends Component {
    render() {
        let greeting = "Hello Stranger";
        if(this.props.isLoggedIn)
            greeting = "Hello "+this.props.username;

        return(
            <div>            
                {greeting}
                <form action="#">
                    <input type="text" ref = {node => this.username = node} placeholder="Username"/>
                    <input type="text" ref = {node => this.password = node} placeholder="Password"/>
                    <button onClick={() => {this.props.signInClick(this.username.value, this.password.value)}}>
                        Sign in 
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToLinkProps = (state) => {
    return {
        isLoggedIn: state.UserLogin.isLoggedIn,
        username: state.UserLogin.username
    };
};

const mapDispatchToLinkProps = (dispatch) => {
     return{
         signInClick: (user, pw) => {
            dispatch(signInUser(user, pw));
         }
     };
 };
 
export default connect(mapStateToLinkProps, mapDispatchToLinkProps)(Login);



