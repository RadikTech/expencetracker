import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ExpenseProvider } from './context/ExpenseContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ExpenseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ExpenseProvider>
);

reportWebVitals();
