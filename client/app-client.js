/* app-client.js gets recompiled into bundle.js */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppHOC from './components/AppHOC';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


window.onload = () => {
  ReactDOM.render( 

      <BrowserRouter>
        <AppHOC/>
      </BrowserRouter>
      
      , document.getElementById('main'));
};