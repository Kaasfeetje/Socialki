import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchFeedAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { FETCH_FEED_RESET } from "../actions/types";

function HomePage() {
    const dispatch = useDispatch();

    const fetchFeed = useSelector((state) => state.fetchFeed);
    const { loading, error, posts, lastPost, reblogs } = fetchFeed;

    useEffect(() => {
        return () => {
            dispatch({ type: FETCH_FEED_RESET });
        };
    }, [dispatch]);

    return (
        <div>
            <Header />
            <PostContainer
                fetchAction={fetchFeedAction}
                loading={loading}
                error={error}
                posts={posts}
                lastPost={lastPost}
                reblogs={reblogs}
            />
        </div>
    );
}

export default HomePage;
