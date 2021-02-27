import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPostAction,
    postCommentAction,
    postFetchCommentAction,
} from "../actions/postActions";
import { POST_COMMENT_RESET } from "../actions/types";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Socialki from "../components/Socialki";

function SocialkiPage({ match }) {
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const [uploadError, setUploadError] = useState(undefined);

    const fetchPost = useSelector((state) => state.fetchPost);
    const { error, post, comments } = fetchPost;

    useEffect(() => {
        dispatch({ type: POST_COMMENT_RESET });
        dispatch(fetchPostAction(match.params.id));
        dispatch(postFetchCommentAction(match.params.id));
    }, [dispatch, match.params.id]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/upload",
                formData,
                config
            );
            setImage(data.data);
            setUploading(false);
        } catch (err) {
            setUploadError(err.response.data.errors);
            setUploading(false);
        }
    };

    const postCommentHandler = (e) => {
        e.preventDefault();

        if (!post) return;

        dispatch(postCommentAction(post.id, { description, image }));
        setDescription("");
        setImage("");
    };

    return (
        <div>
            <Header />
            {uploadError &&
                uploadError.map((err) => (
                    <Message text={err.message} type="danger" />
                ))}
            {error &&
                error.map((err) => (
                    <Message text={err.message} type="danger" />
                ))}
            {post && (
                <div className="container">
                    <Socialki socialki={post} />
                    <div className="socialki--comments">
                        <form
                            onSubmit={postCommentHandler}
                            className="socialki--comments-form"
                        >
                            <div className="form-item">
                                <i className="fas fa-comment"></i>
                                <textarea
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                    rows={3}
                                    placeholder="Comment"
                                    type="text"
                                ></textarea>
                            </div>
                            <div className="socialki--comments-form--actions">
                                <div className="socialki--comments-form--image">
                                    <label htmlFor="commentImage">
                                        <i className="fas fa-image"></i>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="commentImage"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <button type="submit">
                                    Post
                                    {uploading && <Loader size="20px" />}
                                </button>
                            </div>
                        </form>

                        {/* TODO: make a comment component or change Socialki to work for comments since its similar*/}
                        {comments && (
                            <div>
                                {comments.map((comment) => (
                                    <Socialki socialki={comment} comment />
                                    // <div key={comment.id}>
                                    //     {comment.description}
                                    // </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SocialkiPage;
