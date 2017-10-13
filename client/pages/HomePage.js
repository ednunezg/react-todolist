import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    
    render(){
      return (
        <div>
            <h1 className="page-title"> Welcome! </h1>
        
            <p className="text-justify lead">
                This website allows you to keep a list of todos with different categories. All todos you create will be synced with a database. You can leave the site or logout at anytime, then log back in and your todos will still be there!
            </p>

            <p className="text-justify lead">
                Head on over to the <Link to="/todos">Todos</Link> page.
            </p>
            
        </div>
    )}
}

export default HomePage;