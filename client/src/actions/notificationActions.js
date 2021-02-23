import axios from "axios";
import {
    NOTIFICATION_FETCH_FAIL,
    NOTIFICATION_FETCH_REQUEST,
    NOTIFICATION_FETCH_SUCCESS,
} from "./types";

export const notificationFetchAction = () => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_FETCH_REQUEST });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get("/api/v1/notifications", config);

        dispatch({ type: NOTIFICATION_FETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: NOTIFICATION_FETCH_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : [{ message: error.message }],
        });
    }
};
