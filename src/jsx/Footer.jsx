import * as icons from "./icons.js";
import * as links from "./links.js"


function Footer() {

    return (
        <footer className="container-fluid gx-0">
            <div className="row">
                <div className="col d-flex justify-content-start flex-column align-items-center">
                    <div>
                        <p className="footer-title">Socials</p>
                    </div>
                    <div>
                        <a href={links.link_linkedin} target="_blank"><img className="icon icon-footer" src={icons.icon_linkedin} alt="Linkedin" /></a>
                        <a href={links.link_github} target="_blank"><img className="icon icon-footer" src={icons.icon_github} alt="GitHub" /></a>
                    </div>
                </div>
                <div className="col d-flex justify-content-start flex-column align-items-center">
                    <p className="footer-title">Contact</p>
                    <a href={`mailto:${links.link_contactMail}`}>{links.link_contactMail}</a>
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