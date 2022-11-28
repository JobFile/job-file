
import React from 'react';
import App from './components/App.jsx';
import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import styles from './scss/login.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </div>


);
