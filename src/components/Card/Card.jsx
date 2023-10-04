import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../../js/markdownComponents.jsx";

import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";
import Skill from "./../Skill/Skill.jsx";

import "./Card.css";


function Card({card, dir}) {

    const { breakpointState, icons, Error } = useContext(appContext);
    const [modal, setModal] = useState(false);

    // the main content of the card (.md file)
    const [cardContent, setCardContent] = useState("Loading content. . .");

    const img = <img className={`card-img-${dir}`} src={window.innerWidth < breakpoints.lg ? card.srcS : card.srcL}/>;


    function openModal() {
        setModal(true);
        loadMarkdown();
    };

    function closeModal() {
        setModal(false);
    };

    async function loadMarkdown() {
        
        const response = await (fetch(card.content));

        if(response.status === 200) {

            const data = await (response.text());

            setCardContent(data);

            return;
        }

        Error("card contents");
    };

    return (
        <>
        <div className="card flex-lg-row h-100 fade-in-actor">
            {dir === "left" || window.innerWidth < breakpoints.lg ? img : <></>}
            <div className="card-body d-flex flex-column">
                <h1 className="card-title">{card.title}</h1>
                <div className="card-text flex-grow-1">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{card.description}</Markdown>
                </div>
                <div className="card-text d-flex justify-content-lg-between justify-content-center">
                    <div className={`d-flex justify-content-lg-start justify-content-around flex-grow-1 align-items-center ${breakpointState <= breakpoints.md ? "my-3" : ""}`}>
                        {card.tech.map(el => {
                            if(Object.keys(icons).length == 0) {return}

                            return (
                                <Skill key={card.title + el} src={icons[el].color} name={icons[el].name} size={breakpointState == breakpoints.lg ? "lg" : "sm"}/>
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
            <Modal.Header closeButton className={`${breakpointState >= breakpoints.lg ? "" : "py-1"}`}>
                <div className={`col d-flex ${breakpointState >= breakpoints.lg ? "" : "flex-column justify-content-center align-items-center"}`}>
                    <div className="col-auto mx-2">
                        <h2 style={{whiteSpace: "nowrap"}}>{card.title}</h2>
                    </div>
                    <div className={`col-auto d-flex align-items-center`}>
                        {
                            card.links.map((el, index) => {
                                return(
                                    <a className={`btn btn-dark mx-2 rounded-5 ${breakpointState <= breakpoints.md ? "btn-sm" : ""}`} style={{whiteSpace: "nowrap"}} target="_blank" key={card.title+el+index} href={el.url}>{el.name}</a>
                                );
                            })
                        }
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-readable">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{cardContent}</Markdown>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default Card;