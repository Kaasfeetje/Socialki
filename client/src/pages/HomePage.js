import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import Socialki from "../components/Socialki";
import { fetchFeedAction } from "../actions/postActions";
import Modal from "../components/Modal";
import CreateSocialki from "../components/CreateSocialki";

function HomePage() {
    const dispatch = useDispatch();

    const fetchFeed = useSelector((state) => state.fetchFeed);
    const { loading, error, posts } = fetchFeed;

    useEffect(() => {
        dispatch(fetchFeedAction());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <section>
                <div className="container">
                    {loading ? (
                        <div>Loading</div>
                    ) : error ? (
                        <div>
                            {error.map((err) => (
                                <h2 key={err.message}>{err.message}</h2>
                            ))}
                        </div>
                    ) : (
                        <>
                            {posts.map((post) => (
                                <Socialki key={post.id} socialki={post} />
                            ))}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
