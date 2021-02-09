import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Socialki from "../components/Socialki";
import { fetchProfileAction } from "../actions/userActions";
import "../css/Profile.css";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import { Link } from "react-router-dom";
function ProfilePage({ match }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { userInfo } = user;

    const fetchProfile = useSelector((state) => state.fetchProfile);
    const { loading, error, posts, profile } = fetchProfile;

    const [isLoggedInUser, setIsLoggedInUser] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState(undefined);

    useEffect(() => {
        //fetch the profile
        if (match.params.user) {
            dispatch(fetchProfileAction(match.params.user));
        } else {
            if (userInfo && userInfo.id) {
                dispatch(fetchProfileAction(userInfo.id));
            }
        }
    }, [userInfo, match.params.user, dispatch]);

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

    const followHandler = async () => {
        if (!profile) return;

        setIsFollowing(!isFollowing);
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            await axios.post(
                "/api/v1/follow",
                { followed: profile.id },
                config
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            <Modal
                opened={showEditProfile}
                onDismiss={() => setShowEditProfile(false)}
                content={
                    <EditProfile onSuccess={() => setShowEditProfile(false)} />
                }
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
                                    : "/uploads/default.jpg"
                            }
                            fluid
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
                        <div onClick={followHandler}>
                            {isFollowing ? (
                                <>
                                    <i className="fas fa-user-minus"></i>
                                    Unfollow
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus"></i>Follow
                                </>
                            )}
                        </div>
                        <div
                            onClick={() => alert("Chat is not implemented yet")}
                        >
                            <i className="fas fa-comment"></i>Message
                        </div>
                    </div>
                ) : (
                    <div className="profile--actions">
                        <Link to="/settings">
                            <i className="fas fa-user-cog"></i>
                            Settings
                        </Link>
                        <div onClick={editProfileHandler}>
                            <i className="fas fa-user-edit"></i>Edit Profile
                        </div>
                    </div>
                )}
            </div>
            <section className="container socialki-center">
                {loading ? (
                    <h2>Loading</h2>
                ) : error ? (
                    <h2>{error.map((err) => err.message)}</h2>
                ) : (
                    posts.map((post) => (
                        <Socialki key={post.id} socialki={post} />
                    ))
                )}
            </section>
        </div>
    );
}

export default ProfilePage;
