import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchExploreAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { FETCH_EXPLORE_RESET } from "../actions/types";

function ExplorePage() {
    const dispatch = useDispatch();

    const fetchExplore = useSelector((state) => state.fetchExplore);
    const { loading, error, posts, lastPost } = fetchExplore;

    useEffect(() => {
        return () => {
            dispatch({ type: FETCH_EXPLORE_RESET });
        };
    }, [dispatch]);

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
