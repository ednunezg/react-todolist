import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class TodoStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._tags = []; //Array type when loaded
    this._tasks = []; //Array type when loaded
  }


  //This establishes what to do when receiving different actions
  _registerToActions(action) {
    switch(action.type){
      case 'LOAD_TASKS_AND_TAGS':
        this._tags = action.tags;
        this._tasks = action.tasks;
        this.emitChange(); // Every component using this store can listen to the change
        // this._jwt = action.jwt;
        break;

      case 'ADD_TAG':
        this._tags.push(action.newTag);
        this.emitChange();
        break;

      case 'ADD_TASK':
        this._tasks.push(action.newTask);
        this.emitChange();
        break;

      case 'TOGGLE_TASK':
        this._tasks[action.taskIndex].marked_done = !this._tasks[action.taskIndex].marked_done;
        this.emitChange();
        break;
      
      case 'DELETE_TASK':
        this._tasks.splice(action.taskIndex, 1);
        this.emitChange();
        break;

      case 'DELETE_TAG':
        this._tags.splice(action.tagIndex, 1);
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get allTags(){
    return this._tags;
  }

  get allTasks(){
    return this._tasks;
  }


}

export default new TodoStore(); //Export singleton instance