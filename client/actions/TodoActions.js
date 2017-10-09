import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

  loadTasksAndTags: (tags, tasks) => {
    AppDispatcher.dispatch({
      type: 'LOAD_TASKS_AND_TAGS',
      tags: tags,
      tasks: tasks
    });
  },


  addTag: (newTag) => {
    AppDispatcher.dispatch({
      type: 'ADD_TAG',
      newTag: newTag
    });
  },

  addTask: (newTask) => {
    AppDispatcher.dispatch({
      type: 'ADD_TASK',
      newTask: newTask
    });
  },

  toggleTask: (taskIndex) => {
    AppDispatcher.dispatch({
      type: 'TOGGLE_TASK',
      taskIndex: taskIndex
    });
  },

  deleteTask: (taskIndex) => {
    AppDispatcher.dispatch({
      type: 'DELETE_TASK',
      taskIndex: taskIndex
    });
  },

  deleteTag: (tagIndex) => {
    AppDispatcher.dispatch({
      type: 'DELETE_TAG',
      tagIndex: tagIndex
    });
  },
    
      
      
}
