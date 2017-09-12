import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginStore from '../stores/LoginStore'

class NavigationBar extends React.Component {
    
    render(){

        const isLoggedIn = LoginStore.isLoggedIn();
        var navBarContent;

        if (!isLoggedIn) {
            navBarContent = (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>
                    </li>
                </ul>
            )
        }
        else {
            navBarContent = (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/todos" className="nav-link" activeClassName="active">Todos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/leaderboard" className="nav-link" activeClassName="active">Leaderboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/logout" className="nav-link" activeClassName="active">Logout</NavLink>
                    </li>
                </ul>
            )
        }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            
            <NavLink to="/" className="navbar-brand" >{this.props.pageTitle}</NavLink>
            
            <div className="container-fluid">
                {navBarContent}
            </div>
        </nav>
    )


    }

}

export default NavigationBar;