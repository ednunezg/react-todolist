'use strict';

import React from 'react';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute} from '../modules/CustomRoutes'

//Constants
import Constants from '../constants'

//Stores
import LoginStore from '../stores/LoginStore'
import AlertStore from '../stores/AlertStore'

//Actions
import LoginActions from '../actions/LoginActions'
import AlertActions from '../actions/AlertActions'

//Components
import Layout from './Layout';

//Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodolistPage from '../pages/TodolistPage';
import NotfoundPage from '../pages/NotfoundPage';
import LogoutPage from '../pages/LogoutPage';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      pageTitle: Constants.PAGE_TITLE,   
      isLoggedIn: LoginStore.isLoggedIn(),
      alertMessage: {
        type: null,
        content: null
      }
    };

    //Listen to route changes
    this.props.history.listen((location, action) => {
      console.log("Route Changed!");
      AlertActions.removeMessage();
    });

    //Expost the stores and actions globally for debugging
    window.LoginStore = LoginStore;
    window.LoginActions = LoginActions;
    window.AlertStore = AlertStore;
    window.AlertActions = AlertActions;
  };

  componentDidMount() {
    this.loginChange = () => { 
      this.setState( {isLoggedIn: LoginStore.isLoggedIn()}) 
    };
    this.alertChange = () => {
      // if(AlertStore.alertExists()){
        this.setState( {alertMessage: AlertStore.obtainAlertMessage()} );
        // AlertActions.removeMessage();

      // }
    };
    LoginStore.addChangeListener(this.loginChange);
    AlertStore.addChangeListener(this.alertChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.loginChange);
    AlertStore.removeChangeListener(this.alertChange);    
  }

  
  render() {
    return (

      <Layout pageTitle={this.state.pageTitle} alertMessage={this.state.alertMessage}>
          <Switch>
            <PrivateRoute exact path="/" redirectTo="/login" component={HomePage}/>
            {<PropsRoute path="/login" component={LoginPage} />}
            <PropsRoute path="/register" component={RegisterPage}/>
            <PrivateRoute path="/todos" redirectTo="/login" component={TodolistPage}/>
            <PropsRoute path="/logout" redirectTo="/login" component={LogoutPage}/>
            <Route component={NotfoundPage}/>
          </Switch>
      </Layout>

  )};

}

export default App; 