import { useContext, useState, useEffect } from "react";

import * as breakpoints from "./../../js/bsbp.js";
import { GetTitleSize } from "../../js/general.js";
import { skillsetJson } from "../../js/paths.js";

import { appContext } from "./../App.jsx";
import LineRow from "./../LineRow/LineRow.jsx";
import Skill from "./../Skill/Skill.jsx";

import "./Skillset.css";


// conditionally returns a text parragraph
function HoverText(render, text) {

    if(render) {
        return (
            <div className="col-auto d-flex align-items-end py-0 my-3">
                <p>{text}</p>
            </div>
        );
    }
}

function Skillset() {

    const { breakpointState, icons, Error } = useContext(appContext);

    // state for a list of skills to display
    const [state, setState] = useState(null);

    useEffect(() =>{

        // get the state data
        const getData = async () => {

            const response = await(fetch(skillsetJson));

            if(response.status != 200) {
                Error("Skills");
                return;
            }
            
            const data = await(response.json());

            setState(data);
        };

        getData();

    }, []);

    // For each skill, get its icon
    function getSkills(stateArray) {

        return (state && icons) ? (
            state[stateArray].map( el => {
                return (<Skill key={icons[el].name} src={icons[el].color} name={icons[el].name} size="lg"/>);
                //return (<Test key={icons[el].name} logo={icons[el].color} name={icons[el].name} size={2} />)
                //return (<Skill key={icons[el].name} src={icons[el].color} name={icons[el].name} size={2}/>);
            })
        ) : null
    };

    return (
        <div id="skills" className="container-fluid">
            <div className="container">

                <div className="row d-flex justify-content-md-between justify-content-center align-items-end my-4">
                    <div className="col-auto d-flex p-0">
                        <p className={`${GetTitleSize(breakpointState)}`}>{state?.title || ""}</p>
                    </div>
                    {HoverText(breakpointState >= breakpoints.lg, state?.comment || "")}
                </div>

                {/* This will render on larger screens */}
                {
                    breakpointState >= breakpoints.md ? 
                    (
                        <>
                        <LineRow title={state?.primaryToolsTitle || ""}>
                        { getSkills("primarySkills")}
                        </LineRow>

                        <div className="row m-3"></div>

                        <LineRow title={state?.secondaryToolsTitle || ""}>
                        {getSkills("secondarySkills")}
                        </LineRow>
                        </>
                    ) : 
                    (
                        <>
                        <LineRow title={state?.primaryToolsTitle || ""}/>
                        <div className="row d-flex my-4">
                            <div className="col d-flex justify-content-end">
                            {getSkills("primarySkills")}
                            </div>
                        </div>

                        <div className="row m-3"></div>

                        <LineRow title={state?.secondaryToolsTitle || ""}/>
                        <div className="row d-flex my-4">
                            <div className="col d-flex justify-content-end">
                            {getSkills("secondarySkills")}
                            </div>
                        </div>
                        </>
                    )
                }
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        {HoverText(breakpointState <= breakpoints.md, state?.comment || "")}
                    </div>
                </div>
                {/* This will render on smaller screens */}
            </div>
        </div>
    );
}

export default Skillset;