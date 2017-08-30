import React from 'react';
import TextInput from './form_components/TextInput'

class LoginForm extends React.Component {
    
    render(){

      const errors = this.props.errors;
      const user = this.props.user;      
      const onChange = this.props.onChange;
      const onSubmit = this.props.onSubmit;
      

      return (
        <div id="login-form">

          <p className="login-form-errors">{errors.main}</p>

          <form className="col-md-4" action="/" onSubmit={onSubmit}>
            
            <TextInput 
              label="Username"
              id="username"
              name="username"
              onChange={onChange}
              value={user.username}
              error={errors.username}
              type="text"
            />
            
            <TextInput 
              label="Password"
              id="password"
              name="password"
              onChange={onChange}
              value={user.password}
              error={errors.password}
              type="password"
            />

            <div className="form-group">
              <button type="submit" className="btn btn-outline-info">Submit</button>
            </div>

          </form>
                
        </div>
    )}
}

export default LoginForm;