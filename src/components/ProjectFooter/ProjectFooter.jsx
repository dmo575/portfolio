import { useContext } from "react";

import { appContext } from "../App";
import * as breakpoints from "./../../js/bsbp.js";

import "./ProjectFooter.css";


function ProjectFooter() {

    const { breakpointState, icons, contact } = useContext(appContext);

    return(
        <div id="project-footer-cont" className="container">
            <div className="row">
                <div className="col text-center">
                    <p className="m-0">. . . and more coming! I'm always coding something { breakpointState != breakpoints.md ? <>&#8674;</> : ""}
                    <a href={contact?.github} target="_blank"><img className="icon h-100" src={icons?.github.grayscale} alt="GitHub"/></a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectFooter;
