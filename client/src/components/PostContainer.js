import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFeedAction } from "../actions/postActions";
import { useIntersect } from "../hooks/useIntersect";
import Loader from "./Loader";
import Socialki from "./Socialki";
import Message from "./Message";

function PostContainer({ fetchAction, loading, error, posts, lastPost, user }) {
    const dispatch = useDispatch();

    const [prevY, setPrevY] = useState(null);
    const [ref, entry] = useIntersect({ threshold: 0.3, rootMargin: "0px" });

    useEffect(() => {
        if (lastPost === undefined) {
            dispatch(fetchAction(undefined, user ? user : undefined));
        }
    }, [dispatch, fetchAction, lastPost, user]);

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
            {error &&
                error.map((err) => (
                    <Message
                        key={err.message}
                        type="danger"
                        text={err.message}
                    />
                ))}
            <div className="container">
                {posts && (
                    <>
                        {posts.map((post) => (
                            <Socialki key={post.id} socialki={post} />
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
