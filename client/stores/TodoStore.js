import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class TodoStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._tags = null; //Array type when loaded
    this._tasks = null; //Array type when loaded
  }


  //This establishes what to do when receiving different actions
  _registerToActions(action) {
    switch(action.type){
      case 'LOAD_TASKS_AND_TAGS':
        this._tags = action.tags;
        this._todos = action.todos;
        this.emitChange(); // Every component using this store can listen to the change
        // this._jwt = action.jwt;
        break;

      case 'ADD_TAG':
        this._tags.push(action.newTag);
        this.emitChange();
        break;

      case 'ADD_TASK':
        this._tags.push(action.newTask);
        this.emitChange();
        break;

      case 'TOGGLE_TASK':
        toggleTask(action.taskIndex);
        break;
      
      case 'DELETE_TASK':
        this._tasks.splice(actions.taskIndex, 1);
        break;

      case 'DELETE_TAG':
        this._tags.splice(actions.tagIndex, 1);
        break;

      default:
        break;
    }
  }

  get allTags(){
    return this._tags;
  }

  get allTasks(){
    return this._todos;
  }


  toggleTask(taskIndex){
    this._tasks[i].marked_done = !this._tasks[i].marked_done;
  }

}

export default new TodoStore(); //Export singleton instance