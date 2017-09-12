import React from 'react';
import { NavLink } from 'react-router-dom';
import AlertActions from '../actions/AlertActions'

class NotloggedinPage extends React.Component {
    

    componentWillMount(){
        this.props.history.push(this.props.redirectTo);
        AlertActions.displayMessage('warning', 'You are not authorized to view this page without logging in');                        
        
    }

    render(){
      return null;
    }
}

export default NotloggedinPage;