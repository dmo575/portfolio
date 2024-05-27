import { useState, createContext, useEffect, useRef } from "react";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../markdownComponents.jsx";// custom components for Markdown

import PostFooter from "./PostFooter/PostFooter.jsx";
import { iconsJson, contactJson } from "./../js/paths.js";

export const postViewerContext = createContext();


// defines the structure of the blog-post
function PostViewerApp() {

    const [markdown, setMarkdown] = useState(null);
    const [icons, setIcons] = useState(null);
    const [contact, setContact] = useState(null);


    useEffect(() => {


        // load markdown and set it to state "markdown"
        const loadPostData = async () => {

            let query = window.location.search;
            let params = new URLSearchParams(query);
            let postId = params.get("postId");

            const response = await fetch("./../markdown/posts/" +  postId + ".md");

            if(response.status == 200) {

                const data = await response.text();

                setMarkdown(data);
            }
        };

        async function InitialFetches() {

            const iconsResponse = await fetch("../" + iconsJson);
            const contactResponse = await fetch("../" + contactJson);
    
            if(iconsResponse.status != 200 || contactResponse.status != 200) {
                console.warn("Error while fetching page icons");
                return;
            }
    
            const iconsData = await iconsResponse.json();
            const contacData = await contactResponse.json();
    
            setContact(contacData);
            setIcons(iconsData);
        }

        loadPostData();
        InitialFetches();

    }, []);


    return(
        <div style={{ maxWidth: '100%' }}>
            <div className="d-flex justify-content-around">
                <div className="col-auto my-5">
                    <a href={"./../blogpost/blogpost.html"} className={`d-flex btn rounded-5 btn-warning`}>Back to blog-post.</a>
                </div>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <div className="font-readable">
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{markdown}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '5rem' }}></div>
            <postViewerContext.Provider value={{icons, contact}}>
                <PostFooter/>
            </postViewerContext.Provider>
        </div>
    );
}

export default PostViewerApp;