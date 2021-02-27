import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Avatar from "./Avatar";
import "../css/Socialki.css";
import { history } from "../history";
import {
    postLikeAction,
    postLikeCommentAction,
    postReblogAction,
} from "../actions/postActions";
import Message from "./Message";

function Socialki({ socialki, comment, match }) {
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(socialki.liked || false);
    const [reblogged, setReblogged] = useState(socialki.reblogged || false);

    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    const likeHandler = () => {
        setLiked(!liked);
        if (!comment) dispatch(postLikeAction(socialki.id));
        else dispatch(postLikeCommentAction(socialki.id));
    };

    const reblogHandler = () => {
        setReblogged(!reblogged);
        dispatch(postReblogAction(socialki.id));
    };

    const copyToClipBoard = () => {
        const el = document.createElement("textarea");
        const val = window.location.pathname.split("/");
        const id = !comment ? socialki.id : val[val.length - 1];

        el.value = `http://localhost:3000/post/${id}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        setCopiedToClipboard(true);
        document.body.removeChild(el);
    };

    return (
        <div className="socialki">
            {copiedToClipboard && <Message text="Copied link to clipboard" />}
            <div className="socialki--actions">
                <i
                    onClick={likeHandler}
                    className={`fa${liked ? "s" : "r"} fa-heart`}
                ></i>
                {!comment && <i className="far fa-comments"></i>}
                {!comment && (
                    <i
                        onClick={reblogHandler}
                        className={`fas fa-retweet ${reblogged && "reblogged"}`}
                    ></i>
                )}

                <i onClick={copyToClipBoard} className="fas fa-share"></i>
            </div>
            <div
                className={`socialki--main ${comment && "no-pointer"}`}
                onClick={() => {
                    if (!comment) {
                        history.push(`/post/${socialki.id}`);
                    }
                }}
            >
                <div className="socialki--body">
                    {socialki.image && (
                        <img
                            className="image"
                            src={`/${socialki.image}`}
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
