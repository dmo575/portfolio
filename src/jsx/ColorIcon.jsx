import { useContext } from "react";
import { appContext } from "./App";
import * as breakpoints from "./bsbp.js"

function ColorIcon({src, color}) {

    const { breakpointState } = useContext(appContext);

    return (
        <div className={"icon-container"}>
            <img src={src} alt={src} className="img icon" style={breakpointState >= breakpoints.lg ? {width: "4rem"} : {width: "2rem"}}/>
            <div className="img-overlay" style={{backgroundColor: color}}></div>
        </div>
    );
}

export default ColorIcon;