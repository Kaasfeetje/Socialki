import {
    USER_FETCH_ME_FAIL,
    USER_FETCH_ME_REQUEST,
    USER_FETCH_ME_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
} from "../actions/types";

export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };

        case USER_FETCH_ME_REQUEST:
            return { loading: true };
        case USER_FETCH_ME_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_FETCH_ME_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
