import React from 'react';
import LoginForm from '../components/LoginForm'

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
            }
        };
        this.processForm = this.processForm.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        //1. Front end validation
        const user = this.state.user;
        var newErrors = {};

        if(user.username == ''){
            newErrors["username"] = 'Username field can not be empty'
        }
        if(user.password == ''){
            newErrors["password"] = 'Password field can not be empty'
        }
        this.setState({ errors: newErrors })

        //2. Back end request

    }


    updateUser(event){
        //Updated user state
        const field = event.target.name;
        const updatedUser = this.state.user;
        updatedUser[field] = event.target.value;
        this.setState({ user: updatedUser })
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

            <button className="btn btn-outline-info" onClick={this.props.loginHandler}>Fake Log In</button>

        </div>
    )}
}

export default LoginPage;