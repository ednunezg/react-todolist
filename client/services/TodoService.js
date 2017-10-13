import request from 'superagent';

import Constants from '../constants'

import AlertActions from  '../actions/AlertActions';
import TodoActions from '../actions/TodoActions';
import TodoStore from '../stores/TodoStore';
import LoginStore from '../stores/LoginStore'

class TodoService {
  
  fetchTodosAndTasks() {
    
    var tasks = false;
    var tags = false;

    request
    .post(Constants.API_TASKS_GETALL)
    .send({"Authorization":LoginStore._jwt})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not fetch todos at this time. Server might be down.');}
            return;
        }
        else{
          //We obtain tasks. Now do a chain request to obtain tags
          tasks = res.body.tasks;
          console.log("tasks = " + tasks);
          request
          .post(Constants.API_TAGS_GETALL)
          .send({"Authorization":LoginStore._jwt})
          .end( (err, res) => {
              if(err || !res.ok){
                  if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
                  else{ AlertActions.displayMessage('error', 'Can not fetch todos at this time. Server might be down.'); }
                  return;
              }
              else{
                //We finished chained requests. Now we insert tags and tasks in store
                tags = res.body.tags;
                TodoActions.loadTasksAndTags(tags,tasks);
              }
          });

        }
    });
  }

  toggleTask(taskIndex) {

    if(taskIndex<0 || taskIndex>=TodoStore._tasks.length){
      AlertActions.displayMessage("error","Invalid task index");
      return;
    }

    request
    .post(Constants.API_TASKS_TOGGLEDONE)
    .send({"Authorization":LoginStore._jwt, "id":TodoStore._tasks[taskIndex]._id})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not toggle todo at this time. Server might be down.');}
            return;
        }
        else{
          //We toggle task in the store
          TodoActions.toggleTask(taskIndex);
        }
      });
  }

  createTask(taskTitle) {
    request
    .post(Constants.API_TASKS_CREATE)
    .send({"Authorization":LoginStore._jwt, "title":taskTitle, "tags":[]})
    .end( (err, res) => {
        if(err || !res.ok){
          console.log("ERRORS = " + JSON.stringify(res.body));
          
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not create task at this time. Server might be down.');}
            return;
        }
        else{
          //We place the task in the store
          TodoActions.addTask(res.body.task);
        }
      });
  }

  deleteTask(taskIndex) {
    if(taskIndex<0 || taskIndex>=TodoStore.allTasks.length){
      AlertActions.displayMessage("error","Invalid task index");
      return;
    }


    request
    .post(Constants.API_TASKS_DELETE)
    .send({"Authorization":LoginStore._jwt, "id":TodoStore.allTasks[taskIndex]._id})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not create task at this time. Server might be down.');}
            return;
        }
        else{
          //We delete the task in the Todo Store
          TodoActions.deleteTask(taskIndex);
        }
      });
  }

  createTag(tagName) {
    request
    .post(Constants.API_TAGS_CREATE)
    .send({"Authorization":LoginStore._jwt, "name":tagName})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not create tag at this time. Server might be down.');}
            return;
        }
        else{
          //We place the task in the store
          TodoActions.add(res.body.tag);
        }
      });
  }

  deleteTag(tagIndex) {
    if(tagIndex<0 || tagIndex>=TodoStore.allTags.length){
      AlertActions.displayMessage("error","Invalid task index");
      return;
    }

    request
    .post(Constants.API_TAGS_DELETE)
    .send({"Authorization":LoginStore._jwt, "id":TodoStore.allTags[tagIndex]._id})
    .end( (err, res) => {
        if(err || !res.ok){
            if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            else{ AlertActions.displayMessage('error', 'Can not delete tag at this time. Server might be down.');}
            return;
        }
        else{
          //We delete the task in the Todo Store
          AlertActions.displayMessage('success', 'Task deleted');
          TodoActions.deleteTag(tagIndex);
        }
      });
  }

}

export default new TodoService()
