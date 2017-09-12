import BaseStore from './BaseStore';

class AlertStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._alertType = null;
    this._alertContent = null;
  }

  _registerToActions(action) {
    switch(action.type){
      case 'ALERT_DISPLAY':
        console.log("ALERT DISPLAY DISPATCHED");
        this._alertType = action.alertType;
        this._alertContent = action.alertContent;
        this.emitChange(); // Every component using this store can listen to the change
        break;

      case 'ALERT_REMOVE':
        this._alertType = null;
        this._alertContent = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  obtainAlertMessage(){ //The alert can only be obtained once, after that it dissapears
    const alertMessage = {
      type: this._alertType,
      content: this._alertContent
    }
    return alertMessage;
  }

  alertExists() {
    return (this._alertType!=null);
  }

}

export default new AlertStore(); //Export singleton instance