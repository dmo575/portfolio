import { icon_github } from "../../variables/icons";
import { link_github } from "../../variables/links";

import "./ProjectFooter.css";


function ProjectFooter() {

    return(
        <div id="project-footer-cont" className="container">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <p className="m-0">. . . and more comming ! I'm always coding something &#8674;</p>
                    <a href={link_github} target="_blank"><img className="icon h-100" src={icon_github} alt="GitHub"/></a>
                </div>
            </div>
        </div>
    );
}

export default ProjectFooter;