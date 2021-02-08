import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfileAction } from "../actions/userActions";

function EditProfile({ onSuccess }) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const user = useSelector((state) => state.user);
    const { updateSuccess, userInfo } = user;

    useEffect(() => {
        if (!userInfo) return;

        setUsername(userInfo.username || "");
        setEmail(userInfo.email || "");
        setDescription(userInfo.description || "");
        setImage(userInfo.profileImage || "");
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
            console.log(err);
            setUploading(false);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(image);
        dispatch(updateProfileAction(username, email, image, description));
    };

    return (
        <form className="form--container w-full" onSubmit={onSubmitHandler}>
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
                <input id="image" onChange={handleImageUpload} type="file" />
                {uploading && <h2>Loading...</h2>}
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
            <button type="submit">Post</button>
        </form>
    );
}

export default EditProfile;
