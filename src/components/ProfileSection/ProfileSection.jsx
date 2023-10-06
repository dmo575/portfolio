import { useContext, useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

import * as breakpoints from "./../../variables/bsbp.js";
import { GetTitleSize } from "./../../js/toolFuncs.js";
import { profileSectionJson } from "../../js/paths.js";
import components from "../../js/markdownComponents.jsx";

import { appContext } from "./../App.jsx";

import "./ProfileSection.css";

const pageSectionId = "#page-section";
const cssVarPageVel = "--page-vel";
const pageVel = 0.4;

function ProfileSection() {

    const [state, setState] = useState(null);
    const {breakpointState, Error} = useContext(appContext);
    const [modalState, setModalState] = useState(false);
    const pageIndex = useRef(0);


    // transitions the pages
    function goNextPage() {

        // get pages parent
        const pageParent = document.querySelector(pageSectionId);
        // calculate offset
        const offset = pageParent.offsetWidth;

        // get pages (last item is the invis page)
        const pages = pageParent.children;

        // for each page, set the transition vel and translate it
        for(let i = 0; i < pages.length - 1; i++) {

            pages[i].style.setProperty(cssVarPageVel, `${pageVel}s`);
            pages[i].style.transform = `translate(${offset * (i + pageIndex.current - 1)}px, ${0})`;
        }

        // update the page index
        pageIndex.current = pageIndex.current < state.pageLinks.length - 1 ? pageIndex.current + 1 : 0;
    }

    function closeModal() {
        setModalState(false);
    }

    useEffect(() => {

        const getProfileData = async () => {

            const profileResponse = await(fetch(profileSectionJson));

            if(profileResponse.status != 200) {

                Error("profile");
                return;
            }

            const profileData = await(profileResponse.json());

            // now we prepare for the next fetch
            const pageContents = [];
            const pageRequests = [];

            profileData.pageContents.forEach(page => {

                pageRequests.push(fetch(page));
            });

            const pageResponses = await Promise.allSettled(pageRequests);

            // If all pages requests were 200OK, get the texts onto pageContents, else send error and return.
            for(let i = 0; i < pageResponses.length; i++) {

                if(pageResponses[i].status == "rejected") {
                    Error("Profile text page");
                    return;
                }

                pageContents.push(await (pageResponses[i].value.text()));
            }
            profileData.pageContents = pageContents;

            setState(profileData);
        };

        // resizes the pages according to the new window
        function resizePages() {

            // get pages parent
            const pageParent = document.querySelector(pageSectionId);
            // calculate offset
            const offset = pageParent.offsetWidth;

            // get pages (last item is the invis page)
            const pages = pageParent.children;

            // for each page, update its position
            for(let i = 0; i < pages.length - 1; i++) {

                pages[i].style.setProperty(cssVarPageVel, `${0}s`);
                pages[i].style.transform = `translate(${offset * (i - pageIndex.current)}px, ${0})`;
            }
        };

        getProfileData();
        window.addEventListener("resize", resizePages);

        return () => {
            window.removeEventListener("resize", resizePages);
        };


    }, []);

    function LoadPages(invis) {

        const pageCount = state.pageContents.length;
        const pageElements = [];
        const pageParent = document.querySelector(pageSectionId);
        const offset = pageParent.offsetWidth;

        for(let i = 0; i < pageCount; i++) {

            if(invis) i++;

            pageElements.push(
                (
                    <div className={`col px-sm-5 h-100 test d-flex flex-column justify-content-center ${invis && "disable-click"}`} key={`profile-page-${i}-${invis && "invis"}`} style={{opacity: (invis ? 0 : 1),transform:`translate(${offset * i}px, ${0}%)`, position: (invis ? "static" : "absolute")}}>
                        <div>
                            <p className={GetTitleSize(breakpointState)}>{state.pageHeaders[i]}</p>
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{state?.pageContents[(invis ? 1 : i)]}</Markdown>
                        </div>
                        <div className="col-auto d-flex justify-content-end">
                            <Button variant="link" onClick={goNextPage}><p>{state.pageLinks[i]}</p></Button>
                        </div>
                    </div>
                    
                )
            );

            if(invis) break;
        }

        return <>
        {
            pageElements.map(el => el)
        }
        </>;

    }

    return (
        <div id="profile-section" className="container-fluid">

            <div className="row d-flex flex-column flex-md-row" style={{backgroundColor: "grey"}}>
                <div className="col-md p-0"></div>{/* SPACER col */}

                <div className="col-auto p-0 d-flex justify-content-center" style={{backgroundColor: "yellow"}}> {/* IMAGE col */}
                    <img className="img-fluid" style={{objectFit: "contain"}} src={breakpointState >= breakpoints.md ? state?.srcL : state?.srcS} alt="Profile image" />
                </div>

                <div className="col-md p-0"></div>{/* SPACER col */}

                <div id="page-section" className="text-center text-md-start col-md-7 profile-page-container" style={{backgroundColor: "lightgreen", position: "relative"}}> {/* PAGE AERA col */}
                    {state && LoadPages(false)}{/* we first loat the pages and position them */}
                    {state && LoadPages(true)}{/* we then load the first page, invisible and with static positioning so that its container will vertically update */}
                </div>

                <div className="col-md p-0"></div>{/* SPACER col */}
            </div>


            <Modal show={modalState} centered={true} onHide={closeModal}>
                <Modal.Header>
                    Modal Header
                </Modal.Header>
                <Modal.Body>
                    Modal body
                </Modal.Body>
            </Modal>
        </div>
    );
}


function ProfileSectionOld() {

    const [state, setState] = useState(null);
    const {breakpointState, Error} = useContext(appContext);
    const [modalState, setModalState] = useState(false);


    function showModal(e) {
        setModalState(true);
    }

    function closeModal() {
        setModalState(false);
    }

    useEffect(() => {

        const getProfileData = async () => {

            const response = await(fetch(profileSectionJson));

            if(response.status != 200) {

                Error("profile");
                return;
            }

            const data = await(response.json());
            
            const bodyContentRespose = await(fetch(data.bodyMarkdown));
            
            if(bodyContentRespose.status != 200) {
                Error("body markdown content");
                return;
            }
            
            const bodyContentData = await (bodyContentRespose.text());
            
            data.bodyMarkdown = bodyContentData;
            
            setState(data);
        };

        getProfileData();

    }, []);


    return (
        <div id="profile-section" className="container-fluid">

            <div className="row d-flex flex-column flex-md-row align-items-center">
                <div className={"col-7 col-md-auto col-5 gx-0 offset-md-1 offset-xl-2 d-flex justify-content-center flex-column"}>
                    <img className="img-fluid" src={breakpointState >= breakpoints.md ? state?.srcL : state?.srcS} alt="profile-img" />
                </div>
                <div className="col-md col-10 offset-md-1 gx-0 gy-5 gy-md-0 text-center text-md-start">
                    <p className={GetTitleSize(breakpointState)}>{state?.header}</p>
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{state?.bodyMarkdown}</Markdown>
                </div>
                <div className="col-1 col-xl-2"></div>
            </div>
            <div className="row">
                <div className="col-auto offset-8">
                    <Button variant="link" onClick={showModal}><p>How I got into web development &#8674;</p></Button>
                </div>
            </div>

            <Modal show={modalState} centered={true} onHide={closeModal}>
                <Modal.Header>
                    Modal Header
                </Modal.Header>
                <Modal.Body>
                    Modal body
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProfileSection;