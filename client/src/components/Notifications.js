import axios from "axios";
import React from "react";

import "../css/Notifications.css";
function Notifications({
    notifications = [
        {
            type: "FOLLOW_REQUEST",
            follow: {
                id: "1",
                follower: { username: "kaasfeetje" },
                followed: { username: "jane" },
            },
        },
        {
            type: "LIKE_POST",
            user: {
                username: "kaasfeetje",
            },
            post: {
                description: "Yo this is for my followers",
                image: "uploads/default.jpg",
            },
        },
    ],
}) {
    const followHandler = async (id, accept) => {
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            await axios.post(
                `/api/v1/follow/${id}/${accept ? "accept" : "reject"}`,
                {},
                config
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <div className="notifications--panel">
                {notifications.map((notification, i) => {
                    switch (notification.type) {
                        case "LIKE_POST":
                            return (
                                <div key={i} className="like-post-notification">
                                    <div className="like-post-notification--post">
                                        <img
                                            src={notification.post.image}
                                            alt={`${notification.user.username} post`}
                                        />
                                        <div>
                                            {notification.post.description}
                                        </div>
                                    </div>
                                    <div>
                                        has been liked by @
                                        {notification.user.username}
                                    </div>
                                </div>
                            );
                        case "FOLLOW_REQUEST":
                            return (
                                <div key={i} className="follow-notification">
                                    <div>
                                        <span>
                                            @
                                            {notification.follow.follower
                                                .username + " "}
                                        </span>
                                        wants to follow you
                                    </div>
                                    <div>
                                        <i
                                            onClick={() =>
                                                followHandler(
                                                    notification.follow.id,
                                                    true
                                                )
                                            }
                                            className="fas fa-check-circle"
                                        ></i>
                                        <i
                                            onClick={() =>
                                                followHandler(
                                                    notification.follow.id,
                                                    false
                                                )
                                            }
                                            className="fas fa-times-circle danger"
                                        ></i>
                                    </div>
                                </div>
                            );
                        default:
                            return <div>t</div>;
                    }
                })}
            </div>
        </div>
    );
}

export default Notifications;
