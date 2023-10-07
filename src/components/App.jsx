import { useState, createContext, useEffect, useRef } from "react";

import { GetPerCurrToTarget_Bottom } from "./../js/toolFuncs.js";
import * as breakpoints from "./../variables/bsbp.js";
import { Button, Modal } from "react-bootstrap";


import Navbar from "./Navbar/Navbar.jsx";
import ProfileSection from "./ProfileSection/ProfileSection.jsx";
import Skeleton from "./Skeleton/Skeleton.jsx";
import Footer from "./Footer/Footer.jsx";
import WorksTitle from "./WorksTitle/WorksTitle.jsx";
import Skillset from "./Skillset/Skillset.jsx";
import ProjectFooter from "./ProjectFooter/ProjectFooter.jsx";
import Test from "./Test.jsx";


export const appContext = createContext();
const bottomPivotLocPer = 30;
const iconsJson = "./JSON/Icons.json";


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

// Fetches the icons json and returns its object
async function FetchIcons() {

    const response = await(fetch(iconsJson));

    if(response.status == 200) {

        const data = await(response.json());

        return data;
    }
}



function App() {

    const [breakpointState, setBreakpointState] = useState(GetCurrentBreakpoint());
    const breakpointStateRef = useRef();
    const bottomPivot = useRef();
    const [icons, setIcons] = useState(null);
    const [modalState, setmodalState] = useState(false);
    const [errors, setErrors] = useState(null);

    function showModal() {setmodalState(true)};
    function hideModal() {setmodalState(false)};

    // gets called every time a fetching error happens.
    function Error(context) {

        // adds new error to the array and shows the error modal to the user.
        setErrors(prev => {

            const errorsList = prev || [];

            errorsList.push(context);

            showModal();

            console.log(`Errors: ${errorsList}`);

            return errorsList;
        });
    }

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

        // fetch icons json
        const getIcons = async () => {

            const iconsData = await(FetchIcons());

            // set the iconsData state to contain the icons object
            setIcons(iconsData);
        };

        getIcons();
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
            <Test/>
        <appContext.Provider value={{breakpointState, bottomPivot, icons, Error}}>
            <Navbar/>
            <ProfileSection/>
            <Skillset/>
            <WorksTitle/>
            <Skeleton/>
            <ProjectFooter/>
            <Footer/>
        </appContext.Provider>
        <Modal show={modalState} onHide={hideModal} centered>
            <Modal.Header>
                <h1 className="text-center w-100">
                    Error while fetching data from the server
                </h1>
            </Modal.Header>
            <Modal.Body>
                <p>An error occured while fetching data from the server. <strong style={{fontSize:"1.5rem"}}>Please refresh the webpage</strong></p>
                <p>If the issue persists after refreshing. Dont worry, I promise the content was great, you can hire me at arco4@protonmail.com 😃</p>
                <p>Errors: </p>
                {errors?.map((el, index) => {
                    return (
                        <p key={`error ${index}`} style={{display:"inline"}}>{el}{index == (errors.length - 1) ? "." : ", "}</p>
                    );
                })}
            </Modal.Body>
        </Modal>
        </>
    );
}

export default App;