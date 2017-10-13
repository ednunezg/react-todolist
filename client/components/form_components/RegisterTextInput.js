import React from 'react';

class RegisterTextInput extends React.Component {
    
    constructor(){
        super();
    }

    render(){
      return (
        <div className="form-group text-left">

          <label htmlFor={this.props.id}> {this.props.label}</label>

          <input name={this.props.name}
                id={this.props.id}
                onChange={this.props.onChange}
                value={this.props.value}
                className={'form-control ' + (this.props.error && 'is-invalid')}
                type={this.props.type}
          />
          
          <div className="invalid-feedback">
            {this.props.error}
          </div>

        </div>
    )};
}

export default RegisterTextInput;