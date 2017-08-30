import React from 'react';
import { NavLink } from 'react-router-dom';

class FlashMessage extends React.Component {
    
    render(){

        const msgType = this.props.flashMessage.type;
        const msgContent = this.props.flashMessage.content;
        var alertDiv;

        if(msgType == "success"){
            alertDiv = ( <div className="alert alert-success"> {msgContent} </div>   )
        }
        else if(msgType == "warning"){
            alertDiv = ( <div className="alert alert-warning"> {msgContent} </div>  )
        }
        else if(msgType == "error"){
            alertDiv = ( <div className="alert alert-danger">  {msgContent} </div>   )
        }
        else{
            alertDiv = null;
        }

        return (
          <div className="flash-messages">
            {alertDiv}
          </div>    
        )
    }
}

export default FlashMessage;