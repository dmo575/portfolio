import { useContext, useState, useEffect } from "react";

import * as breakpoints from "./../../variables/bsbp.js";
import { iconsJson, contactJson } from "../../js/paths.js";

import { appContext } from "./../App.jsx";

import "./Navbar.css";



function Navbar() {

    const {breakpointState, Error} = useContext(appContext);
    const [state, setState] = useState(null);

    // we are looking for icons and contact

    useEffect(() => {

        const getStateData = async () => {

            const iconsResponse = await(fetch(iconsJson));
            const contactResponse = await(fetch(contactJson));

            if(iconsResponse.status != 200 || contactResponse.status != 200) {

                Error("Navbar");
                return;
            }

            const iconsData = await(iconsResponse.json());
            const contactData = await(contactResponse.json());

            setState({iconsData, contactData});
        };

        getStateData();

    }, []);

    return (
        <div id="navbar" className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-7 col-lg-7 col-xl-6 col-md-9 d-flex justify-content-around">
                    <div className="col-auto">
                        <a href={state?.contactData?.cv || ""} target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={ state?.iconsData?.download.grayscale || ""}/></a>
                        </div>
                    <div className="col-auto">
                        <a href="#works" className="btn rounded-5 btn-outline-secondary">Works{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={state?.iconsData?.hash.grayscale || ""}/> : ""}</a>
                        </div>
                    <div className="col-auto">
                        <a href={state?.contactData?.linkedin || ""} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "Linkedin" : ""} <img className="icon icon-navbar" src={state?.iconsData?.linkedin.grayscale || ""}/></a>
                        </div>
                    <div className="col-auto">
                        <a href={state?.contactData?.github || ""} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "GitHub" : ""} <img className="icon icon-navbar" src={state?.iconsData?.github.grayscale || ""}/></a>
                        </div>
                    <div className="col-auto">
                        <a href={`mailto:${state?.contactData?.email || ""}`} target="_blank" className="btn rounded-5 btn-outline-secondary">Contact{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={state?.iconsData?.mail.grayscale || ""}/> : ""}</a>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;