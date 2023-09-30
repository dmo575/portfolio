import * as logos from "./logos.js"
import * as breakpoints from "./bsbp.js";
import LineRow from "./LineRow.jsx";
import ColorIcon from "./ColorIcon.jsx";
import { useContext } from "react";
import { appContext } from "./App.jsx";
import { GetTitleSize } from "./toolFuncs.js";
import Skill from "./Skill.jsx";

// DEBUG
const sk = {
    core: [
        {name: "JavaScript", src: logos.logo_js},
        {name: "HTML 5", src: logos.logo_html},
        {name: "CSS 3", src: logos.logo_css},
        {name: "React", src: logos.logo_react},
        {name: "Bootstrap", src: logos.logo_bootstrap},
        /*...*/
    ],

    other: [
        {name: "Python", src: logos.logo_python},
        {name: "Flask", src: logos.logo_flask},
        /*...*/
    ]
}

function GetSkills(actualBreakpoint, targetBreakpoint, skills) {

    //if(actualBreakpoint != targetBreakpoint) { return (<></>); }

    if(actualBreakpoint == breakpoints.sm && targetBreakpoint == breakpoints.sm) {
        return (
            <>
            <div className="row d-flex justify-content-center justify-content-md-end">
                <div className="col-9 col-md5 d-flex flex-wrap">
                    {
                        skills.map(skill => {
                            return (<Skill src={skill.src} name={skill.name}/>);
                        })
                    }
                </div>
            </div>
            </>
        );

    }
    else if(actualBreakpoint >= breakpoints.md && targetBreakpoint >= breakpoints.md) {

        return (
            <>
            {
                skills.map(skill => {
                    return (<Skill src={skill.src} name={skill.name}/>);
                })
            }
            </>
        );
    }
    
}

function Skillset({skills}) {


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
                    {GetSkills(breakpointState, breakpoints.md, sk.core)}
                </LineRow>
                {GetSkills(breakpointState, breakpoints.sm, sk.core)}

                <div className="row m-3"></div>

                <LineRow title="Used here and there">
                    {GetSkills(breakpointState, breakpoints.md, sk.other)}
                </LineRow>
                {GetSkills(breakpointState, breakpoints.sm, sk.other)}

            </div>
        </div>
    );
}

export default Skillset;