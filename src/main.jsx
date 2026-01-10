import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' 

// 🟢 ADD THIS LINE IF MISSING!
import './styles/global.css' 

// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);