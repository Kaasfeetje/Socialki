import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFeedAction } from "../actions/postActions";
import { useIntersect } from "../hooks/useIntersect";
import Loader from "./Loader";
import Socialki from "./Socialki";
import InlineMessage from "./InlineMessage";

function PostContainer({
    fetchAction,
    loading,
    error,
    posts,
    lastPost,
    user,
    reblogs,
}) {
    const dispatch = useDispatch();

    const [prevY, setPrevY] = useState(null);
    const [ref, entry] = useIntersect({ threshold: 0.3, rootMargin: "0px" });

    useEffect(() => {
        if (lastPost === undefined && !error && !loading) {
            dispatch(fetchAction(undefined, user ? user : undefined));
        }
    }, [dispatch, fetchAction, lastPost, user, loading, error]);

    useEffect(() => {
        if (entry && entry.boundingClientRect) {
            const y = entry.boundingClientRect.y;

            if (prevY > y) {
                //&& !error
                if (!loading) {
                    dispatch(fetchAction(lastPost, user ? user : undefined));
                }
            }
            setPrevY(y);
        }
    }, [entry, prevY, dispatch, fetchAction, loading, lastPost, error, user]);

    return (
        <section>
            <div className="container">
                {posts && (
                    <>
                        {posts.map((post, i) => (
                            <Socialki
                                key={i}
                                socialki={post}
                                reblog={reblogs && reblogs[i]}
                            />
                        ))}
                        {error &&
                            error.map((err) => (
                                <InlineMessage
                                    key={err.message}
                                    type="danger"
                                    text={err.message}
                                />
                            ))}
                        <div ref={ref}>
                            <Loader size="5rem" />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

PostContainer.defaultProps = {
    fetchAction: fetchFeedAction,
};

export default PostContainer;
