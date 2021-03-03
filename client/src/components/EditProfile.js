import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import { updateProfileAction } from "../actions/userActions";
import Loader from "./Loader";

function EditProfile({ onSuccess }) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [uploadError, setUploadError] = useState(undefined);

    const user = useSelector((state) => state.user);
    const { updateLoading, updateSuccess, updateError, userInfo } = user;

    useEffect(() => {
        if (!userInfo) return;

        setUsername(userInfo.username || "");
        setEmail(userInfo.email || "");
        setDescription(userInfo.description || "");
        setImage(userInfo.profileImage || "");
        setIsPublic(userInfo.isPublic !== undefined ? userInfo.isPublic : true);
    }, [userInfo]);

    useEffect(() => {
        if (updateSuccess) {
            onSuccess();
        }
    }, [updateSuccess, onSuccess]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("profileImage", file);

        setUploading(true);
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/upload/profileImage",
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
        dispatch(
            updateProfileAction(username, email, image, description, isPublic)
        );
    };

    return (
        <form className="form--container w-full" onSubmit={onSubmitHandler}>
            {uploadError &&
                uploadError.map((error) => (
                    <Message
                        key={error.message}
                        text={error.message}
                        type="danger"
                    />
                ))}
            {updateError &&
                updateError.map((error) => (
                    <Message
                        key={error.message}
                        text={error.message}
                        type="danger"
                    />
                ))}

            <h2>Update Profile</h2>
            <div className="form-item">
                <i className="fas fa-user-circle"></i>
                <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                />
            </div>
            <div className="form-item">
                <i className="fas fa-envelope"></i>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="form-item">
                <i className="fas fa-image"></i>
                <input
                    id="image"
                    onChange={handleImageUpload}
                    type="file"
                    accept="image/*"
                />
                {uploading && <Loader size="1rem" color="black" />}
            </div>
            <div className="form-item">
                <i className="fas fa-comment"></i>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Description"
                />
            </div>
            <div className="form-item checkbox">
                <i className="fas fa-check">Account Public</i>
                <input
                    onChange={(e) => setIsPublic(e.target.checked)}
                    checked={isPublic}
                    type="checkbox"
                ></input>
            </div>
            <button type="submit">
                Save Changes
                {updateLoading && <Loader size="1rem" color="white" />}
            </button>
        </form>
    );
}

export default EditProfile;
