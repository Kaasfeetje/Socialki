import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import Loader from "./Loader";
import { createPostAction } from "../actions/postActions";

function CreateSocialki({ onSuccess }) {
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const [uploadError, setUploadError] = useState(undefined);

    const dispatch = useDispatch();

    const postCreate = useSelector((state) => state.postCreate);
    const { loading, error, success } = postCreate;

    useEffect(() => {
        if (success) {
            onSuccess();
        }
    }, [success, onSuccess]);

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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(createPostAction(description, image, visibility));
    };

    return (
        <form className="form--container w-full" onSubmit={onSubmitHandler}>
            {error &&
                error.map((error) => (
                    <Message
                        key={error.message}
                        type="danger"
                        text={error.message}
                    />
                ))}

            {uploadError &&
                uploadError.map((error) => (
                    <Message
                        text={error.message}
                        key={error.message}
                        type="danger"
                    />
                ))}
            <h2>Create Post</h2>
            <div className="form-item">
                <i className="fas fa-image"></i>
                <input
                    id="image"
                    onChange={handleImageUpload}
                    type="file"
                    accept="images/*"
                />
                {uploading && <Loader size="1rem" color="black" />}
            </div>
            <div className="form-item">
                <i className="fas fa-comment"></i>
                <textarea
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={3}
                    placeholder="Description"
                />
            </div>
            <div className="form-item">
                <i className="fas fa-eye-slash"></i>
                <select
                    id="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                </select>
            </div>
            <button type="submit">
                Post{loading && <Loader size="20px" color="white" />}
            </button>
        </form>
    );
}

export default CreateSocialki;
