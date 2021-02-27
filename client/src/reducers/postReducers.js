import {
    FETCH_EXPLORE_FAIL,
    FETCH_EXPLORE_REQUEST,
    FETCH_EXPLORE_RESET,
    FETCH_EXPLORE_SUCCESS,
    FETCH_FEED_FAIL,
    FETCH_FEED_REQUEST,
    FETCH_FEED_RESET,
    FETCH_FEED_SUCCESS,
    POST_COMMENT_LIKE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_RESET,
    POST_CREATE_SUCCESS,
    POST_FETCH_COMMENT_FAIL,
    POST_FETCH_COMMENT_REQUEST,
    POST_FETCH_COMMENT_SUCCESS,
    POST_FETCH_FAIL,
    POST_FETCH_REQUEST,
    POST_FETCH_SUCCESS,
    POST_LIKE_SUCCESS,
    USER_FETCH_POSTS_FAIL,
    USER_FETCH_POSTS_REQUEST,
    USER_FETCH_POSTS_RESET,
    USER_FETCH_POSTS_SUCCESS,
} from "../actions/types";

export const fetchFeedReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_FEED_REQUEST:
            return {
                ...state,
                loading: true,
                posts: state.posts ? [...state.posts] : [],
            };
        case FETCH_FEED_SUCCESS:
            return {
                loading: false,
                posts: state.posts
                    ? [...state.posts, ...action.payload.data]
                    : action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case POST_LIKE_SUCCESS:
            const posts = [...state.posts];
            posts.forEach((post) => {
                if (action.payload.data.post.id === post.id) {
                    post.liked = true;
                }
            });
            return { ...state, loading: false, posts };
        case FETCH_FEED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                posts: state.posts ? [...state.posts] : [],
            };
        case FETCH_FEED_RESET:
            return {
                ...state,
                error: undefined,
            };
        default:
            return state;
    }
};

export const fetchExploreReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_EXPLORE_REQUEST:
            return {
                ...state,
                loading: true,
                posts: state.posts ? [...state.posts] : [],
            };
        case FETCH_EXPLORE_SUCCESS:
            return {
                loading: false,
                posts: state.posts
                    ? [...state.posts, ...action.payload.data]
                    : action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case POST_LIKE_SUCCESS:
            const posts = [...state.posts];
            posts.forEach((post) => {
                if (action.payload.data.post.id === post.id) {
                    post.liked = true;
                }
            });
            return { ...state, loading: false, posts };
        case FETCH_EXPLORE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                posts: state.posts ? [...state.posts] : [],
            };
        case FETCH_EXPLORE_RESET:
            return {
                ...state,
                error: undefined,
            };
        default:
            return state;
    }
};

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { ...state, loading: true };
        case POST_CREATE_SUCCESS:
            return {
                loading: false,
                posts: action.payload.data,
                success: true,
            };
        case POST_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case POST_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userFetchPostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case USER_FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
                posts: state.posts ? [...state.posts] : [],
            };
        case USER_FETCH_POSTS_SUCCESS:
            return {
                loading: false,
                posts: state.posts
                    ? [...state.posts, ...action.payload.data]
                    : action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case POST_LIKE_SUCCESS:
            const posts = [...state.posts];
            posts.forEach((post) => {
                if (action.payload.data.post.id === post.id) {
                    post.liked = true;
                }
            });
            return { ...state, loading: false, posts };
        case USER_FETCH_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                posts: state.posts ? [...state.posts] : [],
            };
        case USER_FETCH_POSTS_RESET:
            return {
                ...state,
                error: undefined,
            };
        default:
            return state;
    }
};

export const postFetchReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.payload.data,
            };
        case POST_LIKE_SUCCESS:
            const postCopy = { ...state.post };
            if (postCopy.id === action.payload.data.post.id)
                postCopy.liked = action.payload ? true : false;
            return { ...state, loading: false, post: postCopy };
        case POST_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case POST_FETCH_COMMENT_REQUEST:
            return {
                ...state,
                commentLoading: true,
            };
        case POST_FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.payload.data,
                commentLoading: false,
            };
        case POST_FETCH_COMMENT_FAIL:
            return {
                ...state,
                commentError: action.payload,
                commentLoading: false,
            };

        case POST_COMMENT_LIKE_SUCCESS:
            console.log(action.payload);
            state.comments.forEach((c) => {
                if (c.id == action.payload.data.comment.id) {
                    c.liked = !c.liked;
                }
            });
            return {
                ...state,
            };

        default:
            return state;
    }
};
