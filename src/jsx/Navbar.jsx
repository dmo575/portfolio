import { useContext } from "react";
import * as icons from "./icons.js";
import * as links from "./links.js"
import * as breakpoints from "./bsbp.js";
import { appContext } from "./App.jsx";


function Navbar() {

    const {breakpointState} = useContext(appContext);

    return (
        <div className="container navbar-marging">
            <div className="row d-flex justify-content-center">
                <div className="col-6 d-flex justify-content-around">
                    <div className="col-auto"><a href="CV DOWNLOAD LINK" target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={icons.icon_download}/></a></div>
                    <a href="#works" className="btn rounded-5 btn-outline-secondary">Works{breakpointState >= breakpoints.lg ? <img className="icon icon-navbar" src={icons.icon_hash}/> : ""}</a>
                    <a href={links.link_linkedin} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.lg ? "Linkedin" : ""} <img className="icon icon-navbar" src={icons.icon_linkedin}/></a>
                    <a href={links.link_github} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.lg ? "GitHub" : ""} <img className="icon icon-navbar" src={icons.icon_github}/></a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;