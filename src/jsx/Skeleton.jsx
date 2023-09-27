import { useState, useEffect, useContext, useRef } from "react";
import Item from "./Item.jsx";
import WorksTitle from "./WorksTitle.jsx";
import { GetPerCurrToTarget_Bottom, GetCurrGeneralSize } from "./toolFuncs.js";
import * as breakpoints from "./bsbp.jsx";
import { appContext } from "./App.jsx";


const data = {
    imgL: "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk",
    imgS: "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4",
    title: "Project Title",
    txt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, cupiditate architecto obcaecati repellendus id ab tempore assumenda natus, voluptatem dolorem voluptas explicabo voluptates doloribus veniam! Assumenda optio tempora debitis dicta necessitatibus, dolore quasi similique reprehenderit illum sapiente provident cupiditate accusantium consectetur deleniti asperiores, itaque quam quos tempore. Unde, id dignissimos?"
}


function Skeleton() {

    const {breakpointState} = useContext(appContext);

    return (
        <div className="container">
            {/* ROW - project cards */}
            <div className={`row row-cols-${breakpointState == breakpoints.md ? '2': '1'} d-flex justify-content-center`}>
                <div className="col card-separator">
                    <Item srcImg={breakpointState <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={breakpointState <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt + data.txt} dir="right"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={breakpointState <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
            </div>
       
        </div>
    );
}

export default Skeleton;