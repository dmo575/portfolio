import Item from "./Item.jsx";

function Skeleton() {

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col-md-12">
                    <Item/>
                    <Item/>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default Skeleton;