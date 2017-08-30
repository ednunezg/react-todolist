import React from 'react';

class TodolistPage extends React.Component {
    
    render(){
      return (
        <div>
            <h1 className="page-title"> This is the TodoList page. This is restricted for logged in users. </h1>
                    
            <p>
                Todo todo todo todo <br/>
                Todo todo todo todo <br/>
                Todo todo todo todo <br/>
                Todo todo todo todo <br/>
                Todo todo todo todo <br/>
            </p>
            
        </div>
    )}
}

export default TodolistPage;