import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* function Test() {

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
} */

const mdPath = "./../../public/markdown/test.md";

function Test() {

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {

        fetch(mdPath)
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        })
        .then(data => {
            setMarkdown(data);
        })

    }, []);


    return(
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    );

}

export default Test;