function Item() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="card flex-lg-row">
                        <img className="card-img-left" src="https://fastly.picsum.photos/id/868/300/300.jpg?hmac=FRXOODu7hXi9LJcWd_pVbtr7X8cRbO4mwPNLW8F3ZaY"/>
                        <div className="card-body d-flex flex-column">
                            <h1 className="card-title">Project Title</h1>
                            <p className="card-text flex-grow-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, culpa. Enim, cupiditate ducimus sequi nihil recusandae aliquid eligendi tenetur reprehenderit labore temporibus fugiat. Aspernatur rem repudiandae esse id dignissimos minus quas, possimus architecto ratione, eaque saepe sit recusandae quibusdam obcaecati minima placeat officiis aliquam! Asperiores reiciendis harum suscipit vero officia laborum, soluta beatae? Officia molestiae aliquam rerum, sapiente odit hic incidunt inventore ad enim quasi fuga minima earum asperiores sit porro, possimus debitis unde similique dicta ducimus animi. Commodi neque sit ex aliquam dignissimos officia! Animi quae corporis enim eius consequuntur, quia laudantium perferendis corrupti possimus praesentium deleniti id maxime!</p>
                            <div className="card-footer d-flex justify-content-between">
                                <div>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-outline.svg"/>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                </div>
                                
                                <div className="btn-group">
                                    <a className="btn btn-primary">Live</a>
                                    <a className="btn btn-primary">GitHub</a>
                                    <a className="btn btn-primary">About</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;