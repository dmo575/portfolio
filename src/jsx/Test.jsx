function Test() {

    return(
        <>
        <div className="container">
        <button className="btn" data-bs-toggle="modal" data-bs-target="#modaltest">Press</button>
            <div id="modaltest" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        Content
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Test;