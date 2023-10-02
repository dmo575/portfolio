import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";
import Skill from "./../Skill/Skill.jsx";

import "./Card.css";


function Card({card, dir}) {

    const { breakpointState } = useContext(appContext);
    const [modal, setModal] = useState(false);
    const [markdown, setMarkdown] = useState("Loading markdown. . .");

    const img = <img className={`card-img-${dir}`} src={window.innerWidth < breakpoints.lg ? card.srcS : card.srcL}/>;


    function openModal() {
        setModal(true);
        loadMarkdown();
    };

    function closeModal() {
        setModal(false);
    };

    async function loadMarkdown() {
        
        const response = await (fetch(card.markdown));

        if(response.status === 200) {

            const data = await (response.text());

            setMarkdown(data);

        }
        else {
            setMarkdown("Error while loading the markdown content :/ . . . sry lol. You know what, lets forget u ever saw this, just hire me it will be fine, trust me bro. . . Im kidding its a connection issue, either the server went down or u just have no internet.");
        }
    };

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
                    {breakpointState >= breakpoints.lg ? <Button className="btn btn-dark rounded-5" onClick={openModal}>Check it out</Button> : <></>}
                </div>
                <div className="card-text d-flex" style={{marginTop: "1rem"}}>
                    {breakpointState >= breakpoints.lg ? <></> : <Button className="btn flex-grow-1 btn-dark rounded-5" onClick={openModal}>Check it out</Button>}
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
        <Modal show={modal} dialogClassName="modal-custom" scrollable={true} centered={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className={`col-auto col-lg d-flex flex-column flex-lg-row ${breakpointState >= breakpoints.lg ? "justify-content-between" : ""}`}>
                            <h2 style={{whiteSpace: "nowrap"}}>{card.title}</h2>
                            <div className={`btn-group ${breakpointState >= breakpoints.lg ? "" : "w-100" }`}>
                                {
                                    card.links.map((el, index) => {
                                        return(
                                            <a className="btn w-50 btn-outline-dark" style={{whiteSpace: "nowrap"}} target="_blank" key={card.name+el+index} href={el.url}>{el.name}</a>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw}>{markdown}</Markdown>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default Card;