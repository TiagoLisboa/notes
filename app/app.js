'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
var data;

ipcRenderer.send('askData');

import App from './containers/app.container';

ipcRenderer.on('sendData', (event, arg) => {
  data = JSON.parse(arg);
  ReactDOM.render( <App saveData={data}/>, document.getElementById('content') );
})
