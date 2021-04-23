import axios from "axios";
import {
    FETCH_FEED_FAIL,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
    FETCH_EXPLORE_FAIL,
    FETCH_EXPLORE_REQUEST,
    FETCH_EXPLORE_SUCCESS,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    USER_FETCH_POSTS_REQUEST,
    USER_FETCH_POSTS_SUCCESS,
    USER_FETCH_POSTS_FAIL,
    POST_FETCH_REQUEST,
    POST_FETCH_SUCCESS,
    POST_FETCH_FAIL,
    POST_LIKE_REQUEST,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAIL,
    POST_REBLOG_REQUEST,
    POST_REBLOG_SUCCESS,
    POST_REBLOG_FAIL,
    POST_COMMENT_REQUEST,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL,
    POST_FETCH_COMMENT_REQUEST,
    POST_FETCH_COMMENT_SUCCESS,
    POST_FETCH_COMMENT_FAIL,
    POST_COMMENT_LIKE_REQUEST,
    POST_COMMENT_LIKE_SUCCESS,
    POST_COMMENT_LIKE_FAIL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
} from "./types";

export const fetchFeedAction = (lastPost = undefined) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_FEED_REQUEST });
        let data;

        if (lastPost === undefined) {
            const res = await axios.get("/api/v1/posts/feed");
            data = res.data;
        } else {
            const res = await axios.get(
                `/api/v1/posts/feed?lastPost=${lastPost}`
            );
            data = res.data;
        }

        dispatch({
            type: FETCH_FEED_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_FEED_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const fetchExploreAction = (lastPost) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_EXPLORE_REQUEST });

        let data;
        if (lastPost === undefined) {
            const res = await axios.get("/api/v1/posts");
            data = res.data;
        } else {
            const res = await axios.get(`/api/v1/posts?lastPost=${lastPost}`);
            data = res.data;
        }

        dispatch({
            type: FETCH_EXPLORE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_EXPLORE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const createPostAction = (description, image, visibility) => async (
    dispatch
) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/posts",
            { description, image, visibility },
            config
        );
        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const userFetchPostsAction = (lastPost, user) => async (dispatch) => {
    //used to filter out bad request
    if (!user) return;
    console.log("test", user);
    try {
        dispatch({ type: USER_FETCH_POSTS_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        let data;
        if (lastPost === undefined) {
            const res = await axios.get(`/api/v1/posts/users/${user}`, config);
            data = res.data;
        } else {
            const res = await axios.get(
                `/api/v1/posts/users/${user}?lastPost=${lastPost}`,
                config
            );
            data = res.data;
        }

        dispatch({ type: USER_FETCH_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_FETCH_POSTS_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const fetchPostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_FETCH_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(`/api/v1/posts/${id}`, config);

        dispatch({ type: POST_FETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_FETCH_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const postLikeAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_LIKE_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/like",
            { postId: id },
            config
        );
        dispatch({ type: POST_LIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_LIKE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const postReblogAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_REBLOG_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/reblog",
            { postId: id },
            config
        );
        dispatch({ type: POST_REBLOG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_REBLOG_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const postCommentAction = (id, comment) => async (dispatch) => {
    try {
        dispatch({ type: POST_COMMENT_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/comments/${id}`,
            comment,
            config
        );
        dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const postFetchCommentAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_FETCH_COMMENT_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(`/api/v1/comments/${id}`, config);

        dispatch({ type: POST_FETCH_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_FETCH_COMMENT_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const postLikeCommentAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_COMMENT_LIKE_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/like/comment`,
            { commentId: id },
            config
        );

        dispatch({ type: POST_COMMENT_LIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_LIKE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};

export const searchAction = (keyword, lastPost, first, hasPosts) => async (
    dispatch
) => {
    if (!hasPosts) return;
    try {
        dispatch({ type: SEARCH_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        let data;

        if (lastPost === undefined) {
            const res = await axios.post(
                `/api/v1/search`,
                { keyword, first },
                config
            );
            data = res.data;
        } else {
            const res = await axios.post(
                `/api/v1/search?lastPost=${lastPost}`,
                { keyword, first },
                config
            );
            data = res.data;
        }

        dispatch({
            type: SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SEARCH_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};
