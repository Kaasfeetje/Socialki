import {
    FETCH_FEED_FAIL,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
} from "../actions/types";

export const fetchFeedReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_FEED_REQUEST:
            return { loading: true, posts: [] };
        case FETCH_FEED_SUCCESS:
            return {
                loading: false,
                posts: action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case FETCH_FEED_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
