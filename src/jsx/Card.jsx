import * as breakpoints from "./bsbp.js";
import Skill from "./Skill.jsx";
import { useContext, useState } from "react";
import { appContext } from "./App.jsx";
import { Modal, Button } from "react-bootstrap";

function Card({card, dir}) {

    const { breakpointState } = useContext(appContext);
    const [modal, setModal] = useState(false);

    const img = <img className={`card-img-${dir}`} src={window.innerWidth < breakpoints.lg ? card.srcS : card.srcL}/>;


    function openModal() {
        setModal(true);
    };

    function closeModal() {
        setModal(false);
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
                    {breakpointState >= breakpoints.lg ? <Button className="btn flex-grow-1 btn-dark rounded-5" onClick={openModal}>Check it out</Button> : <></>}
                </div>
                <div className="card-text d-flex" style={{marginTop: "1rem"}}>
                    {breakpointState >= breakpoints.lg ? <></> : <Button className="btn flex-grow-1 btn-dark rounded-5" onClick={openModal}>Check it out</Button>}
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
        <div className="container">
            <Modal show={modal} onHide={closeModal}>
                <Modal.Header>Header</Modal.Header>
                <Modal.Body>
                    Modal content
                </Modal.Body>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal>
        </div>
        </>
    );
}

export default Card;