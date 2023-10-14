import { useContext } from "react";

import * as breakpoints from "./../../js/bsbp.js";

import { appContext } from "./../App.jsx";

import "./Navbar.css";


function Navbar() {

    const {breakpointState, icons, contact} = useContext(appContext);

    return (
        <div id="navbar" className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-7 col-lg-7 col-xl-6 col-md-9 d-flex justify-content-around">
                    <div className="col-auto">
                        <a href={contact?.cv || ""} target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={ icons?.download.grayscale || ""}/></a>
                    </div>
                    <div className="col-auto">
                        <a href="#works" className="btn rounded-5 btn-outline-secondary">Works{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={icons?.hash.grayscale || ""}/> : ""}</a>
                    </div>
                    <div className="col-auto">
                        <a href={contact?.linkedin || ""} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "Linkedin" : ""} <img className="icon icon-navbar" src={icons?.linkedin.grayscale || ""}/></a>
                    </div>
                    <div className="col-auto">
                        <a href={contact?.github || ""} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "GitHub" : ""} <img className="icon icon-navbar" src={icons?.github.grayscale || ""}/></a>
                    </div>
                    <div className="col-auto">
                        <a href={`mailto:${contact?.email || ""}`} target="_blank" className="btn rounded-5 btn-outline-secondary">Contact{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={icons?.mail.grayscale || ""}/> : ""}</a>
                    </div>
                    <div className="col-auto">
                        <a href={`/posts.html`} target="_blank" className="btn rounded-5 btn-outline-secondary">Contact{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={icons?.mail.grayscale || ""}/> : ""}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;