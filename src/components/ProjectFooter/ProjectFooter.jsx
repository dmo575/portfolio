import { useContext } from "react";
import { icon_github } from "../../variables/icons";
import { link_github } from "../../variables/links";

import { appContext } from "../App";
import * as breakpoints from "./../../variables/bsbp.js";

import "./ProjectFooter.css";


function ProjectFooter() {

    const { breakpointState } = useContext(appContext);

    return(
        <div id="project-footer-cont" className="container">
            <div className="row">
                <div className="col text-center">
                    <p className="m-0">. . . and more comming! I'm always coding something { breakpointState != breakpoints.md ? <>&#8674;</> : ""}
                    <a href={link_github} target="_blank"><img className="icon h-100" src={icon_github} alt="GitHub"/></a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectFooter;
