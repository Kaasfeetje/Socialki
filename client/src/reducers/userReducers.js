import {
    FETCH_PROFILE_FAIL,
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    USER_FETCH_ME_FAIL,
    USER_FETCH_ME_REQUEST,
    USER_FETCH_ME_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_RESET,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT_FAIL,
    USER_SIGNOUT_REQUEST,
    USER_SIGNOUT_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
} from "../actions/types";

export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loadingLogin: true };
        case USER_SIGNIN_SUCCESS:
            return {
                loadingLogin: false,
                userInfo: action.payload,
                loginSuccess: true,
            };
        case USER_SIGNIN_FAIL:
            return { loadingLogin: false, loginError: action.payload };

        case USER_SIGNUP_REQUEST:
            return { loadingSignup: true };
        case USER_SIGNUP_SUCCESS:
            return {
                loadingSignup: false,
                userInfo: action.payload,
                signupSuccess: true,
            };
        case USER_SIGNUP_FAIL:
            return { loadingSignup: false, signupError: action.payload };

        case USER_FETCH_ME_REQUEST:
            return { loading: true };
        case USER_FETCH_ME_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_FETCH_ME_FAIL:
            return { loading: false, error: action.payload };

        case USER_PROFILE_UPDATE_REQUEST:
            return { updateLoading: true };
        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                updateLoading: false,
                userInfo: action.payload,
                updateSuccess: true,
            };
        case USER_PROFILE_UPDATE_FAIL:
            return { updateLoading: false, updateError: action.payload };
        case USER_PROFILE_UPDATE_RESET:
            return {
                ...state,
                updateSuccess: false,
            };
        case USER_SIGNOUT_REQUEST:
            return { loading: true };
        case USER_SIGNOUT_SUCCESS:
            return { loading: false, userInfo: undefined, logoutSuccess: true };
        case USER_SIGNOUT_FAIL:
            return { loading: false };
        default:
            return state;
    }
};

export const fetchProfileReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return { loading: true, posts: [] };
        case FETCH_PROFILE_SUCCESS:
            return {
                loading: false,
                profile: action.payload.data,
            };
        case FETCH_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
