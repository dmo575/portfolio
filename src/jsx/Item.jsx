import { useEffect, useState } from "react";


function UpdateSrcImg() {

    const srcImg = window.innerWidth >= 992 ? "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk" : "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4";
    const breakpoint = window.innerWidth >= 992 ? 1 : -1;

    return {breakpoint: breakpoint, srcImg: srcImg};
}


function Item() {

    const [imgData, setSrcImg] = useState(UpdateSrcImg());

    useEffect(() => {

        function handleResize() {

            if(window.innerWidth >= 992 && imgData.breakpoint < 0 || window.innerWidth < 992 && imgData.breakpoint > 0) {

                    setSrcImg(UpdateSrcImg());
                }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);


    return (
        <div className="container-fluid gx-0">
            <div className="row">
                <div className="col">
                    <div className="card flex-lg-row">
                        <img className="card-img-left" src={imgData.srcImg}/>
                        <div className="card-body d-flex flex-column">
                            <h1 className="card-title">Project Title</h1>
                            <p className="card-text flex-grow-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, culpa. Enim, cupiditate ducimus sequi nihil recusandae aliquid eligendi tenetur reprehenderit labore temporibus fugiat. Aspernatur rem repudiandae esse id dignissimos minus quas, possimus architecto ratione, eaque saepe sit recusandae quibusdam obcaecati minima placeat officiis aliquam! Asperiores reiciendis harum suscipit vero officia laborum, soluta beatae? Officia molestiae aliquam rerum, sapiente odit hic incidunt inventore ad enim quasi fuga minima earum asperiores sit porro, possimus debitis unde similique dicta ducimus animi. Commodi neque sit ex aliquam dignissimos officia! Animi quae corporis enim eius consequuntur, quia laudantium perferendis corrupti possimus praesentium deleniti id maxime!</p>
                            <div className="card-text d-flex justify-content-between">
                                <div className="d-flex flex-grow-1 justify-content-start">
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-outline.svg"/>
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                    <img src="https://api.iconify.design/basil:adobe-photoshop-solid.svg"/>
                                </div>                                
                                <a className="btn btn-primary">Links + Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;