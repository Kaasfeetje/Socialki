import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostContainer from "../components/PostContainer";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import { fetchProfileAction } from "../actions/userActions";
import { userFetchPostsAction } from "../actions/postActions";
import "../css/Profile.css";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";
import { Link } from "react-router-dom";
import Notifications from "../components/Notifications";
import {
    USER_FETCH_POSTS_RESET,
    USER_PROFILE_UPDATE_RESET,
} from "../actions/types";
import Message from "../components/Message";
import { history } from "../history";
import FollowButton from "../components/FollowButton";

function ProfilePage({ match }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { userInfo, loading: userLoading } = user;

    const fetchProfile = useSelector((state) => state.fetchProfile);
    const { error: profileError, loading, profile } = fetchProfile;

    const fetchUserPosts = useSelector((state) => state.fetchUserPosts);
    const { error, loading: postsLoading, posts, lastPost } = fetchUserPosts;

    const [isLoggedInUser, setIsLoggedInUser] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isFollowing, setIsFollowing] = useState(undefined);

    useEffect(() => {
        if (!userLoading && (userInfo === null || userInfo === {})) {
            history.push("/login");
        }
    }, [userInfo, userLoading]);

    useEffect(() => {
        return () => {
            dispatch({ type: USER_FETCH_POSTS_RESET });
        };
    }, [dispatch]);

    useEffect(() => {
        if (loading || profileError) return;
        console.log(postsLoading);
        //fetch the profile
        if (match.params.user) {
            if (
                profile &&
                (profile.username === match.params.user ||
                    profile.id === match.params.user)
            ) {
                //currently stored profile does not equal requested profile
                return;
            }
            dispatch(fetchProfileAction(match.params.user));
            if (!postsLoading) {
                console.log("HIHI");
                dispatch(userFetchPostsAction(undefined, match.params.user));
            }
        } else {
            if (
                userInfo &&
                userInfo.id &&
                (!profile || userInfo.id !== profile.id)
            ) {
                dispatch(fetchProfileAction(userInfo.id));
                if (!postsLoading) {
                    console.log("HIHI");
                    dispatch(userFetchPostsAction(undefined, userInfo.id));
                }
            }
        }
    }, [
        userInfo,
        match.params.user,
        dispatch,
        profile,
        loading,
        profileError,
        postsLoading,
    ]);

    useEffect(() => {
        //sets isfollowing
        if (
            isFollowing === undefined &&
            profile &&
            profile.isFollowing !== isFollowing
        ) {
            setIsFollowing(profile.isFollowing);
        }
    }, [profile, isFollowing]);

    useEffect(() => {
        //check if logged in user
        if (match.params.user) {
            if (
                userInfo &&
                (match.params.user === userInfo.id ||
                    match.params.user === userInfo.username)
            ) {
                //is current user
                setIsLoggedInUser(true);
            } else {
                setIsLoggedInUser(false);
            }
        } else {
            //match.params.user not specified so we on logged in users profile.
            setIsLoggedInUser(true);
        }
    }, [userInfo, match.params]);

    const editProfileHandler = () => {
        if (isLoggedInUser) {
            setShowEditProfile(true);
        }
    };

    const notificationHandler = () => {
        if (isLoggedInUser) {
            setNotification(true);
        }
    };

    const closeUpdateProfile = () => {
        setShowEditProfile(false);
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
    };

    return (
        <div>
            <Header />
            {profileError &&
                profileError.map((err) => (
                    <Message
                        key={err.message}
                        text={err.message}
                        type="danger"
                    />
                ))}
            <Modal
                opened={showEditProfile}
                onDismiss={closeUpdateProfile}
                content={<EditProfile onSuccess={closeUpdateProfile} />}
            />
            <Modal
                opened={notification}
                onDismiss={() => setNotification(false)}
                content={<Notifications />}
            />
            <div className="profile--info">
                <div className="profile--head">
                    <div className="profile--left">
                        <h2>Followers</h2>
                        <h3>{profile ? profile.followers : "?"}</h3>
                    </div>

                    <div className="profile--center">
                        <Avatar
                            image={
                                profile
                                    ? profile.profileImage
                                    : "uploads/default.jpg"
                            }
                            width="25%"
                        />
                        {profile && (
                            <h2 className="profile--username">
                                @{profile.username}
                            </h2>
                        )}
                    </div>
                    <div className="profile--right">
                        <h2>Following</h2>{" "}
                        <h3>{profile ? profile.following : "?"}</h3>
                    </div>
                </div>

                <div className="profile--description">
                    {profile ? profile.description : ""}
                </div>

                {!isLoggedInUser ? (
                    <div className="profile--actions">
                        {profile && (
                            <FollowButton
                                following={profile.isFollowing}
                                userId={profile.id}
                            />
                        )}
                        <div
                            onClick={() => alert("Chat is not implemented yet")}
                        >
                            <i className="fas fa-comment"></i>Message
                        </div>
                    </div>
                ) : (
                    <div className="profile--actions">
                        <Link to="/logout">
                            <i className="fas fa-user-minus"></i>
                            Logout
                        </Link>
                        <div onClick={notificationHandler}>
                            <i className="fas fa-bell"></i> Notifications
                        </div>
                        <div onClick={editProfileHandler}>
                            <i className="fas fa-user-edit"></i>Edit Profile
                        </div>
                    </div>
                )}
            </div>
            <section className="socialki-center">
                {userInfo && (
                    <PostContainer
                        fetchAction={userFetchPostsAction}
                        loading={
                            postsLoading === undefined ? true : postsLoading
                        }
                        posts={posts}
                        lastPost={lastPost}
                        user={
                            match.params.user ? match.params.user : userInfo.id
                        }
                        error={error}
                    />
                )}
            </section>
        </div>
    );
}

export default ProfilePage;
