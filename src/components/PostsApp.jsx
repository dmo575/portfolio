import PostsSkeleton from "./PostsSkeleton/PostsSkeleton";
import PostAlert from "./PostAlert/PostAlert";

function PostsApp() {


    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h1>Blog-post.</h1>
                    </div>
                </div>
            </div>
            <PostAlert/>
            <PostsSkeleton/>
        </div>
    );
}

export default PostsApp;