import { useEffect, useState, useRef } from "react";
import * as breakpoints from "./bsbp.js";

function Item({srcImg, title, txt, dir}) {

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
                    <a className="btn rounded-5 btn-dark">Links + Info</a>
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
    );
}

export default Item;