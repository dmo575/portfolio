import "./LineRow.css";

// A horizontal dotted line that takes up all the horizontal space, with the ooption of rendering some children at the right
// end of the line.
function LineRow({title, children}) {

    return (
        <div className="row row-cols-5">
            <div className="col-auto d-flex align-items-center">
                <p className="h3">{title}</p>
            </div>
            <div className="col d-flex flex-fill align-items-center">
                <div className="spacer-rect flex-grow-1"/>
                <div className="col d-flex align-items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LineRow;