import { useContext, useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

import * as breakpoints from "./../../js/bsbp.js";
import { GetTitleSize } from "../../js/general.js";
import { profileSectionJson } from "../../js/paths.js";
import components from "../../markdownComponents.jsx";

import { appContext } from "./../App.jsx";

import "./ProfileSection.css";

const pageSectionId = "#page-section";
const cssVarPageVel = "--page-vel";
const pageVel = 0.4;

function ProfileSection() {

    // holds the fetched data
    const [state, setState] = useState(null);
    const {breakpointState, Error} = useContext(appContext);
    // holds the current page index
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

    useEffect(() => {

        const getProfileData = async () => {

            const profileResponse = await(fetch(profileSectionJson));

            if(profileResponse.status != 200) {

                Error("profile data");
                return;
            }

            const profileData = await(profileResponse.json());

            // will hold each page's content (makdown files)
            const pageContents = [];
            // will hold a fetch promise per page
            const pageRequests = [];

            // for each page
            profileData.pageContents.forEach(page => {

                // fetch its markdown file
                pageRequests.push(fetch(page));
            });

            // wait for all page fetches to be resolved
            const pageResponses = await Promise.allSettled(pageRequests);

            // If all pages fetches were 200 OK, get the texts onto pageContents, else send error and return.
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

        // a small hardcoded animation for the profile logo
        function startLogoAnimation() {

            // time it takes to change the opacity of each element
            const loop = 100;


            const int = setInterval(() => {

                const overlays = document.querySelectorAll(".logo-img-overlay");

                // time I will wait for the opacity to go from one extreme to the other.
                const time = 1000;

                // time that will transpire between element animations
                const cd = -500;

                function overlayAnimation(el) {
                    el.style.opacity = "80%";
    
                    setTimeout(() => {
                        el.style.opacity = "0%";
                    }, time);
                };


                for(let i = 1; i < overlays.length; i++) {

                    setTimeout(() => {

                        setInterval(() => {

                            overlayAnimation(overlays[i]);
    
                        }, ((time * 2) + cd) * (overlays.length - 1));

                    }, ((i - 1) * time * 2) + ((i - 1) * cd));

                }

                if(overlays.length > 0) {

                    for(let i = 1; i < overlays.length; i++) {
                        setTimeout(() => {
                            overlayAnimation(overlays[i]);
                        }, ((i - 1) * time * 2) + ((i - 1) * cd));
                    }


                    clearInterval(int);
                }

            }, loop);
        };

        startLogoAnimation();

        getProfileData();
        window.addEventListener("resize", resizePages);

        return () => {
            window.removeEventListener("resize", resizePages);
        };


    }, []);

    // loads JSX for each page
    // invis:
    // in order for the container of the pages to resize properly, we need a hidden extra page, this is
    // because the container is relative and the pages absolute, meaning the container will not change shape
    // to adapt for the pages new shape.
    // The extra invisible page is a static shild of the container. Its also the page with the more content on it, which
    // in our case is the second one.
    function LoadPages(invis) {

        const pageCount = state.pageContents.length;
        const pageElements = [];
        const pageParent = document.querySelector(pageSectionId);
        const offset = pageParent.offsetWidth;

        for(let i = 0; i < pageCount; i++) {

            // if we are loading the invis page, set index to 1 (second page)
            if(invis) i++;

            // add the page JSX onto the pagesElements array
            pageElements.push(
                (
                    <div className={`${breakpointState == breakpoints.sm ? `mx-3` : ``} col px-sm-5 h-100 title-page d-flex flex-column justify-content-center ${invis && "disable-click"}`} key={`profile-page-${i}-${invis && "invis"}`} style={{opacity: (invis ? 0 : 1),transform:`translate(${offset * i}px, ${0}%)`, position: (invis ? "static" : "absolute")}}>
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

            // if we are loading the invis page, break
            if(invis) break;
        }

        // return all the pageElements JSX as one JSX particle
        return <>
        {
            pageElements.map(el => el)
        }
        </>;

    }

    return (
        <div id="profile-section" className="container-fluid">

            <div className="row d-flex flex-column flex-md-row">
                <div className="col-md p-0"></div>{/* SPACER col */}

                <div className="col-auto p-0 d-flex justify-content-center align-items-center"> {/* IMAGE col */}
                    <div className="profile-logo-container">
                        <img className="img-fluid logo-img" style={{objectFit: "contain"}} src={state?.logo[0]}/>
                        {
                            state?.logo.map((el, index) => {

                                if(index == 0) return;

                                return(
                                    <img key={`$lg-${index}`} className="img-fluid logo-img-overlay" style={{objectFit: "contain"}} src={el} alt="Profile image" />
                                );
                            })
                        }
                    </div>
                </div>

                <div className="col-md p-0"></div>{/* SPACER col */}

                <div id="page-section" className="text-center text-md-start col-md-7 profile-page-container" style={{position: "relative"}}> {/* PAGE AERA col */}
                    {state && LoadPages(false)}{/* we first loat the pages and position them */}
                    {state && LoadPages(true)}{/* we then load the first page, invisible and with static positioning so that its container will vertically update */}
                </div>

                <div className="col-md p-0"></div>{/* SPACER col */}
            </div>

        </div>
    );
}

export default ProfileSection;