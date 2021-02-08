import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Socialki from "../components/Socialki";
import { fetchProfileAction } from "../actions/userActions";
import "../css/Profile.css";
function ProfilePage({ match }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { userInfo } = user;

    const fetchProfile = useSelector((state) => state.fetchProfile);
    const { loading, error, posts, profile } = fetchProfile;

    useEffect(() => {
        if (match.params.userId) {
            dispatch(fetchProfileAction(match.params.userId));
        } else {
            if (userInfo && userInfo.id) {
                dispatch(fetchProfileAction(userInfo.id));
            }
        }
    }, [dispatch, userInfo, match.params]);

    return (
        <div>
            <Header />
            <div className="profile--info">
                <div className="profile--head">
                    <div className="profile--left">
                        <h2>Followers</h2>{" "}
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
                    </div>
                    <div className="profile--right">
                        <h2>Following</h2>{" "}
                        <h3>{profile ? profile.following : "?"}</h3>
                    </div>
                </div>
                <div className="profile--description">
                    {profile ? profile.description : ""}
                </div>
            </div>
            <section className="container socialki-center">
                {loading ? (
                    <h2>Loading</h2>
                ) : error ? (
                    <h2>{error.map((err) => err.message)}</h2>
                ) : (
                    posts.map((post) => <Socialki socialki={post} />)
                )}
            </section>
        </div>
    );
}

export default ProfilePage;
