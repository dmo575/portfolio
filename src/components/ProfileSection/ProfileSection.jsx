import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file

import * as breakpoints from "./../../variables/bsbp.js";
import { GetTitleSize } from "./../../js/toolFuncs.js";
import { profileSectionJson } from "../../js/paths.js";
import components from "../../js/markdownComponents.jsx";

import { appContext } from "./../App.jsx";

import "./ProfileSection.css";

function ProfileSection() {

    const [state, setState] = useState(null);
    const {breakpointState, Error} = useContext(appContext);
    const [modalState, setModalState] = useState(false);


    function showModal(e) {
        setModalState(true);
    }

    function closeModal() {
        setModalState(false);
    }

    useEffect(() => {

        const getProfileData = async () => {

            const response = await(fetch(profileSectionJson));

            if(response.status != 200) {

                Error("profile");
                return;
            }

            const data = await(response.json());
            
            const bodyContentRespose = await(fetch(data.bodyMarkdown));
            
            if(bodyContentRespose.status != 200) {
                Error("body markdown content");
                return;
            }
            
            const bodyContentData = await (bodyContentRespose.text());
            
            data.bodyMarkdown = bodyContentData;
            
            setState(data);
        };

        getProfileData();

    }, []);


    return (
        <div id="profile-section" className="container-fluid">
            <div className="row d-flex flex-column flex-md-row align-items-center">
                <div className={"col-7 col-md-auto col-5 gx-0 offset-md-1 offset-xl-2 d-flex justify-content-center flex-column"}>
                    <img className="img-fluid" src={breakpointState >= breakpoints.md ? state?.srcL : state?.srcS} alt="profile-img" />
                </div>
                <div className="col-md col-10 offset-md-1 gx-0 gy-5 gy-md-0 text-center text-md-start">
                    <p className={GetTitleSize(breakpointState)}>{state?.header}</p>
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{state?.bodyMarkdown}</Markdown>
                </div>
                <div className="col-1 col-xl-2"></div>
                <div className="row">
                    <div className="col-auto offset-8">
                        <Button variant="link" onClick={showModal}><p>How I got into web development &#8674;</p></Button>
                    </div>
                </div>
            </div>
            <Modal show={modalState} centered={true} onHide={closeModal}>
                <Modal.Header>
                    Modal Header
                </Modal.Header>
                <Modal.Body>
                    Modal body
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProfileSection;