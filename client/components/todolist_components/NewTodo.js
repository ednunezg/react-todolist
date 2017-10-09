import React from 'react';

class NewTodo extends React.Component {
    

    render(){
    
    return (
    
    <div className="newtodo col-md-4">

      <div className="input-group">
        <input type="text" className="newtodo-input form-control" placeholder="New todo..." aria-label="New todo..." />
        <span className="input-group-btn">
          <button className="newtodo-button btn btn-outline-primary" type="button"> + </button>
        </span>
      </div>

    </div>

    )}
}

export default NewTodo;