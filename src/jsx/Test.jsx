import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function Test() {

    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(true);
    };

    function handleHidden() {
        setShow(false);
    };

    return(
        <>
        <Button className="btn flex-grow-1 btn-dark rounded-5" onClick={handleShow} >Check it out</Button>

        <div className="container">
            <Modal show={show} onHide={handleHidden}>
                <Modal.Body>
                    Modal content goes here
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}

export default Test;