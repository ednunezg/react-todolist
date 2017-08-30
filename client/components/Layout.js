import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessage from './FlashMessage';

class Layout extends React.Component {
    
    constructor(){
        super();
    }

    render(){
      return (
        <div className="container">

            <div className="app-header">
                <NavigationBar pageTitle={this.props.pageTitle} isLoggedIn={this.props.isLoggedIn}/>
                <FlashMessage flashMessage={this.props.flashMessage} />
            </div>

            <div className="app-content">
                {this.props.children}
            </div>

        </div>
    )};
}

export default Layout;