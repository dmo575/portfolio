import { useEffect, useState, useRef } from "react";
import { ListGroup, Modal } from "react-bootstrap";

import { postsJson } from "../../js/paths";
import * as breakpoints from "./../../js/bsbp.js";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../../markdownComponents.jsx";// custom components for Markdown

import "./../Card/Card.css";

function PostsSkeleton() {

    const [state, setState] = useState(null);
    const [modal, setModal] = useState(false);
    const refModalContent = useRef(null);

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

    // returns a ListGroup for a given post
    function loadPost(title, index) {

        return(
            <li>
                <ListGroup.Item key={`post-${title}`} className="rounded-2 my-1" variant="secondary" data-index={index} action onClick={openModal}>
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
                                return loadPost(el.title, index);
                            })
                        }
                        </ul>
                    </ListGroup>
                </div>
            </div>
            <Modal show={modal} fullscreen="sm-down" dialogClassName={window.outerWidth > breakpoints.sm && `modal-custom`} scrollable={true} centered={true} onHide={closeModal}>
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