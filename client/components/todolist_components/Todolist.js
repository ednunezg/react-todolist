import React from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';


class Todolist extends React.Component {
    

    render(){
    
    return (
    
    <div id="todo-list">
      <Todo />
      <Todo />
      <Todo />
      <NewTodo />
    </div>
    )}
}

export default Todolist;