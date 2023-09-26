import { useState, useEffect, createContext, useRef } from "react";
import Item from "./Item.jsx";
import WorksTitle from "./WorksTitle.jsx";
import { GetPerCurrToTarget_Bottom, GetCurrGeneralSize } from "./toolFuncs.js";
import * as breakpoints from "./bsbp.jsx";


// provide a point in the screen (in percentage, bottom to top) by where all fade-in-actors should be completely opaque
const bottomPivotLocPercentage = 50;
export const PivotContext = createContext();

const data = {
    imgL: "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk",
    imgS: "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4",
    title: "Project Title",
    txt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, cupiditate architecto obcaecati repellendus id ab tempore assumenda natus, voluptatem dolorem voluptas explicabo voluptates doloribus veniam! Assumenda optio tempora debitis dicta necessitatibus, dolore quasi similique reprehenderit illum sapiente provident cupiditate accusantium consectetur deleniti asperiores, itaque quam quos tempore. Unde, id dignissimos?"
}

// converts the fadeInPoint from a percentage to a real pixel unit for the current screen
// aka: this number is a pixel, and any fade-in-actor element must be 100% opaque by the time their top reaches this pixel unit.
function GetFadeInPixelPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * bottomPivotLocPercentage);
}

function Skeleton() {

    const [generalSize, setGeneralSize] = useState(GetCurrGeneralSize());
    const generalSizeRef = useRef(generalSize);

    let bottomPivot = useRef(GetFadeInPixelPos());

    // updates all the fade-in-actor elements
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

    useEffect(() => {

        /* on resize, update the bottom pivot and */
        function handleResize() {

            // updates the general size state
            let currSize = GetCurrGeneralSize();
            
            if(generalSizeRef != currSize) {
                setGeneralSize(currSize);
            }
            
            // updates the bottom pivot and fade in actors and the works title
            bottomPivot.current = GetFadeInPixelPos();
            handleFadeIn();
        };

        handleFadeIn();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleFadeIn);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleFadeIn);
        };
    }, []);

    return (
        <div className="container">

            <PivotContext.Provider value={bottomPivot}>
            <WorksTitle/>
            </PivotContext.Provider>

            {/* ROW - project cards */}
            <div className={`row row-cols-${generalSize == breakpoints.md ? '2': '1'} d-flex justify-content-center`}>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt + data.txt} dir="right"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
            </div>
       
        </div>
    );
}

export default Skeleton;