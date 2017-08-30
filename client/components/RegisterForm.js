import React from 'react';
import TextInput from './form_components/TextInput'
import SubmitButton from './form_components/SubmitButton'



class RegisterForm extends React.Component {
    

    render(){
    
    const errors = this.props.errors;
    const user = this.props.user;      
    const onChange = this.props.onChange;
    const onSubmit = this.props.onSubmit;  
    
    return (
    
    <div id="register-form">

        <p className="login-form-errors">{errors.main}</p>

        <form action="/" className="col-md-4" onSubmit={onSubmit}>

            <div className="row">
                <div className="col-md-6">
                    <TextInput 
                        label="First name"
                        id="firstname" name="firstname"
                        onChange={onChange}
                        value={user.firstname}
                        error={errors.firstname}
                        type="text"
                    />
                </div>
                
                <div className="col-md-6">
                    <TextInput 
                        label="Last name"
                        id="lastname" name="lastname"
                        onChange={onChange}
                        value={user.lastname}
                        error={errors.lastname}
                        type="text"
                    />
                </div>
            </div>

            <TextInput 
                label="Email"
                id="email" name="email"
                onChange={onChange}
                value={user.email}
                error={errors.email}
                type="text"
            />

            <TextInput 
                label="Username"
                id="username" name="username"
                onChange={onChange}
                value={user.username}
                error={errors.username}
                type="text"
            />

            <TextInput 
                label="Password"
                type="password"
                id="password1" name="password1"
                onChange={onChange}
                value={user.password1}
                error={errors.password1}
            />

            <TextInput 
                label="Re-enter password"
                type="password"
                id="password2" name="password2"
                onChange={onChange}
                value={user.password2}
                error={errors.password2}
            />
        
            <SubmitButton />            
        </form>

    </div>
    )}
}

export default RegisterForm;