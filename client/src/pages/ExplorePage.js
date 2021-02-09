import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import Socialki from "../components/Socialki";
import { fetchExploreAction } from "../actions/postActions";

function ExplorePage() {
    const dispatch = useDispatch();

    const fetchExplore = useSelector((state) => state.fetchExplore);
    const { loading, error, posts } = fetchExplore;

    useEffect(() => {
        dispatch(fetchExploreAction());
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

export default ExplorePage;
