import {
    FETCH_EXPLORE_FAIL,
    FETCH_EXPLORE_REQUEST,
    FETCH_EXPLORE_SUCCESS,
    FETCH_FEED_FAIL,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
} from "../actions/types";

export const fetchFeedReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_FEED_REQUEST:
            return { loading: true, posts: [] };
        case FETCH_FEED_SUCCESS:
            return {
                loading: false,
                posts: [...state.posts, ...action.payload.data],
                lastPost: action.payload.lastPost,
            };
        case FETCH_FEED_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchExploreReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_EXPLORE_REQUEST:
            return { loading: true, posts: [] };
        case FETCH_EXPLORE_SUCCESS:
            return {
                loading: false,
                posts: action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case FETCH_EXPLORE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true };
        case POST_CREATE_SUCCESS:
            return {
                loading: false,
                posts: action.payload.data,
                success: true,
            };
        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
