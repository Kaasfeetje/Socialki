import React, { useState } from "react";
import axios from "axios";

import Avatar from "./Avatar";
import "../css/Socialki.css";

function Socialki({ socialki }) {
    const [liked, setLiked] = useState(socialki.liked || false);

    const likeHandler = async () => {
        setLiked(!liked);
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            await axios.post("/api/v1/like", { postId: socialki.id }, config);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="socialki">
            <div className="socialki--actions">
                <i
                    onClick={likeHandler}
                    className={`fa${liked ? "s" : "r"} fa-heart`}
                ></i>
                <i className="far fa-comments"></i>
                <i className="fas fa-retweet"></i>
                <i className="fas fa-share"></i>
            </div>
            <div className="socialki--main">
                <div className="socialki--body">
                    {socialki.image && (
                        <img
                            className="image"
                            src={socialki.image}
                            alt={socialki.description}
                        />
                    )}
                    {socialki.description && <p>{socialki.description}</p>}
                </div>
                <div className="socialki--user">
                    <span>
                        @{socialki && socialki.user && socialki.user.username}
                    </span>
                    <Avatar
                        image={
                            socialki && socialki.user
                                ? socialki.user.profileImage
                                : ""
                        }
                        width="50px"
                        height="50px"
                    />
                </div>
            </div>
        </div>
    );
}

export default Socialki;