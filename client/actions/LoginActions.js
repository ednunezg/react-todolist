import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

  loginUser: (jwt) => {

    AppDispatcher.dispatch({
      type: 'LOGIN_USER',
      jwt: jwt  //TODO: For now, we simply pass the name of the user, we have to change this to a JWT
    });

  },


  logoutUser: () => {
    
    AppDispatcher.dispatch({
      type: 'LOGOUT_USER',
    });

  }
}
