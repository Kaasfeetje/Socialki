import axios from "axios";
import {
    USER_FETCH_ME_FAIL,
    USER_FETCH_ME_REQUEST,
    USER_FETCH_ME_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
} from "./types";

export const signin = (username_email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNIN_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/auth/signin",
            {
                username_email,
                password,
            },
            config
        );

        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL });
    }
};

export const signup = (email, username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/auth/signup",
            {
                username,
                email,
                password,
            },
            config
        );

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: USER_SIGNUP_FAIL });
    }
};

export const getMe = () => async (dispatch) => {
    try {
        dispatch({ type: USER_FETCH_ME_REQUEST });

        const { data } = await axios.get("/api/v1/auth/me");

        dispatch({ type: USER_FETCH_ME_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: USER_FETCH_ME_FAIL });
    }
};

export const fetchProfileAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PROFILE_REQUEST });

        const { data } = await axios.get(`/api/v1/users/${id}/profile`);

        dispatch({
            type: FETCH_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_PROFILE_FAIL,
            payload: error.response.data.errors,
        });
    }
};

export const updateProfileAction = (
    username,
    email,
    profileImage,
    description
) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.put(
            "/api/v1/auth/update-me",
            { username, email, profileImage, description },
            config
        );
        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response.data.errors,
        });
    }
};