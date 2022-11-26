
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import styles from './scss/dashboard.scss';
import rootReducers from './reducers/rootReducers.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
)
