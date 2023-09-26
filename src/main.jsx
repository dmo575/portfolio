import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import Skeleton from './jsx/Skeleton.jsx';
import Footer from "./jsx/Footer.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Skeleton/>
    <Footer/>
  </React.StrictMode>,
)
