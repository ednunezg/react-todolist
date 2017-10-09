import React from 'react';
import LoginTextInput from './form_components/LoginTextInput'

class LoginForm extends React.Component {
    
    render(){

      const errors = this.props.errors;
      const user = this.props.user;      
      const onChange = this.props.onChange;
      const onSubmit = this.props.onSubmit;
      

      return (
        <div id="login-form" >
        
          <p className="login-form-errors">{errors.main}</p>

          <form action="/" onSubmit={onSubmit}>
            

            <LoginTextInput 
              label="👤"
              placeholder="Username"
              id="username"
              name="username"
              onChange={onChange}
              value={user.username}
              error={errors.username}
              type="text"
            />
            
            <LoginTextInput 
              label="🗝"
              placeholder="Password"
              id="password"
              name="password"
              onChange={onChange}
              value={user.password}
              error={errors.password}
              type="password"
            />


            <div className="form-group">
              <button type="submit" className="btn btn-outline-secondary">Login</button>
            </div>

          </form>
        
        </div>
    )}
}

export default LoginForm;