import { useContext } from "react";
import * as breakpoints from "./../../js/bsbp.js";
import { appContext } from "../App";


function NavbarButton({href, target, icon, name, iconOnSmall, nameOnSmall, style="secondary"}) {

    const {breakpointState} = useContext(appContext);

    return(
        <div className="col-auto">
            <a href={href || ""} target={target} className={`btn rounded-5 btn-outline-${style}`}>
                { breakpointState < breakpoints.md && !nameOnSmall ? "" : name }
                {
                    (breakpointState < breakpoints.md && !iconOnSmall) || !icon  ? "" :
                    <img src={icon} alt={name} className="icon icon-navbar"/>
                }
            </a>
        </div>
    );
}

export default NavbarButton;