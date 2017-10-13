import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

//All stores will EXTEND the BaseStore, since they all need to be subscribed to the the dispatcher

export default class BaseStore extends EventEmitter {

  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }
  

  emitChange() {
    //We emit a CHANGE EVENT after the dispatcher has finished
    //TODO: Implement action queue

    setTimeout(() => {
      this.emit('CHANGE');
    }, 0);
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}