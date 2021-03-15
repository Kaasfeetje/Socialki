import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchExploreAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { FETCH_EXPLORE_RESET } from "../actions/types";
import { history } from "../history";

function ExplorePage() {
    const dispatch = useDispatch();

    const fetchExplore = useSelector((state) => state.fetchExplore);
    const { loading, error, posts, lastPost } = fetchExplore;

    const user = useSelector((state) => state.user);
    const { userInfo, loading: userLoading } = user;

    useEffect(() => {
        if (!userLoading && (userInfo === null || userInfo === {})) {
            history.push("/login");
        }
    }, [userInfo, userLoading]);

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
