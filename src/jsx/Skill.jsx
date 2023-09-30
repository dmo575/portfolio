import { useContext } from "react";
import { appContext } from "./App.jsx";
import * as breakpoints from "./bsbp.js";

const logoSizeLg = 2;
const logoSizeMd = 3;
const logoSizeSm = 2;

function GetLogoSize(currBreakpoint) {

    switch (currBreakpoint) {
        case breakpoints.sm:
            return logoSizeSm;
        case breakpoints.md:
            return logoSizeMd;
        default:
            return logoSizeLg;
    }
}

function Skill({src, name}) {

    const { breakpointState } = useContext(appContext);

    return (
        <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}>
            <img className="logo" style={ {
                    width: `${GetLogoSize(breakpointState)}rem`, 
                    top: `${GetLogoSize(breakpointState) * -0.5}rem`,
                    "--size": `${GetLogoSize(breakpointState)}rem`
                }} src={src} alt={name} />
            <div className="logo-description-container" style={{"--parent-size": `${GetLogoSize()}rem`}}>
                <p className="logo-description-text">{name}</p>
            </div>
        </div>
    );
}

export default Skill;