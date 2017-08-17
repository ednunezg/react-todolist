'use strict';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute} from '../modules/CustomRoutes'

import AppContainer from './AppContainer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import TodolistPage from '../pages/TodolistPage';
import NotfoundPage from '../pages/NotfoundPage';


class App extends React.Component {
  
  constructor(){
      super();
      this.state = {
        isLoggedIn: false,
        pageTitle: "My Awesome Todo App"
      };
      this.loginHandler = this.loginHandler.bind(this);
    };

  loginHandler(e){
    e.preventDefault();
    this.setState({isLoggedIn: true});
  }
  
  render() {
    return (

    <BrowserRouter>
      <AppContainer pageTitle={this.state.pageTitle} isLoggedIn={this.state.isLoggedIn} loginHandler={this.loginHandler}>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <PropsRoute path="/login" component={LoginPage} loginHandler={this.loginHandler} />
            <PrivateRoute path="/todos" redirectTo="/login" component={TodolistPage}/>
            <Route component={NotfoundPage}/>
          </Switch>
      </AppContainer>
    </BrowserRouter>

  )};

}
export default App; 