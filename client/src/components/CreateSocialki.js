import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPostAction } from "../actions/postActions";

function CreateSocialki({ onSuccess }) {
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

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
            console.log(err);
            setUploading(false);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(createPostAction(description, image, visibility));
    };

    return (
        <form className="form--container w-full" onSubmit={onSubmitHandler}>
            <h2>Create Post</h2>
            <div className="form-item">
                <label htmlFor="image">Image</label>
                <input id="image" onChange={handleImageUpload} type="file" />
                {uploading && <h2>Loading...</h2>}
            </div>
            <div className="form-item">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    type="test"
                />
            </div>
            <div className="form-item">
                <label htmlFor="visibility">Visibility</label>
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
            <button type="submit">Post</button>
        </form>
    );
}

export default CreateSocialki;
