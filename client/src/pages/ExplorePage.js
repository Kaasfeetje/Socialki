import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchExploreAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";

function ExplorePage() {
    const fetchExplore = useSelector((state) => state.fetchExplore);
    const { loading, error, posts, lastPost } = fetchExplore;

    return (
        <div>
            <Header />
            <PostContainer
                fetchAction={fetchExploreAction}
                loading={loading}
                error={error}
                posts={posts}
                lastPost={lastPost}
            />
        </div>
    );
}

export default ExplorePage;
