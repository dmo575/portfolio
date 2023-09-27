import { useState, createContext, useEffect, useRef, useCallback } from "react";
import * as breakpoints from "./bsbp.jsx";
import { GetCurrGeneralSize, GetPerCurrToTarget_Bottom } from "./toolFuncs";

import Navbar from "./Navbar.jsx";
import ProfileSection from "./ProfileSection.jsx";
import Skeleton from "./Skeleton.jsx";
import Footer from "./Footer.jsx";
import WorksTitle from "./WorksTitle.jsx";

export const appContext = createContext();
const bottomPivotLocPer = 50;


function GetBottomPivotPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * bottomPivotLocPer);
}

function App() {

    const [breakpointState, setBreakpointState] = useState(GetCurrGeneralSize());
    const breakpointStateRef = useRef();
    const bottomPivot = useRef(GetBottomPivotPos());

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

        const newSize = GetCurrGeneralSize();
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
            <WorksTitle/>
            <Skeleton/>
        </appContext.Provider>
        <Footer/>
        </>
    );
}

export default App;