import * as logos from "./logos.js"
import * as breakpoints from "./bsbp.js";
import LineRow from "./LineRow.jsx";
import ColorIcon from "./ColorIcon.jsx";
import { useContext } from "react";
import { appContext } from "./App.jsx";
import { GetTitleSize } from "./toolFuncs.js";

const data = {
    core: [
        {icon : logos.logo_js, color : "rgb(206, 158, 103)", name: "JavaScript"},
        {icon : logos.logo_html, color : "rgb(103, 113, 206)", name: "HTML 5"},
        {icon : logos.logo_css, color : "rgb(151, 103, 206)", name: "CSS 3"},
        {icon : logos.logo_git, color : "rgb(161, 206, 103)", name: "Git"},
        {icon : logos.logo_github, color : "rgb(103, 206, 197)", name: "GitHub"}
    ]
}

// in rem
const logoSizeLg = 2;
const logoSizeMd = 3;
const logoSizeSm = 2;

function GetLogoSize(currBreakpoint) {

    switch (currBreakpoint) {
        case breakpoints.sm:
            return logoSizeSm;
        case breakpoints.md:
            return logoSizeMd;
        default:
            return logoSizeLg;
    }
}


function Skills() {


    const { breakpointState } = useContext(appContext);

    return (
        <div id="skills" className="container-fluid">
            <div className="container">


                <div className="row d-flex justify-content-between">
                    <div className="col-auto d-flex align-items-end">
                        <p className={`m-0 ${GetTitleSize(breakpointState)}`} style={{lineHeight: `calc(font-size / 2)`}}>Skillset</p>
                    </div>
                    <div className="col-auto d-flex align-items-end p-0" style={{lineHeight: `calc(font-size / 2)`}}>
                        <p className="m-0">(Hover icons for names)</p>
                    </div>
                </div>


                <LineRow title="Core">
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}>
                        <img className="logo" style={ {
                                width: `${GetLogoSize(breakpointState)}rem`, 
                                top: `${GetLogoSize(breakpointState) * -0.5}rem`,
                                "--size": `${GetLogoSize(breakpointState)}rem`
                            }} src={logos.logo_js} alt="" />
                        <div className="logo-description-container" style={{"--parent-size": `${GetLogoSize()}rem`}}>
                            <p className="logo-description-text">sdsssssssssssssssssdsdsd</p>
                        </div>
                    </div>

                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_html} alt="" /></div>
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_css} alt="" /></div>
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_react} alt="" /></div>
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_bootstrap} alt="" /></div>
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_git} alt="" /></div>
                    <div className="logo-container mx-2" style={{width: `${GetLogoSize(breakpointState)}rem`}}><img className="logo" style={{width: `${GetLogoSize(breakpointState)}rem`}} src={logos.logo_github} alt="" /></div>
                </LineRow>


                <div className="row m-3"></div>


                <LineRow title="Used here and there">
                    <div className="logo-container">
                        <img className="logo mx-2" style={{width: GetLogoSize(breakpointState)}} src={logos.logo_python} alt=""/>
                        <div className="logo-description">Python</div>
                    </div>
                    <img className="logo mx-2" style={{width: GetLogoSize(breakpointState)}} src={logos.logo_flask} alt="" />
                    <img className="logo mx-2" style={{width: GetLogoSize(breakpointState)}} src={logos.logo_sqlite} alt="" />
                    <img className="logo mx-2" style={{width: GetLogoSize(breakpointState)}} src={logos.logo_vitejs} alt="" />
                    <img className="logo mx-2" style={{width: GetLogoSize(breakpointState)}} src={logos.logo_webflow} alt="" />
                </LineRow>
                <div className="row d-flex justify-content-center justify-content-md-end">
                    <div className="col-9 col-md5 d-flex flex-wrap">

                    </div>
                </div>
            </div>
        </div>
    );


/*
                    <div className="icon-container">
                        <img src={icons.icon_js} alt="icon_img" className="img icon"/>
                        <div className="img-overlay"></div>
                    </div>
*/}

export default Skills;