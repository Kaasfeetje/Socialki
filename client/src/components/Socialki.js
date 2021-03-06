import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import "../css/Socialki.css";
import { history } from "../history";
import {
    postLikeAction,
    postLikeCommentAction,
    postReblogAction,
} from "../actions/postActions";
import Message from "./Message";
import SocialkiText from "./SocialkiText";

function Socialki({ socialki, comment, reblog }) {
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
                {reblog && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="socialki--reblog"
                    >
                        @{reblog.username} has reblogged this post
                    </div>
                )}
                <div className="socialki--body">
                    {socialki.image && (
                        <img
                            className="image"
                            src={
                                socialki.image.startsWith("http")
                                    ? `${socialki.image}`
                                    : `/${socialki.image}`
                            }
                            alt={socialki.description}
                        />
                    )}
                    {socialki.description && (
                        <span onClick={(e) => e.stopPropagation()}>
                            <SocialkiText text={socialki.description} />
                        </span>
                    )}
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="socialki--user"
                >
                    <Link
                        to={
                            socialki.user
                                ? `/profile/${socialki.user.username}`
                                : `/profile`
                        }
                    >
                        <span>
                            @
                            {socialki && socialki.user
                                ? socialki.user.username
                                : "deleted-account"}
                        </span>
                    </Link>
                    <Link
                        to={
                            socialki.user
                                ? `/profile/${socialki.user.username}`
                                : `/profile`
                        }
                    >
                        <Avatar
                            image={
                                socialki && socialki.user
                                    ? socialki.user.profileImage
                                    : ""
                            }
                            width="50px"
                            height="50px"
                        />
                    </Link>
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
