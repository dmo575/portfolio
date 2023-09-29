import * as icons from "./icons.js"
import LineRow from "./LineRow.jsx";

function Skills() {




    return (
        <div id="skills" className="container">
            <div className="row d-flex justify-content-center">
                <div className="col text-center"><p className="h1">Skillset</p></div>
            </div>
            <LineRow title="Core">
                <p className="m-0">B</p>
            </LineRow>
            <LineRow title="Used here and there">
                <p className="m-0">B</p>
            </LineRow>
        </div>
    );
}

export default Skills;