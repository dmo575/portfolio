import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

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
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw}>{markdown}</Markdown>
    );

}

export default Test;