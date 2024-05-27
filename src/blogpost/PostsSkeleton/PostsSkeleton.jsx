import { useEffect, useState, useRef } from "react";
import { ListGroup, Modal } from "react-bootstrap";

import { postsJson } from "../../js/paths";
import * as breakpoints from "./../../js/bsbp.js";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../../markdownComponents.jsx";// custom components for Markdown

import "./../../components/Card/Card.css";

// defines how the list of posts get rendered
// it also provides the modal that opens and loads the articles to the visitor.
function PostsSkeleton() {

    const [state, setState] = useState(null);
    const [modal, setModal] = useState(false);
    const refModalContent = useRef(null);
    const [clickedItem, setClickedItem] = useState(null);

    useEffect(() => {

        // get json
        const loadPostData = async () => {

            const response = await fetch(postsJson);

            if(response.status == 200) {

                const data = await response.json();

                setState(data);
            }
        };

        loadPostData();

    }, []);

    function removeActive(event) {
        // triggets the unclicking of the button
        setClickedItem(event.target.id);
    }

    useEffect(() => {

        // this checks when a clickedItem even occured. Ot gets the ID of the clicked item, removes its clicked status and unfocuses it
        if(!clickedItem) return;

        let element = document.getElementById(clickedItem);

        element.classList.remove(`active`);
        element.blur();
    }, [clickedItem])

    // returns a post as a MODAL.
    function loadPost_asModal(title, index) {

        return(
            <li key={`post-${title}`}>
                <ListGroup.Item className="rounded-2 my-1 box-shadow" variant="secondary" data-index={index} action onClick={openModal}>
                    {title}
                </ListGroup.Item>
            </li>
        );
    }

    // returns a post as a LINK.
    function loadPost_asLink(title, index, id) {

        return(
            <li key={`post-${title}`}>
                <ListGroup.Item id={id} className="rounded-2 my-1 box-shadow" variant="secondary" data-index={index} action onClick={removeActive} href={`/postViewer/postViewer.html?postId=${id}`}>
                    {title}
                </ListGroup.Item>
            </li>
        );
    }

    // opens the modal that contains the post's content
    async function openModal(event) {

        // get the index of the post
        const dataIndex = event.target.getAttribute("data-index");
        
        // fetch the markdown
        const response = await fetch(state.posts[dataIndex].markdown);
        
        if(response.status == 200) {
            
            const data = await response.text();
            
            // set the content ref variable so that when we open the modal it shows the correct content
            refModalContent.current = data;
        }
        
        // open modal
        setModal(true);
    };

    function closeModal() {
        setModal(false);
    }


    // col with a list of all posts in posts.json
    return(
        <div className="container">
            <div className="row d-flex justify-content-center"> {/* Posts section */}
                <div className="col-auto">
                    <ListGroup>
                        <ul>
                        {
                            state?.posts.map((el, index) => {
                                return loadPost_asLink(el.title, index, el.postId);
                            })
                        }
                        </ul>
                    </ListGroup>
                </div>
            </div>
            <Modal show={modal} fullscreen={`md-down`} dialogClassName={`modal-custom`} scrollable={true} centered={true} onHide={closeModal}>
                <Modal.Header closeButton/> {/* modal header, only used to show the close button, the title we will keep in in the markdown and let it be scrollable */}
                <Modal.Body>
                    <div className="font-readable">
                        {/* Inside the modal body, we display the markdown content stored in refModalContent */}
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{refModalContent?.current}</Markdown>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PostsSkeleton;