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
} from "./types";

export const fetchFeedAction = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_FEED_REQUEST });

        const { data } = await axios.get("/api/v1/posts/feed");

        dispatch({
            type: FETCH_FEED_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_FEED_FAIL,
            payload: error.response.data.errors,
        });
    }
};

export const fetchExploreAction = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_EXPLORE_REQUEST });

        const { data } = await axios.get("/api/v1/posts");

        dispatch({
            type: FETCH_EXPLORE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_EXPLORE_FAIL,
            payload: error.response.data.errors,
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
            payload: error.response.data.errors,
        });
    }
};
