import { useState, createContext, useEffect, useRef } from "react";
import * as breakpoints from "./bsbp.js";
import { GetPerCurrToTarget_Bottom } from "./toolFuncs";

import Navbar from "./Navbar.jsx";
import ProfileSection from "./ProfileSection.jsx";
import Skeleton from "./Skeleton.jsx";
import Footer from "./Footer.jsx";
import WorksTitle from "./WorksTitle.jsx";
import Skillset from "./Skillset.jsx";
import * as content from "./content.js";

export const appContext = createContext();
const bottomPivotLocPer = 30;


function GetBottomPivotPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * bottomPivotLocPer);
}

/* returns current breakpoint (only uses sm-, md and lg+) */
function GetCurrentBreakpoint() {
    let currSize = window.innerWidth;

    if(currSize < breakpoints.md) {
        return breakpoints.sm;
    }
    else if(currSize < breakpoints.lg) {
        return breakpoints.md;
    }

    return breakpoints.lg;
}

function App() {

    const [breakpointState, setBreakpointState] = useState(GetCurrentBreakpoint());
    const breakpointStateRef = useRef();
    const bottomPivot = useRef();

    function handleFadeIn() {

        // get all fade-in-actors
        const actors = document.querySelectorAll(".fade-in-actor");
        
        // update their opacity based on current y offset
        actors.forEach((e) => {

            const currY = e.getBoundingClientRect().top;
            
            // if the top of this element is above the window's bottom edge:
            if(currY <= window.innerHeight) {
                
                const percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
                const value = percentage / 100;
                
                e.style.opacity = value;
            }
        });
    };

    function handleResize() {

        const newSize = GetCurrentBreakpoint();
        bottomPivot.current = GetBottomPivotPos();

        if(newSize != breakpointStateRef.current) {

            setBreakpointState(newSize);
        }

        handleFadeIn();
    };

    useEffect(() => {

        breakpointStateRef.current = breakpointState;

    }, [breakpointState]);

    useEffect(() => {

        handleFadeIn();
        bottomPivot.current = GetBottomPivotPos();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleFadeIn);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleFadeIn);
        };

    }, []);

    return (
        <>
        <appContext.Provider value={{breakpointState, bottomPivot}}>
            <Navbar/>
            <ProfileSection/>
            <Skillset skills={content.skills}/>
            <WorksTitle/>
            <Skeleton/>
        </appContext.Provider>
        <Footer/>
        </>
    );
}

export default App;