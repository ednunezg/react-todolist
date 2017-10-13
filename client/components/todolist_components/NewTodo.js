import React from 'react';
import TodoService from '../../services/TodoService'

class NewTodo extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = {
      newTodoName: ''
    };
    this.updateNewTodoName = this.updateNewTodoName.bind(this);    
    this.createTodo = this.createTodo.bind(this);      
  }

  updateNewTodoName(event){
    //Updated user state
    this.setState({ newTodoName: event.target.value })
  }


  createTodo(event) {
    //TODO: Add form validation
    event.preventDefault();
    TodoService.createTask(this.state.newTodoName);
    this.setState( { newTodoName: '' });
  }

    render(){
    
    return (
    
    <div className="newtodo col-md-6">

      <form onChange={this.updateNewTodoName} onSubmit={this.createTodo}>
        <div className="input-group">
          <input id="new_todo_name" type="text" className="newtodo-input form-control" value={this.state.newTodoName} placeholder="New todo..." aria-label="New todo..."/>
          <span className="input-group-btn">
            <button className="newtodo-button btn btn-outline-primary" type="submit"> + </button>
          </span>
        </div>
      </form>

    </div>

    )}
}

export default NewTodo;