import { useContext, useState, useEffect } from "react";
import { iconsJson, contactJson } from "../../js/paths.js";

import { appContext } from "../App";
import * as breakpoints from "./../../variables/bsbp.js";

import "./ProjectFooter.css";


function ProjectFooter() {

    const [state, setState] = useState(null);
    const { breakpointState, Error } = useContext(appContext);

    useEffect(() => {

        const getFooterData = async () => {

            const iconsResponse = await fetch(iconsJson);
            const contactResponse = await fetch(contactJson);

            if(iconsResponse.status != 200 || contactResponse.status != 200) {
                Error("project footer");
                return;
            }

            const iconsData = await iconsResponse.json();
            const contactData = await contactResponse.json();

            setState({icon_github: iconsData.github.grayscale, link_github: contactData.github});

        };

        getFooterData();

    }, []);

    return(
        <div id="project-footer-cont" className="container">
            <div className="row">
                <div className="col text-center">
                    <p className="m-0">. . . and more coming! I'm always coding something { breakpointState != breakpoints.md ? <>&#8674;</> : ""}
                    <a href={state?.link_github} target="_blank"><img className="icon h-100" src={state?.icon_github} alt="GitHub"/></a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectFooter;
