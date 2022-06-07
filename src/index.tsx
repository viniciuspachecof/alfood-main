import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

//npm install axios
//npm install @mui/material @emotion/react @emotion/styled

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    </React.StrictMode>,
    document.getElementById('root')
);
