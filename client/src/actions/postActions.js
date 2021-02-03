import axios from "axios";
import {
    FETCH_FEED_FAIL,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
} from "./types";

export const fetchFeed = () => async (dispatch) => {
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
            payload: error,
        });
    }
};
