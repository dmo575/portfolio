import { useContext } from "react";

import * as breakpoints from "./../../variables/bsbp.js";
import { GetTitleSize } from "./../../js/toolFuncs.js";

import { appContext } from "./../App.jsx";
import LineRow from "./../LineRow/LineRow.jsx";
import Skill from "./../Skill/Skill.jsx";

import "./Skillset.css";

// given a current breakpoint and a target breakpoint, returns a list of skills in jsx format if the current breakpoint is
// indeed the target one
function GetSkills(actualBreakpoint, targetBreakpoint, skills) {

    if(actualBreakpoint == breakpoints.sm && targetBreakpoint == breakpoints.sm) {
        return (
            <>
            <div className="row d-flex my-4">
                <div className="col d-flex justify-content-end">
                    {
                        skills.map(skill => {
                            return (<Skill key={skill.name} src={skill.src} name={skill.name} size="lg"/>);
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
                    return (<Skill key={skill.name} src={skill.src} name={skill.name} size="lg"/>);
                })
            }
            </>
        );
    }
}

function HoverText(render) {

    if(render) {
        return (
            <div className="col-auto d-flex align-items-end py-0 my-3">
                <p>(Hover/tap icons for names)</p>
            </div>
        );
    }
}

function Skillset({skills}) {

    const { breakpointState } = useContext(appContext);

    return (
        <div id="skills" className="container-fluid">
            <div className="container">

                {/* Title */}
                <div className="row d-flex justify-content-md-between justify-content-center align-items-end my-4">
                    <div className="col-auto d-flex p-0">
                        <p className={`${GetTitleSize(breakpointState)}`}>Preffered tools</p>
                    </div>
                    {HoverText(breakpointState >= breakpoints.lg)}
                </div>

                {/* Core skills */}
                <LineRow title="Core">
                    {GetSkills(breakpointState, breakpoints.md, skills.core)}
                </LineRow>
                {GetSkills(breakpointState, breakpoints.sm, skills.core)}

                {/* Separation */}
                <div className="row m-3"></div>

                {/* Secondary skills */}
                <LineRow title="Used here and there">
                    {GetSkills(breakpointState, breakpoints.md, skills.other)}
                </LineRow>
                {GetSkills(breakpointState, breakpoints.sm, skills.other)}
                <div className="row d-flex justify-content-end">
                    {HoverText(breakpointState <= breakpoints.md)}
                </div>
            </div>
        </div>
    );
}

export default Skillset;