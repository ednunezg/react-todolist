import request from 'superagent';
import when from 'when';
import Constants from '../constants'

import AlertActions from  '../actions/AlertActions';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';


class AuthService {

  loginLocal(username, password, history) {
    
    request
    .post(Constants.LOGIN_URL_LOCAL)
    // .send({username: username, password: password})
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

  logout() {
    LoginActions.logoutUser();
  }

  isLoggedIn(){
    LoginStore.isLoggedIn();
  }
}

export default new AuthService()
