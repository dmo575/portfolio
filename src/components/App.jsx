import { useState, createContext, useEffect, useRef } from "react";

// tools
import { GetPerCurrToTarget_Bottom } from "../js/general.js";
import * as breakpoints from "./../js/bsbp.js";
import { iconsJson, contactJson } from "../js/paths.js";
import components from "./../markdownComponents.jsx";


// external components
import { Button, Modal } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehyperaw from "rehype-raw";

// components
import Navbar from "./Navbar/Navbar.jsx";
import ProfileSection from "./ProfileSection/ProfileSection.jsx";
import Skeleton from "./Skeleton/Skeleton.jsx";
import Footer from "./Footer/Footer.jsx";
import WorksTitle from "./WorksTitle/WorksTitle.jsx";
import Skillset from "./Skillset/Skillset.jsx";
import ProjectFooter from "./ProjectFooter/ProjectFooter.jsx";

// assets
import appJson from "./../assets/App.json";

// exports
export const appContext = createContext();

// variables

// defines a pivot on the screen, the value represents how far away from the bottom of the screen that pivot is, assuming the max is the top edge of the screen.
const bottomPivotLocPer = 30;

// calculates the position in pixels of the bottom pivot
function GetBottomPivotPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * bottomPivotLocPer);
}

// returns the current breakpoint state based on bootstrap breakpoints ( we only use sm md dn lg)
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

    // represents the current breakpoint state for the window
    const [breakpointState, setBreakpointState] = useState(GetCurrentBreakpoint());
    // a reference to the breakpoint state that we can use in closure functions and callbacks
    const breakpointStateRef = useRef();
    // represents a fixed point on the screen
    const bottomPivot = useRef();
    // state for the "fetching error" modal
    const [modalState, setmodalState] = useState(false);
    // live list of fetching errors
    const [errors, setErrors] = useState(null);
    // icons. Since we use these with various components, Ill use App.jsx as a resource hub
    const [icons, setIcons] = useState(null);
    // same for contact info
    const [contact, setContact] = useState(null);


    // handle the fetchin error modal
    function showModal() {setmodalState(true)};
    function hideModal() {setmodalState(false)};

    // gets called every time a fetching error happens.
    function Error(context) {

        // adds new error to the array and shows the error modal to the user.
        setErrors(prev => {

            const errorsList = prev || [];

            errorsList.push(context);

            showModal();

            return errorsList;
        });
    }

    // fetch icons
    async function InitialFetches() {

        const iconsResponse = await fetch(iconsJson);
        const contactResponse = await fetch(contactJson);

        if(iconsResponse.status != 200 || contactResponse.status != 200) {
            Error("App");
            return;
        }

        const iconsData = await iconsResponse.json();
        const contacData = await contactResponse.json();

        setContact(contacData);
        setIcons(iconsData);
    }



    // updates the opacity of all fade-in actors
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

    // called whenever the screen resizes
    function handleResize() {

        // update the bottom pivot position
        const newSize = GetCurrentBreakpoint();
        bottomPivot.current = GetBottomPivotPos();

        // update the breakpoint state
        if(newSize != breakpointStateRef.current) {

            // we need both the reference and the state because we need to cause a re-render when the breakpoint changes (so we use the state) and also be able to check
            // if we need to change the breakpoin state or not, which we do in a closure function passed as a callback, and for us to get access to the latest value we need
            // a reference.

            setBreakpointState(newSize);
        }

        // update the fade-in actors
        handleFadeIn();
    };

    // update the breakpointStateRef to point to the new object whenever it changes
    useEffect(() => {

        breakpointStateRef.current = breakpointState;

    }, [breakpointState]);

    // on mount:
    useEffect(() => {

        // get icons
        InitialFetches();

        // update fade-in acrots
        handleFadeIn();
        // update bottom pivot
        bottomPivot.current = GetBottomPivotPos();

        // sub to events
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleFadeIn);


        return () => {
            // unsub to events on un-mount
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleFadeIn);
        };

    }, []);

    return (
        <>
        <appContext.Provider value={{breakpointState, icons, contact, bottomPivot, Error}}>
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
                    {appJson.errorHeader}
                </h1>
            </Modal.Header>
            <Modal.Body>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>
                    {appJson.errorBody}
                </Markdown>
                <p>Errors:</p>
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