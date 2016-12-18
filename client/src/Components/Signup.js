import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../Actions/AuthActions';


class Signup extends Component {
    render() {
        return(
            <div>
                <form action="#">
                        <input type="text" ref = {node => this.username = node} placeholder="Username"/>
                        <input type="text" ref = {node => this.password = node} placeholder="Password"/>
                        <input type="text" ref = {node => this.email = node} placeholder="Email"/>
                        <button onClick={() => {
                            this.props.signUpClick(this.username.value, 
                                this.password.value, 
                                this.email.value);
                        }}>
                            Sign Up
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
         signUpClick: (user, pw, email) => {
            dispatch(registerUser(user, pw, email));
         }
     };
 };
 
export default connect(mapStateToLinkProps, mapDispatchToLinkProps)(Signup);




