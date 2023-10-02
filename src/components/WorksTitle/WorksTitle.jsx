import { useEffect, useContext, useRef } from "react";

import { GetPerCurrToTarget_Bottom, GetSectionSize } from "./../../js/toolFuncs.js";
import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";

import "./WorksTitle.css";

// how much should the works title translate upwards, in rem. One for md+, other for sm-
const worksTitleMovLg = 12;
const worksTitleMovMd = 10;
const worksTitleMovSm = 7;

let lastScrollY = window.scrollY;
let lastScrollDir = 0;

// delete after refactor
//let lastValidTargetY = 0;


function WorksTitle() {

    const { breakpointState } = useContext(appContext);
    const breakpointStateRef = useRef();

    useEffect(() => {
        breakpointStateRef.current = breakpointState;
    }, [breakpointState]);

    function handleWorksTitle() {

        // sets the velocity at which the text will increase its height per change in window offset
        const vel_landscape = 0.035;
        const vel_portrait = 0.02;

        // assign height increase velocity based on viewport layout.
        const vel = window.innerWidth > window.innerHeight ? vel_landscape : vel_portrait;

        // get scroll direction (1 means scrolling up, -1 means scrolling down)
        let newScrollDir = lastScrollY > window.scrollY ? 1 : -1;
        
        //get the container that we will modify
        const titleCont = document.querySelector("#works-title-cont");
        
        // the the container's current position (bottom and top rects position)
        const currYBottom = titleCont.getBoundingClientRect().bottom;
        const currYTop = titleCont.getBoundingClientRect().top;

        // calculate the desired final height for the container based on screen breakpoint
        const maxHeight = breakpointStateRef.current == breakpoints.lg ? worksTitleMovLg : (breakpointStateRef.current == breakpoints.md ? worksTitleMovMd : worksTitleMovSm);

        // we only proceed if the container we want to mod is within the window space and the scroll motion has the same direction that it had last time the event was called
        if(currYBottom <= window.innerHeight && (newScrollDir == lastScrollDir) && currYTop > 0) {
            
            // get the container's current height (in rem units)
            let currHeight = parseFloat(titleCont.style.height.substr(0, titleCont.style.height.length - 3));

            // if Nan, it means the value is 0
            currHeight = currHeight ? currHeight : 0;

            // calculate the new height, this is the current hegiht plus the difference in window position times velocity
            let newVal = currHeight + ( (window.scrollY - lastScrollY) * vel);

            // clamp the value to the desired range (0 and maxHeight)
            newVal = newVal < 0 ? 0 : newVal;
            newVal = newVal > maxHeight ? maxHeight : newVal;

            // update container's height value
            titleCont.style.height = `${newVal}rem`;
        }
        else {

            if(currYBottom <= 0) {
                titleCont.style.height = `${maxHeight}rem`;
            }
            else if (currYTop >= window.innerHeight) {
                titleCont.style.height = `${0}rem`;
            }
        }

        // keep track of the scrollY value and direction from this scroll event so that we can compare with next scroll event
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
                    <div className="separator-rect"></div>
                </div>
            </div>
        </div>
    );
}


// old code, delete after refactor is done
function save() {

    //geth the container that we will modify
    const titleCont = document.querySelector("#works-title-cont");
    
    // the the container's current position (bottom rects pos)
    const currY = titleCont.getBoundingClientRect().bottom;
    
    // if the containers bottom rect pos is within the confines of the screen
    // we also check if the direction of this scroll is the same as the last scroll event, this is due to a weird scroll bug that triggers inconsisten scrolling (up and down) while scrolling 
    // either up or down around the Works title area
    if(currY <= window.innerHeight) {
        
        // calculate the heigth target based on screen breakpoint
        const heightTarget = breakpointStateRef.current == breakpoints.lg ? worksTitleMovLg : (breakpointStateRef.current == breakpoints.md ? worksTitleMovMd : worksTitleMovSm);
        
        // calculate the percentage of height that we want to apply to the target
        const percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
        
        // convert the percentage onto a real value (in rem)
        const value = heightTarget / 100 * percentage;
        
        // apply the height value
        titleCont.style.height = `${value <= heightTarget ? value : heightTarget }rem`;
    }
};

export default WorksTitle;