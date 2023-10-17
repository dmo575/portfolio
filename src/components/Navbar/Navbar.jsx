import { useContext } from "react";

import * as breakpoints from "./../../js/bsbp.js";

import { appContext } from "./../App.jsx";
import NavbarButton from "../NavbarButton/NavbarButton.jsx";

import "./Navbar.css";


function Navbar() {

    const {breakpointState, icons, contact} = useContext(appContext);

    return (
        <div id="navbar" className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-7 col-lg-7 col-xl-6 col-md-9 d-flex justify-content-around">
                    <NavbarButton href={contact?.cv} target="_blank" icon={icons?.download.grayscale} name="CV" iconOnSmall={false} nameOnSmall={true}/>
                    <NavbarButton href={"#works"} target="_blank" icon={icons?.hash.grayscale} name="Works" iconOnSmall={false} nameOnSmall={true}/>
                    <NavbarButton href={contact?.linkedin || ""} target="_blank" icon={icons?.linkedin.grayscale} name="Linkedin" iconOnSmall={true} nameOnSmall={false}/>
                    <NavbarButton href={contact?.github || ""} target="_blank" icon={icons?.github.grayscale} name="GitHub" iconOnSmall={true} nameOnSmall={false}/>
                    <NavbarButton href={`mailto:${contact?.email || ""}`} target="_blank" icon={icons?.mail.grayscale} name="Contact" iconOnSmall={false} nameOnSmall={true}/>
                    <NavbarButton href={`./src/posts.html`} target="_blank" icon={null} name="Blog" iconOnSmall={false} nameOnSmall={true} style="btn-warning"/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;