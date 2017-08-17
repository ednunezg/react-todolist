/* app-client.js gets recompiled into bundle.js */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

window.onload = () => {
  ReactDOM.render(<App/>, document.getElementById('main'));
};