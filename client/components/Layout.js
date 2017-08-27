import React from 'react';
import NavigationBar from './NavigationBar';

class Layout extends React.Component {
    
    constructor(){
        super();
    }


    render(){
      return (
        <div className="container">

            <div className="app-header">
                <NavigationBar pageTitle={this.props.pageTitle} isLoggedIn={this.props.isLoggedIn}/>
            </div>

            <div className="app-content">

                {this.props.children}

            </div>

        </div>
    )};
}

export default Layout;