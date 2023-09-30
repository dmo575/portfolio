import { useContext } from "react";
import { appContext } from "./App.jsx";
import * as breakpoints from "./bsbp.js";

/* TODO: 
    Fix logo sizes, either one size for all or make description text to work well with all sizes
*/


const logoSize = 2;

function Skill({src, name}) {

    const { breakpointState } = useContext(appContext);

    return (
        <div className="logo-container mx-2" style={{width: `${logoSize}rem`}}>
            <img className="logo" style={ {
                    width: `${logoSize}rem`, 
                    top: `${logoSize * -0.5}rem`,
                    "--size": `${logoSize}rem`
                }} src={src} alt={name} />
            <div className="logo-description-container" style={{"--parent-size": `${logoSize}rem`}}>
                <p className="logo-description-text">{name}</p>
            </div>
        </div>
    );
}

export default Skill;