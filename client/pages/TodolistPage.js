import React from 'react';
import Todolist from '../components/todolist_components/Todolist'

class TodolistPage extends React.Component {
    
    render(){
      return (
        <div>
            <h1 className="page-title"> Todos </h1>

            <Todolist />

        </div>
    )}
}

export default TodolistPage;