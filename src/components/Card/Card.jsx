import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../../js/markdownComponents.jsx";// custom components for Markdown

import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";
import Skill from "./../Skill/Skill.jsx";

import "./Card.css";

/**Notes on the card:
 * On large breakpoints:
 * minimun height is decided by the "container for IMAGE" with its col-3 class.
 *      else, it will be decided by the card's contents
 * 
 * On the medium and below breakpoints:
 * minimun height is decided by
 */

function Card({card, imgOrder}) {

    const imgContId = `${card.title.replace(/\s+/g, '')}-img-cont`;

    const { breakpointState, icons, Error } = useContext(appContext);
    // controls the react-bootstrap modal
    const [modal, setModal] = useState(false);
    // will store the content of the card (the .md file)
    const [cardContent, setCardContent] = useState("Loading content. . .");

    // open/close the react-bootstrap modal
    function openModal() {

        setModal(true);
        loadMarkdown();
    };

    function closeModal() {
        setModal(false);
    };


    // return a button based on the skipTo property.
    // if a card object has a skipTo, it means that instead of opening a modal, this card wants to open a link
    // to somewhere and that links value is skipTo.
    function GetButton() {

        const classes = `btn rounded-5 ${breakpointState < breakpoints.lg && "flex-grow-1"}`;

        if(!card.skipTo) {
            return (
                <Button className={`btn-dark ${classes}`} onClick={openModal}>Check it out</Button>
            );
        }

        return (
            <a className={`btn-success ${classes}`} href={card.skipTo} target="_blank">See it live</a>
        );
    };

    useEffect(() => {

        // resizes and centers the card's image
        function ResizeImage() {

            const imgCont = document.querySelector(`#${imgContId}`);
            //html collection, meaning live array, but we just need a screenshot of their values
            const siblingChildren = imgCont.nextSibling.children;
            const img = imgCont.firstChild;

            
            // step 1: resize the image container

            // for large breakpoints:
            if(window.innerWidth >= breakpoints.lg) {

                // stores the image container's sibling height into the currHeight.
                // (the reason we get the value via its children and padding is because its current height is influenced by the image container
                // and we want to get what its real height would be had the image container not been an influence on it)
                let siblingHeight = 0.0;
                for(let i = 0; i < siblingChildren.length; i++) {

                    siblingHeight += siblingChildren[i].offsetHeight;

                }

                const paddingComputed = window.getComputedStyle(imgCont.nextSibling).paddingTop;
                const paddingTotal = parseInt(paddingComputed.substring(0, paddingComputed.length - 2)) * 2;// -2 to remove 'px' from str, *2 to get padding at the bot and top
                siblingHeight += paddingTotal;

                // we set the containter's minimun height to be its current width
                imgCont.style.minHeight = `${imgCont.offsetWidth}px`;
                // we set the max height to be 100%, which means as large as the image it contains ( we need to set this because
                // if we come from a lower breakpoint, this property will be set already, so we reset it here)
                imgCont.style.maxHeight = `100%`;
                // we set its current height to be its sibling's height we calculated earlier
                imgCont.style.height = `${siblingHeight}px`;

                // This means that for LG+ breakpoints the container will always have the same relative width set by the parent (col-3 inside
                // a card element), but its hegiht will increase based on the height of the card itself.
                // also its height will never be less than its width which is the same for all cards, this allows us to have a minimun
                // common height for all cards
            }
            // for medium and below breakpoints:
            else {

                const widthComputed = window.getComputedStyle(imgCont).width;
                const width = parseInt(widthComputed.substring(0, widthComputed.length - 2));

                // we set the container's min height to 0 because if we come from a LG breakpoint this will have a value setted up
                // that we need to reset
                imgCont.style.minHeight = "0";
                // we set its current height to be 2/3 of its width
                imgCont.style.height = `${width / 2}px`;
                // we also need to reset the max height comming from a LG breakpoint, so we set it to the value we have planned, 2/3
                imgCont.style.maxHeight = `${width / 2}px`;
            }

            // step 2: define the image's behavior inside the container

            // with the image object-fit prop set to cover, we just need to make sure to use images with spare width.


            // we want the images to be horizontally centered at all times, we know that the image's height
            // fits with the container already
            const offsetX = ((-img.offsetWidth / 2) + imgCont.offsetWidth / 2)
            img.style.transform = `translate(${offsetX}px, ${0})`;
        };

        // initial resizing of the card's image container and positioning of the image inside its container
        ResizeImage();

        window.addEventListener("resize", ResizeImage);

        return () => {
            window.removeEventListener("resize", ResizeImage);
        }
    }, []);


    // attempts to load the card's content markdown file
    async function loadMarkdown() {
        
        const response = await (fetch(card.content));

        if(response.status != 200) {
            
            Error("Card content");
            return;            
        }

        const data = await (response.text());

        setCardContent(data);
    };

    return (
        <>
        <div className="card flex-lg-row h-100 fade-in-actor" style={{overflow: "hidden"}}>{/* MAIN CONTAINER, card */}
            <div id={imgContId} className={`col-lg-3 card-img-cont d-flex ${ breakpointState >= breakpoints.lg && `order-${imgOrder}`}`}>{/* container for IMAGE */}
                <img src={breakpointState >= breakpoints.lg ? card.srcL : card.srcS} className="card-img"></img>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">

                <div className="row">{/* container of TITLE and DESCRIPTION*/}
                    <div className="card-title">{/* TITLE */}
                        <h1 className="card-title">{card.title}</h1>
                    </div>
                    <div className="card-text">{/* DESCRIPTION */}
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{card.description}</Markdown>
                    </div>
                </div>

                <div className="row">{/* container of TOOLS and BUTTON */}
                    <div className="col my-3 d-flex justify-content-around justify-content-lg-start ">{/* TOOLS */}
                        {card.tech.map(el => {
                            //if(Object.keys(icons).length == 0) {return}
                            if(!icons) return;

                            return (
                                <Skill key={card.title + el} src={icons[el].color} name={icons[el].name} size={breakpointState == breakpoints.lg ? "lg" : "sm"}/>
                                //<Skill key={card.title + el} src={icons[el].color} name={icons[el].name} size={breakpointState == breakpoints.lg ? 2 : 1.7}/>
                            );
                        })}
                    </div>
                    <div className="col-lg-auto d-flex my-3 my-lg-0">{/* BUTTON */}
                        {GetButton()}
                    </div>
                </div>

            </div>
        </div>

        <Modal show={modal} fullscreen="sm-down" dialogClassName={breakpointState > breakpoints.sm && `modal-custom`} scrollable={true} centered={true} onHide={closeModal}>
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