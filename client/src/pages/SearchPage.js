import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { searchAction } from "../actions/postActions";
import PostContainer from "../components/PostContainer";
import { SEARCH_RESET } from "../actions/types";
import { history } from "../history";
import AccountCard from "../components/AccountCard";

function SearchPage({ match, location }) {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");

    const fetchSearch = useSelector((state) => state.fetchSearch);
    const { loading, error, posts, users, lastPost } = fetchSearch;

    const user = useSelector((state) => state.user);
    const { userInfo, loading: userLoading } = user;

    useEffect(() => {
        if (!userLoading && (userInfo === null || userInfo === {})) {
            history.push("/login");
        }
    }, [userInfo, userLoading]);

    useEffect(() => {
        console.log("test");
        dispatch(
            searchAction(
                match.params.keyword || location.hash,
                undefined,
                true,
                true
            )
        );
        return () => {
            dispatch({ type: SEARCH_RESET });
        };
    }, [dispatch, match.params.keyword, location.hash]);

    const search = (e) => {
        e.preventDefault();
        history.push(`/search/${keyword}`);
    };

    return (
        <div>
            <Header />
            {/* className="container socialki-center" */}
            <section className="container">
                <form
                    onSubmit={search}
                    style={{
                        width: "60%",
                        // , margin: "0 auto"
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
                {users && users.length > 0 && (
                    <div>
                        {users.map((user) => (
                            <AccountCard key={user.id} user={user} />
                        ))}
                    </div>
                )}
                <PostContainer
                    fetchAction={() =>
                        searchAction(
                            match.params.keyword || location.hash,
                            lastPost,
                            false,
                            posts.length > 0
                        )
                    }
                    loading={loading}
                    error={error}
                    posts={posts}
                    lastPost={lastPost}
                />
            </section>
        </div>
    );
}

export default SearchPage;
