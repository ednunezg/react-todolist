import request from 'superagent';
import hello from 'hellojs';

import Constants from '../constants'

import AlertActions from  '../actions/AlertActions';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';


class AuthService {
  
  constructor(){
    hello.init({
      facebook: Constants.FACEBOOK_APP_ID,
      google: Constants.GOOGLE_APP_ID
    }, {redirect_uri: 'redirect.html'});
    
  }

  loginLocal(username, password, history) {
    
    request
    .post(Constants.LOGIN_URL_LOCAL)
    .send({username: username, password: password})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) {
                AlertActions.displayMessage('warning', res.body.message);
            }
            else{
                AlertActions.displayMessage('error', 'Can not login user at this time. Server might be down.');                                                
            }
        }
        else{
          LoginActions.loginUser(res.body.token);
          history.push('/');
          AlertActions.displayMessage('success', res.body.message);
        }
    });            
  }

  loginFacebook(history) {
    
    hello('facebook').login().then(function() {

      //Get the access token after login
      var session = hello('facebook').getAuthResponse();
      var socialtoken = session.access_token;

      //Make server request to login
      request
      .post(Constants.LOGIN_URL_FACEBOOK)
      .send({socialtoken: socialtoken})
      .end( (err, res) => {
          if(err || !res.ok){
              if(res.body.message) {
                  AlertActions.displayMessage('warning', res.body.message);
              }
              else{
                  AlertActions.displayMessage('error', 'Can not login user at this time. Server might be down.');                                                
              }
          }
          else{
            LoginActions.loginUser(res.body.token);
            history.push('/');
            AlertActions.displayMessage('success', res.body.message);
          }
      }); 

    }, function(e){
      AlertActions.displayMessage('error', e.error.message);
    });
    
  }

  loginGoogle(history) {
    
    hello('google').login({ scope: 'email' }).then(function() {

      //Get the access token after login
      var session = hello('google').getAuthResponse();
      var socialtoken = session.access_token;

      //Make server request to login
      request
      .post(Constants.LOGIN_URL_GOOGLE)
      .send({socialtoken: socialtoken})
      .end( (err, res) => {
          if(err || !res.ok){
              if(res.body.message) {
                  AlertActions.displayMessage('warning', res.body.message);
              }
              else{
                  AlertActions.displayMessage('error', 'Can not login user at this time. Server might be down.');                                                
              }
          }
          else{
            LoginActions.loginUser(res.body.token);
            history.push('/');
            AlertActions.displayMessage('success', res.body.message);
          }
      }); 

    }, function(e){
      AlertActions.displayMessage('error', e.error.message);
    });
    
  }
  logout() {
    LoginActions.logoutUser();
  }

  isLoggedIn(){
    LoginStore.isLoggedIn();
  }
}

export default new AuthService()
