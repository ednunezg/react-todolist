import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._user = null;
    this._jwt = null;
  }


  //This establishes what to do when receiving different actions
  _registerToActions(action) {
    switch(action.type){
      case 'LOGIN_USER':
        this._jwt = action.jwt;
        this._userId = jwt_decode(this._jwt).id;
        this.emitChange(); // Every component using this store can listen to the change
        // this._jwt = action.jwt;
        break;

      case 'LOGOUT_USER':
        this._userId = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get userId(){ //The user can be obtained by calling LoginStore.user
    return this._userId;
  }

  get jwt(){
    return this._jwt;
  }

  isLoggedIn() {
    return (this._userId!=null);
  }

}

export default new LoginStore(); //Export singleton instance