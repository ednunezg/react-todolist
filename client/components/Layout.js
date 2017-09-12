import React from 'react';
import NavigationBar from './NavigationBar';
import AlertMessage from './AlertMessage'


class Layout extends React.Component {
        
    render(){
      return (
        <div className="container">

            <div className="app-header">
                <NavigationBar pageTitle={this.props.pageTitle} isLoggedIn={this.props.isLoggedIn}/>
                <AlertMessage type={this.props.alertMessage.type} content={this.props.alertMessage.content}/>
            </div>

            <div className="app-content">
                {this.props.children}
            </div>

        </div>
    )};
}

export default Layout;