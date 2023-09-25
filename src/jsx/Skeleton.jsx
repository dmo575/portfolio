import { useState, useEffect, useRef } from "react";
import Item from "./Item.jsx";
import * as breakpoints from "./bsbp.jsx";


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

function Skeleton() {

    const [renderSize, setRenderSize] = useState(GetCurrSize());
    const renderSizeRef = useRef(renderSize);

    useEffect(() => {

        function handleResize() {

            let currSize = GetCurrSize();

            if(renderSizeRef != currSize) {
                setRenderSize(currSize);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
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
                <div className="col">
                    <Item srcImg={renderSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt}/>
                </div>
                <div className="col">
                    <Item srcImg={renderSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt}/>
                </div>
            </div>
        </div>
    );
}

export default Skeleton;