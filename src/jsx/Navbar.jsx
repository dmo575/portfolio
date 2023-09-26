import { useState, useEffect, useRef } from "react";
import * as icons from "./icons.js";
import * as links from "./links.js"
import * as breakpoints from "./bsbp.jsx";
import { GetCurrGeneralSize } from "./toolFuncs.js";


function Navbar() {

    const [resize, setResize] = useState(GetCurrGeneralSize());
    const resizeRef = useRef(resize);

    useEffect(()=> {

        function handleResize() {
            const newSize = GetCurrGeneralSize();

            if(resizeRef != newSize) {
                setResize(newSize);
            }
        };

        window.addEventListener("resize", handleResize);

        return ()=> {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <div className="container navbar-marging">
            <div className="row d-flex justify-content-center">
                <div className="col-6 d-flex justify-content-around">
                    <div className="col-auto"><a href="CV DOWNLOAD LINK" target="_blank" className="btn rounded-5 btn-outline-secondary">CV<img className="icon icon-navbar" src={icons.icon_download}/></a></div>
                    <a href="#works" className="btn rounded-5 btn-outline-secondary">Works{resize >= breakpoints.lg ? <img className="icon icon-navbar" src={icons.icon_hash}/> : ""}</a>
                    <a href={links.link_linkedin} className="btn rounded-5 btn-outline-secondary" target="_blank">{resize >= breakpoints.lg ? "Linkedin" : ""} <img className="icon icon-navbar" src={icons.icon_linkedin}/></a>
                    <a href={links.link_github} className="btn rounded-5 btn-outline-secondary" target="_blank">{resize >= breakpoints.lg ? "GitHub" : ""} <img className="icon icon-navbar" src={icons.icon_github}/></a>

                </div>
            </div>
        </div>
    );
}

export default Navbar;