'use strict';

import React from 'react';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute} from '../modules/CustomRoutes'
import { withRouter } from 'react-router-dom';



import Layout from './Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodolistPage from '../pages/TodolistPage';
import NotfoundPage from '../pages/NotfoundPage';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      pageTitle: "My Awesome Todo App",
      flashMessage: {
        type: null,
        content: null
      }
    };

    //Bind functions passed down to other components
    this.loginHandler = this.loginHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    
    //Listen to route changes
    this.props.history.listen((location, action) => {
      //Remove flash message on route change
      console.log("Route Changed!");
      this.setState({flashMessage: { type:null, content:null }})
      });
  };

 
  loginHandler(e){
    e.preventDefault();
    this.setState({isLoggedIn: true});
    this.setState({flashMessage: {
      type:"success",
      content:"You are now succesfully logged in"
    }})
    this.updateFlashMessage("success", "You are now succesfully logged in");
  }

  registerHandler(e){
    e.preventDefault();
    this.setState({isLoggedIn: true});
    this.setState({flashMessage: {
      type:"success",
      content:"You are now succesfully logged in"
    }})
    this.updateFlashMessage("success", "You are now succesfully logged in");
  }

  updateFlashMessage(msgType, msgContent){
    this.setState({flashMessage: {
      type:msgType,
      content:msgContent
    }})
  }
  
  render() {
    return (

      <Layout pageTitle={this.state.pageTitle} isLoggedIn={this.state.isLoggedIn} flashMessage={this.state.flashMessage}>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <PropsRoute path="/login" component={LoginPage} loginHandler={this.loginHandler} />
            <PropsRoute path="/register" component={RegisterPage} registerHandler={this.registerHandler} />
            <PrivateRoute path="/todos" redirectTo="/login" component={TodolistPage}/>
            <Route component={NotfoundPage}/>
          </Switch>
      </Layout>

  )};

}

export default App; 