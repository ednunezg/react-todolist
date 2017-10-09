import React from 'react';

class LoginTextInput extends React.Component {
    
    constructor(){
        super();
    }

    render(){

      var formgroupStyle = {
        paddingBottom: '1em'
      }
      var feedbackStyle = {
        position:'absolute',
        left: 0,
        top: '2.5em',
      }

      return (
        <div className="form-group" style={formgroupStyle}>
          <div className="input-group">
          
          <span className="input-group-addon" id={this.props.id + '-addon'}>{this.props.label}</span>

          <input name={this.props.name}
                id={this.props.id}
                onChange={this.props.onChange}
                value={this.props.value}
                className={'form-control ' + (this.props.error && 'is-invalid')}
                type={this.props.type}
                placeholder={this.props.placeholder}
                aria-describedby={this.props.id + '-addon'}
          />
          
          <span className="invalid-feedback" style={feedbackStyle}>
          {this.props.error}
          </span>
        
        </div>


        </div>
    )};
}

export default LoginTextInput;