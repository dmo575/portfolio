import * as icons from "./icons.js"

function Skills() {


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col text-center"><p className="h1">Skillset</p></div>
            </div>
            <div className="row row-cols-3">
                <div className="col-auto">
                    Title
                    </div>
                <div className="col">
                    --
                    </div>
                <div className="col-6">
                    imgs
                </div>
            </div>
        </div>
    );

    return (
        <div className="row d-flex justify-content-center flex-column align-items-center row-cols-1">
            <div className="col text-center">
                <p className="h3">Skillset</p>
            </div>
            <div className="col-10">
                <div className="card-group">
                    <div className="card">
                        <div className="card-body p-0">
                            <p className="card-text p-1 m-0">Core</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="col d-flex">
                                <img src={icons.icon_js} alt="javascript" className="img" />
                                <img src={icons.icon_html} alt="html" className="img" />
                                <img src={icons.icon_css} alt="html" className="img" />
                                <img src={icons.icon_react} alt="html" className="img" />
                                <img src={icons.icon_bootstrap} alt="html" className="img" />
                                <img src={icons.icon_linux} alt="html" className="img" />
                                <img src={icons.icon_github} alt="html" className="img" />
                                <img src={icons.icon_git} alt="html" className="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col m-1"></div>
            <div className="col-10">
                <div className="card-group">
                    <div className="card">
                        <div className="card-body p-0">
                            <p className="card-text p-1 m-0">Used here and there</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="col d-flex">
                                <p className="card-text p-1 m-0">One</p>
                                <p className="card-text p-1 m-0">One</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Skills;