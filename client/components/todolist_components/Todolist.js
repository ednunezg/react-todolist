import React from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';

import TodoStore from '../../stores/TodoStore'
import TodoActions from '../../actions/TodoActions'
import TodoService from '../../services/TodoService'

class Todolist extends React.Component {
    
  constructor(props){
    super(props);
    this.state = {
      tasks: TodoStore.allTasks,
      tags: TodoStore.allTags
    };

    //Expost the todo stores and actions globally for debugging
    window.TodoStore = TodoStore;
    window.TodoActions = TodoActions;
  };


  componentDidMount() {
      //Add event listener for change of Todo Store
      this.todoChange = () => { 
        console.log("TASKS IN TODO LIST CHANGED!");
        this.setState( {tasks: TodoStore.allTasks, tags: TodoStore.allTags}) 
      };
      TodoStore.addChangeListener(this.todoChange);    

    //Fetch initial tasks and tags
    TodoService.fetchTodosAndTasks();
  }
  
  componentWillUnmount() {
    //Add event listener for change of Todo Store
    TodoStore.removeChangeListener(this.todoChange);
  }


  render(){
    return (
      <div id="todo-list">
        {/* Render all todos for this user */}
        {this.state.tasks.map( function(task, index){
            return <Todo key={index} index={index} title={task.title} tags={task.tags} markedDone={task.marked_done}/>
        })}

        {/* Input field for new todo */}
        <NewTodo />
      </div>
      )
    }
}

export default Todolist;