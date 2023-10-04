import { useContext, useState, useEffect } from "react";

import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";

import "./Navbar.css";

const iconsJson = "./JSON/Icons.json";
const contactJson = "./JSON/Contact.json";


function Navbar() {

    const {breakpointState} = useContext(appContext);
    const [state, setState] = useState(null);

    // we are looking for icons and contact

    useEffect(() => {

        const getStateData = async () => {

            const iconsResponse = await(fetch(iconsJson));
            const contactResponse = await(fetch(contactJson));

            if(iconsResponse.status == 200 && contactResponse.status == 200) {

                const iconsData = await(iconsResponse.json());
                const contactData = await(contactResponse.json());

                setState({iconsData, contactData});
                return;
            }

            console.error("Error while retrieving icons and contact info in Navbar");
        };

        getStateData();

    }, []);

    return (
        <div id="navbar" className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-7 col-lg-7 col-xl-6 col-md-9 d-flex justify-content-around">
                    <div className="col-auto">
                        <a href="CV DOWNLOAD LINK" target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={(state && state.iconsData) ? state.iconsData.download.grayscale : "Download"}/></a>
                        </div>
                    <div className="col-auto">
                        <a href="#works" className="btn rounded-5 btn-outline-secondary">Works{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={(state && state.iconsData) ? state.iconsData.hash.grayscale : "Go to"}/> : ""}</a>
                        </div>
                    <div className="col-auto">
                        <a href={(state && state.contactData) ? state.contactData.icon_linkedin : "https://www.linkedin.com/in/alfredo-rodriguez-23599a228/"} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "Linkedin" : ""} <img className="icon icon-navbar" src={(state && state.iconsData) ? state.iconsData.linkedin.grayscale : "Linkedin"}/></a>
                        </div>
                    <div className="col-auto">
                        <a href={(state && state.contactData) ? state.contactData.github : "https://github.com/dmo575"} className="btn rounded-5 btn-outline-secondary" target="_blank">{breakpointState >= breakpoints.md ? "GitHub" : ""} <img className="icon icon-navbar" src={(state && state.iconsData) ? state.iconsData.github.grayscale : "GitHub"}/></a>
                        </div>
                    <div className="col-auto">
                        <a href={`mailto:${(state && state.contactData) ? state.contactData.email : "arco4@protonmail.com"}`} target="_blank" className="btn rounded-5 btn-outline-secondary">Contact{breakpointState >= breakpoints.md ? <img className="icon icon-navbar" src={(state && state.iconsData) ? state.iconsData.mail.grayscale : "Mail"}/> : ""}</a>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;