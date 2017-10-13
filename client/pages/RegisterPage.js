import React from 'react';
import RegisterForm from '../components/RegisterForm'
import AlertActions from '../actions/AlertActions'
import AuthService from '../services/AuthService'
import Constants from '../constants'
import request from 'superagent';
import {withRouter} from "react-router-dom";

class RegisterPage extends React.Component {


    constructor(props){
        super(props);

        //Set the initial state of the component
        this.state = {
            errors: { },
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password1: '',
                password2: ''
            }
        };
        this.updateUser = this.updateUser.bind(this);
        this.processForm = this.processForm.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);        
        this.loginGoogle = this.loginGoogle.bind(this);                

    }
    
    processForm(event) {
        event.preventDefault();

        //1. Front end validation
        const user = this.state.user;
        var errors = {};

            //1a. Name fields
            if(user.firstname == ''){
                errors["firstname"] = 'First name can not be empty'
            }
            else{
                delete errors["lastname"];
            }

            if(user.lastname == ''){
                errors["lastname"] = 'Last name can not be empty'
            }
            else{
                delete errors["lastname"];
            }

            //1b. Email field
            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if(user.email == ''){
                errors["email"] = 'Email can not be empty'
            }
            else if(!email_regex.test(user.email)){
                errors["email"] = 'Email is invalid'
            }
            else{
                delete errors["email"];
            }
        
            //1c. Username
            var username_regex = new RegExp('[a-z0-9]');        
            if(user.username == ''){
                errors["username"] = 'Username field can not be empty'
            }
            else if(!username_regex.test(user.username)){
                errors["username"] = "Only alpha numerical characters allowed (A-Z, a-z, 0-9)"
            }
            else{
                delete errors["username"];
            }

            //1d. Password(s)
            var password_regex_1 = new RegExp('[a-z]'); //Contains at least one letter
            var password_regex_2 = new RegExp('[0-9]'); //Contains at least one digit
            var password_regex_3 = new RegExp("\\s"); //Contains whitespace
            
            if(user.password1 == ''){
                errors["password1"] = 'Password field can not be empty'
            }
            else if(user.password1 != user.password2){
                errors["password2"] = "Passwords don't match";
            }
            else if(user.password1.length<8){
                errors["password1"] = "Password must contain at least eight characters";
            }
            else if(!password_regex_1.test(user.password1)){
                errors["password1"] = "Password must contain at least one letter";
            }
            else if(!password_regex_2.test(user.password1)){
                errors["password1"] = "Password must contain at least one digit";
            }
            else if(password_regex_3.test(user.password1)){
                errors["password1"] = "Password can not contain spaces";
            }
            else{
                delete errors["password1"];
                delete errors["password2"];
            }
        
            //If there no errors, continue
            if(Object.keys(errors).length != 0){ 
                AlertActions.displayMessage('warning', 'Please fix the errors in the form');
                this.setState({ errors: errors })                
                return;
            }
            

        //2. Back end request
        request
            .post(Constants.REGISTER_URL_LOCAL)
            .send(user)
            .end( (err, res) => {
                console.log("err = " + JSON.stringify(err));
                console.log("res = " + JSON.stringify(res));

                if(err || !res.ok){
                    if(res.body.message) {
                        AlertActions.displayMessage('warning', res.body.message);
                        for (var i = 0; i < res.body.errors.length; i++) {
                            errors[res.body.errors[i].param] = res.body.errors[i].msg;
                        }
                        this.setState({ errors: errors });                                
                    }
                    else{
                        AlertActions.displayMessage('error', 'Can not register user at this time. Server might be down.');                                                
                    }
                }
                else{
                    this.props.history.push('/login')
                    AlertActions.displayMessage('success', res.body.message);
                }
            });            
    }
    
    
    updateUser(event){
        //Updated user state
        const field = event.target.name;
        const updatedUser = this.state.user;
        updatedUser[field] = event.target.value;
        this.setState({ user: updatedUser })
    }

    loginFacebook(event){
        event.preventDefault();                
        AuthService.loginFacebook(this.props.history);
    }

    loginGoogle(event){
        event.preventDefault();                
        AuthService.loginGoogle(this.props.history);
    }



    render(){
      return (
        <div className="row justify-content-center">

            <div className="card col-md-6">
            <div className="card-body text-center">

                <h3 className="card-title text-left">Register</h3>

                <br />

                <RegisterForm
                onSubmit={this.processForm}
                onChange={this.updateUser}
                errors={this.state.errors}
                user={this.state.user}
                />

                <hr />

                <button className="btn loginBtn loginBtn--facebook" onClick={this.loginFacebook}>
                    Log in with Facebook
                </button>
                
                <button className="btn loginBtn loginBtn--google" onClick={this.loginGoogle}>
                    Log in with Google
                </button>

                <hr />

                <p className="text-justify">
                <small> By logging in with your Facebook or Google account, you are giving this website permission
                    to obtain your name and email. Your personal information will not be shared with anyone.</small>
                </p>

            </div>
            </div>
        </div>

    )}
}

export default withRouter(RegisterPage);