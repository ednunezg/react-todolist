import React, {PropTypes} from 'react';
import AuthService from '../services/AuthService'
import AlertActions from '../actions/AlertActions'
import {withRouter} from "react-router-dom";


class LogoutPage extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentWillMount(){
        AuthService.logout();
        this.props.history.push(this.props.redirectTo);
        AlertActions.displayMessage('success','You have been logged out');        
    }

    render(){
        return <div> </div>;
    }
}

export default withRouter(LogoutPage);