import { useContext } from "react";
import * as breakpoints from "./../../js/bsbp.js";
import { appContext } from "../App";


function NavbarButton({href, target, icon, name, iconOnSmall, nameOnSmall, style="btn-outline-secondary"}) {

    const {breakpointState} = useContext(appContext);

    return(
        <div className="col-auto">
            <a href={href || ""} target={target} className={`${breakpointState >= breakpoints.md && "d-flex"} btn rounded-5 ${style}`}>
                { breakpointState < breakpoints.md && !nameOnSmall ? "" : `${name}` }
                {
                    (breakpointState < breakpoints.md && !iconOnSmall) || !icon  ? "" :
                    <img src={icon} alt={name} className="icon icon-navbar"/>
                }
            </a>
        </div>
    );
}

export default NavbarButton;