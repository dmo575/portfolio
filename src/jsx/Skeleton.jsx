import { useContext } from "react";
import Card from "./Card.jsx";
import * as breakpoints from "./bsbp.js";
import { appContext } from "./App.jsx";
import { projectCards } from "./content.js";


function Skeleton() {

    const {breakpointState} = useContext(appContext);

    return (
        <div className="container">
            {/* ROW - project cards */}
            <div className={`row row-cols-${breakpointState == breakpoints.md ? '2': '1'} d-flex justify-content-center`}>

                {projectCards.map((cardElement, index) => {
                    return (
                        <div className="col my-2">
                            <Card card={cardElement} dir={ index % 2 == 0 ? "left" : "right"}/>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Skeleton;