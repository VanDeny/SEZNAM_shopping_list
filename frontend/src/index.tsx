import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from "react-modal";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Modal.setAppElement('#root');
root.render(
    <App />
);

reportWebVitals();
