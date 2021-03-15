import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchFeedAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { FETCH_FEED_RESET } from "../actions/types";
import { history } from "../history";

function HomePage() {
    const dispatch = useDispatch();

    const fetchFeed = useSelector((state) => state.fetchFeed);
    const { loading, error, posts, lastPost, reblogs } = fetchFeed;

    const user = useSelector((state) => state.user);
    const { userInfo, loading: userLoading } = user;
    useEffect(() => {
        if (!userLoading && (userInfo === null || userInfo === {})) {
            history.push("/login");
        }
    }, [userInfo, userLoading]);

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
