import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedAction } from "../actions/postActions";
import { useIntersect } from "../hooks/useIntersect";

function PostContainer({ fetchAction }) {
    const dispatch = useDispatch();

    const fetchFeed = useSelector((state) => state.fetchFeed);
    const { loading, error, posts, lastPost } = fetchFeed;

    const [prevY, setPrevY] = useState(null);
    const [ref, entry] = useIntersect({ threshold: 1, rootMargin: "0px" });

    useEffect(() => {
        if (entry && entry.boundingClientRect) {
            const y = entry.boundingClientRect.y;

            if (prevY > y) {
                if (!loading) {
                    console.log("called");
                    dispatch(fetchAction(lastPost));
                }
            }
            setPrevY(y);
        }
    }, [entry, prevY, dispatch, fetchAction, loading, lastPost]);

    return (
        <section>
            {error && (
                <div
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        background: "rgb(0,0,0)",
                        color: "white",
                    }}
                >
                    {error[0].message}
                </div>
            )}

            <div>
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
                <img src="https://via.placeholder.com/350px" />
            </div>
            <div ref={ref}>
                <h2>Loading...</h2>
            </div>
        </section>
    );
}

PostContainer.defaultProps = {
    fetchAction: fetchFeedAction,
};

export default PostContainer;
