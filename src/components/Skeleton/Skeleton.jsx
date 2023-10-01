import { useContext } from "react";

import * as breakpoints from "./../../variables/bsbp.js";
import { projectCards } from "./../../variables/content.js";

import { appContext } from "./../App.jsx";
import Card from "./../Card/Card.jsx"


function Skeleton() {

    const {breakpointState} = useContext(appContext);

    return (
        <div className="container">
            {/* ROW - project cards */}
            <div className={`row row-cols-${breakpointState == breakpoints.md ? '2': '1'} d-flex justify-content-center`}>

                {projectCards.map((cardElement, index) => {
                    return (
                        <div key={ cardElement.title + index } className="col my-2">
                            <Card card={cardElement} dir={ index % 2 == 0 ? "left" : "right"}/>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Skeleton;