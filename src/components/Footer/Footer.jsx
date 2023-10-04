import { useState, useEffect } from "react";

import "./Footer.css";

const iconsJson = "./JSON/Icons.json";
const contactJson = "./JSON/Contact.json";


function Footer() {

    const [state, setState] = useState(null);

    useEffect(() => {

        const getStateData = async () => {

            const iconsResponse = await(fetch(iconsJson));
            const contactResponse = await(fetch(contactJson));

            if(iconsResponse.status == 200 && contactResponse.status == 200) {

                const iconsData = await(iconsResponse.json());
                const contactData = await(contactResponse.json());

                setState({iconsData, contactData});
                return;
            }

            console.error("Error while retrieving icons and contact info in Footer");
        };

        getStateData();

    }, []);

    return (
        <footer className="container-fluid gx-0">
            <div className="row">
                <div className="col d-flex justify-content-start flex-column align-items-center">
                    <div>
                        <p className="footer-title">Socials</p>
                    </div>
                    <div>
                        <a href={state?.contactData?.linkedin || "https://www.linkedin.com/in/alfredo-rodriguez-23599a228/"} target="_blank"><img className="icon icon-footer" src={state?.iconsData?.linkedin.grayscale || "Linkedin"} alt="Linkedin" /></a>
                        <a href={state?.contactData?.github || "https://github.com/dmo575"} target="_blank"><img className="icon icon-footer" src={state?.iconsData?.github.grayscale || "Github"} alt="GitHub" /></a>
                    </div>
                </div>
                <div className="col d-flex justify-content-start flex-column align-items-center">
                    <p className="footer-title">Contact</p>
                    <a href={`mailto:${state?.contactData?.email || "arco4@protonmail.com"}`}>{state?.contactData?.email || "arco4@protonmail.com"}</a>
                </div>
                <div className="col d-flex justify-content-start flex-column align-items-center">
                    <p className="footer-title">Quick Links</p>
                    <a href="#root">Top</a>
                    <a href="#works">Works</a>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    Thank you for visiting !
                </div>
            </div>
        </footer>
    );
}

export default Footer;