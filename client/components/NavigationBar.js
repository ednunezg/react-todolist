import React from 'react';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component {
    
    render(){

        const isLoggedIn = this.props.isLoggedIn;
        var navBarContent;

        if (!isLoggedIn) {
            navBarContent = (
                <ul className="nav navbar-nav">
                    <li><NavLink to="/login" activeClassName="strong">Login</NavLink></li>
                    <li><NavLink to="/register" activeClassName="strong">Register</NavLink></li>
                </ul>
            )
        }
        else {
            navBarContent = (
                <ul className="nav navbar-nav">
                <li><NavLink to="/" activeClassName="strong">Home</NavLink></li>
                <li><NavLink to="/todos" activeClassName="strong">Todos</NavLink></li>
                <li><NavLink to="/leaderboard" activeClassName="strong">Leaderboard</NavLink></li>
                </ul>
            )
        }

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand"> {this.props.pageTitle} </a>
                </div>
                {navBarContent}
            </div>
        </nav>
    )


    }

}

export default NavigationBar;