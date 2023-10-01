import { useContext } from "react";

import * as breakpoints from "./../../variables/bsbp.js";
import { profileLg, profileSm } from "./../../variables/content.js";
import { GetTitleSize } from "./../../js/toolFuncs.js";

import { appContext } from "./../App.jsx";

import "./ProfileSection.css";

function ProfileSection() {

    const {breakpointState} = useContext(appContext);

    return (
        <div id="profile-section" className="container-fluid">
            <div className="row d-flex flex-column flex-md-row align-items-center">
                <div className={"col-7 col-md-auto col-5 gx-0 offset-md-1 offset-xl-2 d-flex justify-content-center flex-column"}>
                    <img className="img-fluid" src={breakpointState >= breakpoints.md ? profileLg : profileSm} alt="profile-img" />
                </div>
                <div className="col-md col-10 offset-md-1 gx-0 gy-5 gy-md-0 text-center text-md-start">
                    <p className={GetTitleSize(breakpointState)}>Hi there 👋</p>
                    <p>I'm Alfredo, a Front-end Junior web developer who loves bringing websites to live with the help of React, Bootstrap and the big three (JS/HTML/CSS).</p>
                    <p>I also enjoy learning about Back-end and anything tech really (Linux, game engines, you name it!)</p>
                    <p>If you like my portfolio, please let me know at arco4@protonmail.com !</p>
                </div>
                <div className="col-1 col-xl-2"></div>
            </div>
        </div>
    );
}

export default ProfileSection;