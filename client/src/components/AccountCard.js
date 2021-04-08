import React from "react";
import Avatar from "./Avatar";

import "../css/AccountCard.css";
import FollowButton from "./FollowButton";
import { history } from "../history";
function AccountCard({ user }) {
    return (
        <div className="account-card">
            <div
                onClick={(e) => history.push(`/profile/${user.username}`)}
                className="account-card--left pointer"
            >
                <Avatar image={user.profileImage} width="100%" />
            </div>
            <div className="account-card--center">
                <h2
                    onClick={(e) => history.push(`/profile/${user.username}`)}
                    className="pointer inline"
                >
                    @{user.username}
                </h2>
                <p>{user.description}</p>
            </div>
            <FollowButton
                className="account-card--right"
                userId={user.id}
                following={user.following}
            />
        </div>
    );
}

export default AccountCard;
