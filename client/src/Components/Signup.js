import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../Actions/AuthActions';
// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';


class SignupForm extends Component{
    constructor(){
        super();
        this.state = {
            Username:'',
            Password: '',
            ConfirmPassword: '',
            Email: '',
            UsernameError: '',
            PasswordError: '',
            EmailError: '',
            ConfirmPasswordError: ''
        }
        this.usernameUpdate = this.usernameUpdate.bind(this);
        this.emailUpdate = this.emailUpdate.bind(this);
        this.passwordUpdate = this.passwordUpdate.bind(this);
        this.confirmPasswordUpdate = this.confirmPasswordUpdate.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    usernameUpdate(e){
        if(e.target.value.length < 7)
            this.setState({UsernameError: "Min Length 7"});
        else
            this.setState({UsernameError: ""});

        this.setState({Username: e.target.value});
    }

    emailUpdate(e){
        this.setState({Email: e.target.value});
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if(!re.test(e.target.value))
            this.setState({EmailError: "Please enter a valid email"});
        else
            this.setState({EmailError: ""});
    }

    confirmPasswordUpdate(e){
        if(e.target.value !== this.state.Password)
            this.setState({ConfirmPasswordError: "Passwords should match"});
        else
            this.setState({ConfirmPasswordError: ""});

        this.setState({ConfirmPassword: e.target.value});
    }

    passwordUpdate(e){
        if(e.target.value.length < 7)
            this.setState({PasswordError: "Min Length 7"});
        else
            this.setState({PasswordError: ""});

        if(e.target.value !== this.state.ConfirmPassword)
            this.setState({ConfirmPasswordError: "Passwords should match"});
        else
            this.setState({ConfirmPasswordError: ""});
        


        this.setState({Password: e.target.value});
    }

    clearState(){
        this.setState({
            Username:'',
            Password: '',
            ConfirmPassword: '',
            Email: '',
            UsernameError: '',
            PasswordError: '',
            EmailError: '',
            ConfirmPasswordError: ''
        });
    }

    render(){
        let validationSucceeded=false;
        if(this.state.Password.length !== 0 && this.state.Email.length !==0 && this.state.Username.length !== 0 &&
            this.state.PasswordError.length ===  0 && this.state.EmailError.length === 0 && this.state.UsernameError.length === 0)
            validationSucceeded=true;

        const customContentStyle={
            width: '300px'
        };

        const clearStateAndClose=() => {
            this.clearState();
            this.props.handleClose();
        }

        const formActions=[
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={clearStateAndClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={false/*!validationSucceeded*/}
            onTouchTap={()=> {
                this.props.signUpClick(this.state.Username, this.state.Password, this.state.Email);
                clearStateAndClose();
            }}
          />,
        ];

        return(
            <div>
                <Dialog
                    title="Sign Up"
                    actions={formActions}
                    modal={true}
                    open={this.props.open}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}>
                    <TextField onChange={this.usernameUpdate} 
                          floatingLabelText="Username"
                          value={this.state.Username}
                          errorText={this.state.UsernameError}
                        /><br />
                    <TextField onChange={this.emailUpdate} 
                          floatingLabelText="Email"
                          value={this.state.Email}
                          errorText={this.state.EmailError}
                        /><br />
                    <TextField onChange={this.passwordUpdate} 
                          floatingLabelText="Password"
                          value={this.state.Password}
                          type="password"
                          errorText={this.state.PasswordError}
                        /><br />
                    <TextField onChange={this.confirmPasswordUpdate} 
                          floatingLabelText="Confirm Password"
                          type="password"
                          value={this.state.ConfirmPassword}
                          errorText={this.state.ConfirmPasswordError}
                        /><br />
                </Dialog>
            </div>

            )
    }
}


class SignupButton extends Component{
    constructor(props){
        super(props);
        this.state = {open:false, };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen() {
        this.setState({open:true});
    }

    handleClose (){
        this.setState({open:false});
    }

    render(){
        let snackBarMessage = ""
        if(this.props.registerUserSuccess){
            snackBarMessage = "Welcome to the wonderful world of fantasy cricket!"
        }
        else if(this.props.registerUserErrored){
            snackBarMessage = "Whooops! Looks like you've already registered."
        }

        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <SignupForm open={this.state.open} 
                                    handleClose={this.handleClose} 
                                    signUpClick={this.props.signUpClick}/>
                        <RaisedButton label="Sign Up" onTouchTap={()=>{this.handleOpen()}}/>
                        <Snackbar
                          open={this.props.registerUserSuccess || this.props.registerUserErrored}
                          message={snackBarMessage}
                          autoHideDuration={4000}
                          onRequestClose={this.handleRequestClose}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        registerUserSuccess: state.RegisterUser.success,
        registerUserErrored: state.RegisterUser.hasErrored,
        registerUserInProgress: state.RegisterUser.inProgress
    };
};

const mapDispatchToProps = (dispatch) => {
     return{
         signUpClick: (user, pw, email) => {
            dispatch(registerUser(user, pw, email));
         }
     };
 };
 
export default connect(mapStateToProps, mapDispatchToProps)(SignupButton);




