import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TareaProvider } from "./context/TareaContext"; 

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//Materialize
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
//SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TareaProvider>
    <App />
  </TareaProvider>
);
