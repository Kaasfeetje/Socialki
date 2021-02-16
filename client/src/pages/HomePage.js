import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchFeedAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";

function HomePage() {
    const fetchFeed = useSelector((state) => state.fetchFeed);
    const { loading, error, posts, lastPost } = fetchFeed;

    return (
        <div>
            <Header />
            <PostContainer
                fetchAction={fetchFeedAction}
                loading={loading}
                error={error}
                posts={posts}
                lastPost={lastPost}
            />
        </div>
    );
}

export default HomePage;
