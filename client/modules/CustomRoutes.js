import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginStore from '../stores/LoginStore';
import NotloggedinPage from '../pages/NotloggedinPage'

  /*
    Routing for components that require properties
  */

  var renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }


  var PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>
    );
  }


  /* 
    Route for protected pages.
    Here's an example of how to use it: (taken from https://github.com/ReactTraining/react-router/issues/4105) 

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute path='/allbooks' component={Books} booksGetter={getAllBooks} />
            <PrivateRoute path='/mybooks' component={Books} redirectTo="/" booksGetter={getMyBooks} />
            <PrivateRoute path='/trades' component={Trades} redirectTo="/" user={user} />
          </Switch>
        </Router>

  */

  var PrivateRoute = ({ history, component, redirectTo, ...rest }) => {
    
    if(LoginStore.isLoggedIn()){
      return <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest) }/>;
    }
    else{
      return <Redirect to={redirectTo}/>
    }

  }

export {PropsRoute, PrivateRoute}