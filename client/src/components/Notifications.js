import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import "../css/Notifications.css";
import { notificationFetchAction } from "../actions/notificationActions";
function Notifications() {
    const dispatch = useDispatch();

    const fetchNotification = useSelector((state) => state.fetchNotification);
    const { notifications } = fetchNotification;

    useEffect(() => {
        dispatch(notificationFetchAction());
    }, [dispatch]);

    const followHandler = async (id, accept) => {
        console.log(id);
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
                        case "FOLLOW_NOTIFICATION":
                            if (notification.follow.accepted) {
                                return (
                                    <div
                                        key={i}
                                        className="follow-notification"
                                    >
                                        <div>
                                            <span>
                                                @
                                                {notification.follow.follower &&
                                                    notification.follow.follower
                                                        .username}
                                            </span>
                                            is now following you.
                                        </div>
                                    </div>
                                );
                            }
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
