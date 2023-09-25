import { useEffect, useState, useRef } from "react";
import * as breakpoints from "./bsbp.jsx";

// calculates which image source to use for the item depending on the window's inner size (uses bootstrap breakpoints measures)
// returns a breakpoint value:
// +1 means the image is the large version
// -1 means the image is the small version
function UpdateSrcImg() {

    const srcImg = window.innerWidth >= breakpoints.lg ? "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk" : "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4";
    const breakpoint = window.innerWidth >= breakpoints.lg ? 1 : -1;

    return {breakpoint: breakpoint, srcImg: srcImg};
}


function Item({srcImg, title, txt, dir}) {

    /*
    // holds the src image we use for the item and a value that tells us which image it is (large version or short version)
    const [imgData, setImgData] = useState(UpdateSrcImg());

    // a ref to the imgData so that the closure function handleResize can get access to it
    const imgDataRef = useRef(imgData);

    useEffect(() => {

        // each time we resize, we check if the new window size grants a change in the image we are using for the item
        function handleResize() {

            if((window.innerWidth >= breakpoints.lg && imgDataRef.current.breakpoint < 0) || (window.innerWidth < breakpoints.lg && imgDataRef.current.breakpoint > 0)) {

                setImgDataRef.current(UpdateSrcImg());
            }
        };

        // on mount we subscribe to this event, and we unsub on un-mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);*/

    const img = <img className={`card-img-${dir}`} src={srcImg}/>;


    return (
        <div id="test" className="card flex-lg-row card-custom fade-in-actor">
            {dir === "left" || window.innerWidth < breakpoints.lg ? img : <></>}
            <div className="card-body d-flex flex-column">
                <h1 className="card-title">{title}</h1>
                <p className="card-text flex-grow-1">{txt}</p>
                <div className="card-text d-flex justify-content-between">
                    <div className="d-flex flex-grow-1 justify-content-start">
                        <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                        <img src="https://api.iconify.design/basil:adobe-photoshop-outline.svg"/>
                        <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                        <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                        <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                        <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                    </div>                                
                    <a className="btn btn-primary">Links + Info</a>
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
    );
}

export default Item;