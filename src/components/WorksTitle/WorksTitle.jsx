import { useEffect, useContext, useRef } from "react";

import { GetSectionSize, GetPerCurrToTarget_Bottom } from "../../js/general.js";
import * as breakpoints from "./../../js/bsbp.js";

import { appContext } from "./../App.jsx";

import "./WorksTitle.css";

// font size for the "Works" title based on breakpoint
const worksContHeightLg = 10;
const worksContHeightMd = 8;
const worksContHeightSm = 7;

function WorksTitle() {

    const { breakpointState, bottomPivot } = useContext(appContext);
    const breakpointStateRef = useRef();

    useEffect(() => {
        breakpointStateRef.current = breakpointState;
    }, [breakpointState]);

    function handleWorksTitle() {

        // get the works container and the works element
        const titleCont = document.querySelector("#works-title-cont");
        const titleElement = document.querySelector("#works-title");

        // calculate works' container height for the current breakpoint
        let containerHeight = 0;
        switch(breakpointStateRef.current) {

            case breakpoints.lg:
                containerHeight = worksContHeightLg;
                break;
            case breakpoints.md:
                containerHeight = worksContHeightMd;
                break;
            default:
                containerHeight = worksContHeightSm;
        }

        // update container with new height
        titleCont.style.height = `${containerHeight}rem`;

        // get container's top rect location on window
        const currY = titleCont.getBoundingClientRect().bottom;

        //  if its top rect is inside the window range
        if(currY <= window.innerHeight) {
            
            // get how close the react is to bottomPivot, the higher % the closest. 0 means its at the bottom of the screen.
            let percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
            // scope it since we dont need to know if we are past it
            percentage = percentage > 100.0 ? 100.0 : percentage;

            const val = containerHeight / 100 * percentage;

            titleElement.style.transform = `translate(${0}rem, ${containerHeight - val}rem)`;
        }
        else {
            titleElement.style.transform = `translate(${0}rem, ${containerHeight}rem)`;
        }
    }

    useEffect(() => {

        window.addEventListener("scroll", handleWorksTitle);
        window.addEventListener("resize", handleWorksTitle);

        // update the works title
        handleWorksTitle();

        return () => {
            window.removeEventListener("scroll", handleWorksTitle);
            window.removeEventListener("resize", handleWorksTitle);
        };
    }, []);


    return (
        <div className="container">
            {/* ROW - "works" title element */}
            <div id="works" className="row">
                <div className="col">
                    <div id="works-title-cont">
                        <p id="works-title" className={GetSectionSize(breakpointState)}>Works</p>
                    </div>
                </div>
            </div>
            {/* ROW - separator element */}
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <div className="separator-rect"></div>
                </div>
            </div>
        </div>
    );
}

export default WorksTitle;