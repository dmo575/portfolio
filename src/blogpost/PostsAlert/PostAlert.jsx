import { useState, useEffect } from "react";

import { postAlertJson } from "../../js/paths";

import { Alert } from "react-bootstrap";

// returns an alert. Is used to inform the blog-post visitor about what the post-blog is.
function PostAlert() {

    const [state, setState] = useState(null);

    useEffect(() => {

        const getData = async () => {

            const response = await fetch(postAlertJson);

            if(response.status == 200) {

                const data = await response.json();

                setState(data);
            }
        };

        getData();

    }, []);

    return(
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                    <Alert variant="success">{state?.message}</Alert>
                </div>
            </div>
        </div>
    );
}

export default PostAlert;