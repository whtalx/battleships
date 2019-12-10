import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

ReactDOM.render(
  <Provider store={ store }><Router><Route path='/' component={ App } /></Router></Provider>,
  document.getElementById('root')
);
