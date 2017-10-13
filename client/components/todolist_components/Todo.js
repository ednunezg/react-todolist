import React from 'react';

import TodoService from '../../services/TodoService'

class Todo extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = { };
  
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
      
  }


    toggleCheckbox(event) {
        TodoService.toggleTask(this.props.index);
    }

    deleteTodo(event) {
        TodoService.deleteTask(this.props.index);
    }



    render(){

        return (
          <div className={!this.props.markedDone ? "todo" : "todo todoisdone"}>
            <input className="todo-checkbox custom-checkbox" type="checkbox" checked={this.props.markedDone} onClick={this.toggleCheckbox}/>
            <span className="todo-name"> {this.props.title} </span>
            <ul className="todo-tags">
              
              {this.props.tags.map( function(tag, index){
                return <li key={index} className="badge badge-primary"> {tag} </li>
              })}

            </ul>
            <button type="button" className="todo-delete close" aria-label="Delete" onClick={this.deleteTodo}> <span aria-hidden="true">&times;</span> </button>
          </div>
        )
    }

}

export default Todo;