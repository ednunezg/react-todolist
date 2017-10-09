import React from 'react';

class Todo extends React.Component {
    

    render(){
    
    return (
    
    <div className="todo col-md-4">
      
      <div className="">
        <input className="todo-checkbox custom-checkbox" type="checkbox"/>
        <span className="todo-content"> Todo content goes here </span>
      </div>

    </div>

    )}
}

export default Todo;