import { useContext } from "react";

import * as icons from "./../../variables/icons.js";
import * as links from "./../../variables/links.js";
import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";

import "./Navbar.css";

function Navbar() {

    const {breakpointState} = useContext(appContext);

    return (
        <div id="navbar" className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-7 col-lg-7 col-xl-6 col-md-9 d-flex justify-content-around">
                    <div className="col-auto"><a href="CV DOWNLOAD LINK" target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={icons.icon_download}/></a></div>
                    <div className="col-auto"><a href="#works" className="btn rounded-5 btn-outline-secondary">Works{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={icons.icon_hash}/> : ""}</a></div>
                    <div className="col-auto"><a href={links.link_linkedin} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "Linkedin" : ""} <img className="icon icon-navbar" src={icons.icon_linkedin}/></a></div>
                    <div className="col-auto"><a href={links.link_github} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "GitHub" : ""} <img className="icon icon-navbar" src={icons.icon_github}/></a></div>
                    <div className="col-auto"><a href={`mailto:${links.link_contactMail}`} target="_blank" className="btn rounded-5 btn-outline-secondary">Contact{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={icons.icon_sendMail}/> : ""}</a></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;