import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/lux/bootstrap.min.css'; // Added this :boom:
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './_variables.scss';
import App from './App';
import {HashRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router basename='/'>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
