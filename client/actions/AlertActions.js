import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

  displayMessage: (type, content) => {
    AppDispatcher.dispatch({
      type: 'ALERT_DISPLAY',
      alertType: type,
      alertContent: content
    });

  },


  removeMessage: () => {
    AppDispatcher.dispatch({
      type: 'ALERT_REMOVE'
    });

  }
}
