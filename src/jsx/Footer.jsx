import * as icons from "./icons.js";


function Footer() {

    return (
        <footer className="container-fluid gx-0">
            <div className="row">
                <div className="col d-flex justify-content-center flex-column align-items-center">
                    <div>
                        <p className="footer-title">Socials</p>
                    </div>
                    <div className="footer-column-socials">
                        <a href="http://google.com" target="_blank"><img className="icon icon-footer" src={icons.icon_linkedin} alt="Linkedin" /></a>
                        <a href="http://github.com" target="_blank"><img className="icon icon-footer" src={icons.icon_github} alt="GitHub" /></a>
                    </div>
                </div>
                <div className="col d-flex justify-content-center flex-column align-items-center">
                    <p className="footer-title">Contact</p>
                    <a href="mailto:arco4@protonmail.com">Send Email</a>
                </div>
                <div className="col d-flex justify-content-center flex-column align-items-center">
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