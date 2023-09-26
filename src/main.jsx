import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import Skeleton from './jsx/Skeleton.jsx';
import Footer from "./jsx/Footer.jsx";
import TestComponent from './jsx/TestComponent.jsx';
import Navbar from './jsx/Navbar.jsx';
import ProfileSection from './jsx/ProfileSection.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <ProfileSection/>
    <Skeleton/>
    <Footer/>
  </React.StrictMode>,
)

/*

 */
