import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { fetchExploreAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { FETCH_EXPLORE_RESET } from "../actions/types";
import { history } from "../history";

function ExplorePage() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");

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

    const search = (e) => {
        e.preventDefault();
        history.push(`/search/${keyword}`);
    };

    return (
        <div>
            <Header />

            <section className="container socialki-center">
                <form
                    onSubmit={search}
                    style={{
                        width: "60%",
                        margin: "0 auto",
                    }}
                >
                    <div className="form-item" key="keyword">
                        <i
                            className="fas fa-search"
                            style={{ cursor: "pointer" }}
                            onClick={search}
                        ></i>

                        <input
                            onChange={(e) => setKeyword(e.target.value)}
                            id="keyword"
                            type="text"
                            placeholder="Search..."
                        ></input>
                    </div>
                </form>
                <PostContainer
                    fetchAction={fetchExploreAction}
                    loading={loading}
                    error={error}
                    posts={posts}
                    lastPost={lastPost}
                />
            </section>
        </div>
    );
}

export default ExplorePage;
