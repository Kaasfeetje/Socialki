import axios from "axios";
import React, { useState } from "react";

function FollowButton({ className, following, userId }) {
    const [isFollowing, setIsFollowing] = useState(following || undefined);
    const followHandler = async () => {
        if (isFollowing) setIsFollowing(false);
        if (!isFollowing) setIsFollowing("pending");

        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/follow",
                { followed: userId },
                config
            );

            if (data.data && data.data.accepted === true) {
                setIsFollowing(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={className} onClick={followHandler}>
            {isFollowing === "pending" ? (
                <>
                    <i className="fas fa-user-clock"></i>
                    <span>Pending</span>
                </>
            ) : isFollowing ? (
                <>
                    <i className="fas fa-user-minus"></i>
                    <span>Unfollow</span>
                </>
            ) : (
                <>
                    <i className="fas fa-user-plus"></i>
                    <span>Follow</span>
                </>
            )}
        </div>
    );
}

export default FollowButton;
