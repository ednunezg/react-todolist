import AuthService from '../services/AuthService'
import Constants from '../constants.js'
import React from 'react';
import LoginForm from '../components/LoginForm'
import LoginActions from '../actions/LoginActions'
import LoginStore from '../stores/LoginStore'
import {withRouter} from "react-router-dom";


import AlertActions from '../actions/AlertActions'


import request from 'superagent';

class LoginPage extends React.Component {
    
    constructor(props){
        super(props);

        //Set the initial state of the component
        this.state = {
            errors: {
                
            },
            user: {
                username: '',
                password: ''
            },
        };
        this.loginFacebook = this.loginFacebook.bind(this);        
        this.loginGoogle = this.loginGoogle.bind(this);                
        this.processForm = this.processForm.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        //1. Front end validation
        const user = this.state.user;
        var errors = {};

        if(user.username == ''){
            errors["username"] = 'Username field can not be empty'
        }
        if(user.password == ''){
            errors["password"] = 'Password field can not be empty'
        }

        if(Object.keys(errors).length != 0){  
            this.setState({ errors: errors })                    
            AlertActions.displayMessage('warning', 'Fix the errors in the form before proceding');
            return;
        }
        
        //2. Back end request
        AuthService.loginLocal(this.state.user.username, this.state.user.password, this.props.history);
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

                <h3 className="card-title text-left">Login</h3>

                <br/>

                <LoginForm 
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

export default withRouter(LoginPage);