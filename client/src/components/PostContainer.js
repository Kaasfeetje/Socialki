import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedAction } from "../actions/postActions";
import { useIntersect } from "../hooks/useIntersect";
import Socialki from "./Socialki";

function PostContainer({ fetchAction, loading, error, posts, lastPost }) {
    const dispatch = useDispatch();

    const [prevY, setPrevY] = useState(null);
    const [ref, entry] = useIntersect({ threshold: 0.3, rootMargin: "0px" });

    useEffect(() => {
        if (!lastPost) {
            dispatch(fetchAction());
        }
    }, [dispatch, fetchAction, lastPost]);

    useEffect(() => {
        if (entry && entry.boundingClientRect) {
            const y = entry.boundingClientRect.y;

            if (prevY > y) {
                if (!loading && !error) {
                    dispatch(fetchAction(lastPost));
                }
            }
            setPrevY(y);
        }
    }, [entry, prevY, dispatch, fetchAction, loading, lastPost, error]);

    return (
        <section>
            <div className="container">
                {posts && (
                    <>
                        {posts.map((post) => (
                            <Socialki key={post.id} socialki={post} />
                        ))}
                        <div ref={ref}>
                            {error && <h2>{error[0].message}</h2>}
                            <h2>Loading...</h2>
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
