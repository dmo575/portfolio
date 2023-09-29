import * as icons from "./icons.js"
import LineRow from "./LineRow.jsx";
import ColorIcon from "./ColorIcon.jsx";

const data = {
    core: [
        {icon : icons.icon_js, color : "rgb(206, 158, 103)"},
        {icon : icons.icon_html, color : "rgb(103, 113, 206)"},
        {icon : icons.icon_css, color : "rgb(151, 103, 206)"},
        {icon : icons.icon_git, color : "rgb(161, 206, 103)"},
        {icon : icons.icon_github, color : "rgb(103, 206, 197)"}
    ]
}

function Skills() {




    return (
        <div id="skills" className="container-fluid">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col text-center"><p className="h1">Skillset</p></div>
                </div>
                <LineRow title="Core"/>
                <div className="row d-flex justify-content-center justify-content-md-end">
                    <div className="col-9 col-md-5 d-flex flex-wrap">
                        <ColorIcon src={data.core[0].icon} color={data.core[0].color}/>
                        <ColorIcon src={data.core[1].icon} color={data.core[1].color}/>
                        <ColorIcon src={data.core[2].icon} color={data.core[2].color}/>
                        <ColorIcon src={data.core[3].icon} color={data.core[3].color}/>
                        <ColorIcon src={data.core[4].icon} color={data.core[4].color}/>
                    </div>
                </div>
                <div className="row m-5"></div>
                <LineRow title="Used here and there"/>
                <div className="row d-flex justify-content-center justify-content-md-end">
                    <div className="col-9 col-md5 d-flex flex-wrap">
                        <ColorIcon src={data.core[4].icon} color={data.core[4].color}/>
                        <ColorIcon src={data.core[2].icon} color={data.core[2].color}/>
                        <ColorIcon src={data.core[1].icon} color={data.core[1].color}/>
                        <ColorIcon src={data.core[3].icon} color={data.core[3].color}/>
                        <ColorIcon src={data.core[0].icon} color={data.core[0].color}/>
                        <ColorIcon src={data.core[4].icon} color={data.core[4].color}/>
                        <ColorIcon src={data.core[2].icon} color={data.core[2].color}/>
                        <ColorIcon src={data.core[1].icon} color={data.core[1].color}/>
                        <ColorIcon src={data.core[3].icon} color={data.core[3].color}/>
                        <ColorIcon src={data.core[0].icon} color={data.core[0].color}/>
                        <ColorIcon src={data.core[4].icon} color={data.core[4].color}/>
                        <ColorIcon src={data.core[2].icon} color={data.core[2].color}/>
                        <ColorIcon src={data.core[1].icon} color={data.core[1].color}/>
                        <ColorIcon src={data.core[3].icon} color={data.core[3].color}/>
                        <ColorIcon src={data.core[0].icon} color={data.core[0].color}/>
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