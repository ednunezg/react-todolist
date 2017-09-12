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
        this.login = this.login.bind(this);        
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

    login(event){
        event.preventDefault();                
        LoginActions.loginUser(this.state.user.username);
    }


    render(){
      return (
        <div>
            <h1 className="page-title"> Login </h1>

            <LoginForm 
                onSubmit={this.processForm}
                onChange={this.updateUser}
                errors={this.state.errors}
                user={this.state.user}
            />

            <hr />

            <a className="btn loginBtn loginBtn--facebook" href="/auth/login/facebook"> Log in with Facebook </a>
            <a className="btn loginBtn loginBtn--google" href="/auth/login/google"> Log in with Google </a>

            <hr />

        </div>
    )}
}

export default withRouter(LoginPage);