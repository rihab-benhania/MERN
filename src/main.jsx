import React from 'react';
import ReactDOM from 'react-dom/client';
// QUAND DECLARER BrowserRouter ? Une seule fois a la racine de l'application.
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);