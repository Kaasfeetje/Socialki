import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Avatar from "./Avatar";
import "../css/Socialki.css";
import { history } from "../history";
import { postLikeAction } from "../actions/postActions";

function Socialki({ socialki }) {
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(socialki.liked || false);
    const likeHandler = async () => {
        setLiked(!liked);
        dispatch(postLikeAction(socialki.id));
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
            <div
                className="socialki--main"
                onClick={() => history.push(`/post/${socialki.id}`)}
            >
                <div className="socialki--body">
                    {socialki.image && (
                        <img
                            className="image"
                            src={socialki.image}
                            alt={socialki.description}
                        />
                    )}
                    {socialki.description && (
                        <span>{socialki.description}</span>
                    )}
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="socialki--user"
                >
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

Socialki.defaultProps = {
    socialki: {
        id: "1",
        description: "Did not load correctly",
        image: "",
        liked: false,
        user: {
            username: "No idea",
            profileImage: "uploads/default.jpg",
        },
    },
};

export default Socialki;
