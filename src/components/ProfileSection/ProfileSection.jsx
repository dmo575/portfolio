import { useContext, useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

import * as breakpoints from "./../../variables/bsbp.js";
import { GetTitleSize } from "../../js/general.js";
import { profileSectionJson } from "../../js/paths.js";
import components from "../../js/markdownComponents.jsx";

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
                    <div className={`col px-sm-5 h-100 title-page d-flex flex-column justify-content-center ${invis && "disable-click"}`} key={`profile-page-${i}-${invis && "invis"}`} style={{opacity: (invis ? 0 : 1),transform:`translate(${offset * i}px, ${0}%)`, position: (invis ? "static" : "absolute")}}>
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

            console.log(offset);

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

                <div className="col-auto p-0 d-flex justify-content-center"> {/* IMAGE col */}
                    <img className="img-fluid" style={{objectFit: "contain"}} src={breakpointState >= breakpoints.md ? state?.srcL : state?.srcS} alt="Profile image" />
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