import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import Loader from "./Loader";
import { createPostAction } from "../actions/postActions";
import "../css/CreateSocialki.css";
import CustomSelect from "./CustomSelect";

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

        setDescription("");
        setImage("");
        setVisibility("public");
    };

    return (
        <form className="create-socialki" onSubmit={onSubmitHandler}>
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
                <i className="fas fa-comment"></i>
                <textarea
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={3}
                    placeholder="Description"
                />
            </div>

            <div className="create-socialki--actions">
                <div className="group">
                    <div className="create-socialki--actions-image">
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
                    <div className="create-socialki--actions-visibility">
                        {/* <label htmlFor="visibility"></label> */}
                        {/* <select
                            id="visibility"
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="unlisted">Unlisted</option>
                        </select> */}

                        <CustomSelect
                            onChangeSelected={(value) => setVisibility(value)}
                            options={[
                                {
                                    value: "public",
                                    text: "Public",
                                    icon: "fas fa-eye",
                                },
                                {
                                    value: "private",
                                    text: "Private",
                                    icon: "fas fa-eye-slash",
                                },
                                {
                                    value: "unlisted",
                                    text: "Unlisted",
                                    icon: "fas fa-low-vision",
                                },
                            ]}
                        />
                    </div>
                </div>
                <button type="submit">
                    Post
                    {uploading && <Loader size="20px" />}
                </button>
            </div>
            {/* <button type="submit">
                Post{loading && <Loader size="20px" color="white" />}
            </button> */}
        </form>
    );
}

export default CreateSocialki;
