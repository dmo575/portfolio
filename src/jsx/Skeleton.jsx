import { useState, useEffect, useRef } from "react";
import Item from "./Item.jsx";
import * as breakpoints from "./bsbp.jsx";


// provide a point in the screen (in percentage, bottom to top) by where all fade-in-actors should be completely opaque
const fadeInPoint = 50;

const data = {
    imgL: "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk",
    imgS: "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4",
    title: "Project Title",
    txt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, cupiditate architecto obcaecati repellendus id ab tempore assumenda natus, voluptatem dolorem voluptas explicabo voluptates doloribus veniam! Assumenda optio tempora debitis dicta necessitatibus, dolore quasi similique reprehenderit illum sapiente provident cupiditate accusantium consectetur deleniti asperiores, itaque quam quos tempore. Unde, id dignissimos?"
}


function GetCurrSize() {
    let currSize = window.innerWidth;

    if(currSize < breakpoints.md) {
        return breakpoints.sm;
    }
    else if(currSize < breakpoints.lg) {
        return breakpoints.md;
    }

    return breakpoints.lg;
}

// converts the fadeInPoint from a percentage to a real pixel unit for the current screen
// aka: this number is a pixel, and any fade-in-actor element must be 100% opaque by the time their top reaches this pixel unit.
function GetFadeInPixelPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * fadeInPoint);
}

function Skeleton() {

    const [renderSize, setRenderSize] = useState(GetCurrSize());
    const renderSizeRef = useRef(renderSize);
    let fadeInPixelPos = useRef(GetFadeInPixelPos());

    useEffect(() => {

        // triggered whenever the screen size changes, makes sure that the renderSize state gets updated
        function handleResize() {

            let currSize = GetCurrSize();
            fadeInPixelPos = GetFadeInPixelPos();

            if(renderSizeRef != currSize) {
                setRenderSize(currSize);
            }
        };

        // triggered whenever we scroll the page, makes sure to update fade-in-actors opacity
        function handleScroll() {
            // get all fade-in-actors
            const actors = document.querySelectorAll(".fade-in-actor");

            // update their opacity based on current y offset
            actors.forEach((e) => {

                const currY = e.getBoundingClientRect().top;

                // if the top of this element is above the window's bottom edge:
                if(currY <= window.innerHeight) {

                    const rangeVal = window.innerHeight - fadeInPixelPos.current;
                    const valInRange = window.innerHeight - currY;
                    const percentage = (100 / rangeVal) * valInRange;

                    e.style.opacity = percentage / 100;
                }
            });

        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    Here goes my Presentation card
                </div>
            </div>

            <div className={`row row-cols-${renderSize == breakpoints.md ? '2': '1'}`}>
                <div className="col card-separator">
                    <Item srcImg={renderSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt}/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={renderSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt + data.txt}/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={renderSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt}/>
                </div>
            </div>
       
        </div>
    );
}

export default Skeleton;