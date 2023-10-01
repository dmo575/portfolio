import * as breakpoints from "./bsbp.js";
import Skill from "./Skill.jsx";
import { useContext } from "react";
import { appContext } from "./App.jsx";

function Card({card, dir}) {

    const { breakpointState } = useContext(appContext);

    const img = <img className={`card-img-${dir}`} src={window.innerWidth < breakpoints.lg ? card.srcS : card.srcL}/>;

    return (
        <>
        <div className="card flex-lg-row h-100 fade-in-actor">
            {dir === "left" || window.innerWidth < breakpoints.lg ? img : <></>}
            <div className="card-body d-flex flex-column">
                <h1 className="card-title">{card.title}</h1>
                <p className="card-text flex-grow-1">{card.description}</p>
                <div className="card-text d-flex justify-content-lg-between justify-content-center">
                    <div className={`d-flex justify-content-lg-start justify-content-around flex-grow-1 align-items-center ${breakpointState <= breakpoints.md ? "my-3" : ""}`}>
                        {card.tech.map(el => {
                            return (
                                <Skill key={card.title + el.name} src={el.src} name={el.name} size={breakpointState == breakpoints.lg ? "lg" : "sm"}/>
                            );
                        })}
                    </div>
                    {breakpointState >= breakpoints.lg ? <a className="btn rounded-5 btn-dark">Check it out</a> : <></>}
                </div>
                <div className="card-text d-flex" style={{marginTop: "1rem"}}>
                    {breakpointState >= breakpoints.lg ? <></> : <button className="btn flex-grow-1 btn-dark" data-bs-toggle="modal" data-bs-target="#test">Check it out</button>}
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
        <div className="container">
            <div id="test" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        My content
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Card;