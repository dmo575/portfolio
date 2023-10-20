import { useContext } from "react";
import { appContext } from "../App";

import "./Footer.css";

// wepage's footer
function Footer() {

    const {icons, contact} = useContext(appContext);

    return (
        <div className="container-fluid px-0">
            <footer>
                <div className="row">
                    <div className="col px-0 d-flex justify-content-start flex-column align-items-center">
                        <div>
                            <p className="footer-title">Socials</p>
                        </div>
                        <div>
                            <a href={contact?.linkedin || "https://www.linkedin.com/in/alfredo-rodriguez-23599a228/"} target="_blank"><img className="icon icon-footer" src={icons?.linkedin.grayscale || "Linkedin"} alt="Linkedin" /></a>
                            <a href={contact?.github || "https://github.com/dmo575"} target="_blank"><img className="icon icon-footer" src={icons?.github.grayscale || "Github"} alt="GitHub" /></a>
                        </div>
                    </div>
                    <div className="col px-0 d-flex justify-content-start flex-column align-items-center">
                        <p className="footer-title">Contact</p>
                        <a href={`mailto:${contact?.email || "arco4@protonmail.com"}`}>{contact?.email || "arco4@protonmail.com"}</a>
                    </div>
                    <div className="col px-0 d-flex justify-content-start flex-column align-items-center">
                        <p className="footer-title">Quick Links</p>
                        <a href="#html">Top</a>
                        <a href="#works">Works</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col px-0 d-flex justify-content-center">
                        Thank you for visiting !
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;