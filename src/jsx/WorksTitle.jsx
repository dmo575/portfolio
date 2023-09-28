import { useEffect, useContext, useRef } from "react";
import { GetPerCurrToTarget_Bottom, GetSectionSize } from "./toolFuncs";
import { appContext } from "./App.jsx";
import * as breakpoints from "./bsbp.js";

// how much should the works title translate upwards, in rem. One for md+, other for sm-
const worksTitleMovLg = 12;
const worksTitleMovMd = 10;
const worksTitleMovSm = 7;

let lastScrollY = window.scrollY;
let lastScrollDir = 0;


function WorksTitle() {

    const {bottomPivot, breakpointState} = useContext(appContext);
    const breakpointStateRef = useRef();

    useEffect(() => {
        breakpointStateRef.current = breakpointState;
    }, [breakpointState]);

    function handleWorksTitle() {

        // get scroll direction (1 means scrolling up, -1 means scrolling down)
        let newScrollDir = lastScrollY > window.scrollY ? 1 : -1;
        
        //geth the container that we will modify
        const titleCont = document.querySelector("#works-title-cont");
        
        // the the container's current position (bottom rects pos)
        const currY = titleCont.getBoundingClientRect().bottom;
        
        // if the containers bottom rect pos is within the confines of the screen
        if(currY <= window.innerHeight && (newScrollDir == lastScrollDir)) {
            
            // calculate the heigth target based on screen breakpoint
            const heightTarget = breakpointStateRef.current == breakpoints.lg ? worksTitleMovLg : (breakpointStateRef.current == breakpoints.md ? worksTitleMovMd : worksTitleMovSm);
            
            // calculate the percentage of height that we want to apply to the target
            const percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
            
            // convert the percentage onto a real value (in rem)
            const value = heightTarget / 100 * percentage;
            
            const currHeight = parseFloat(titleCont.style.height.substr(0, titleCont.style.height.length - 3));
            
            if((newScrollDir == -1 && currHeight > value) || (newScrollDir == 1 && currHeight < value)) {
                lastScrollY = window.scrollY;
                lastScrollDir = newScrollDir;
                return;
            }
            
            
            // apply the height value
            titleCont.style.height = `${value <= heightTarget ? value : heightTarget }rem`;
        }

        lastScrollY = window.scrollY;
        lastScrollDir = newScrollDir;
    };


    useEffect(() => {
        window.addEventListener("scroll", handleWorksTitle);
        window.addEventListener("resize", handleWorksTitle);


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
                    <div className="separator"></div>
                </div>
            </div>
        </div>
    );
}

export default WorksTitle;