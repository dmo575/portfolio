import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.jsx';
import Test from './components/Test.jsx';
import { Modal, Button } from 'react-bootstrap';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)