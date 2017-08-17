import React from 'react';

class LoginPage extends React.Component {
    
    render(){
      return (
        <div>
            <h1> This is a page that supposedly ask you to login in </h1>
        
            <button className="btn btn-default" onClick={this.props.loginHandler}>Click here to log In</button>
                        
        </div>
    )}
}

export default LoginPage;