import PostsSkeleton from "./PostsSkeleton/PostsSkeleton.jsx";
import PostAlert from "./PostsAlert/PostAlert.jsx";

function PostsApp() {


    return(
        <div>
            <div className="container my-4">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h1>blog-post.</h1>
                    </div>
                </div>
            </div>
            <PostAlert/>
            <PostsSkeleton/>
        </div>
    );
}

export default PostsApp;