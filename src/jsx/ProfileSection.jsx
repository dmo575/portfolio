import { useState, useEffect, useContext } from "react";
import * as breakpoints from "./bsbp.js";
import * as imgs from "./images.js";
import { GetTitleSize } from "./toolFuncs.js";
import { appContext } from "./App.jsx";

function ProfileSection() {

    const {breakpointState} = useContext(appContext);

    return (
        <div id="profile-section" className="container-fluid">
            <div className="row d-flex flex-column flex-md-row align-items-center">
                <div className={"col-7 col-md-auto col-5 gx-0 offset-md-1 offset-xl-2 d-flex justify-content-center flex-column"}>
                    <img className="img-fluid" src={breakpointState >= breakpoints.md ? imgs.img_phProfHorizontal : imgs.img_phHorizontal} alt="profile-img" />
                </div>
                <div className="col-md col-10 offset-md-1 gx-0 gy-5 gy-md-0 text-center text-md-start">
                    <p className={GetTitleSize(breakpointState)}>Welcome</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, repellat voluptates. Et, beatae nulla. Aliquam adipisci voluptate quis mollitia cumque soluta pariatur. Iusto eos magnam ratione quia cum, asperiores deserunt enim commodi, id perferendis reprehenderit labore nisi fugiat animi ullam modi ipsam ut, atque eum molestiae sequi voluptates veritatis! Voluptates modi rerum nobis officia optio eum quae porro excepturi cumque?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, repellat voluptates. Et, beatae nulla. Aliquam adipisci voluptate quis mollitia cumque soluta pariatur. Iusto eos magnam ratione quia cum, asperiores deserunt enim commodi, id perferendis reprehenderit labore nisi fugiat animi ullam modi ipsam ut, atque eum molestiae sequi voluptates veritatis! Voluptates modi rerum nobis officia optio eum quae porro excepturi cumque?</p>

                </div>
                <div className="col-1 col-xl-2"></div>
            </div>
        </div>
    );
}

export default ProfileSection;