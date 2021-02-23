import {
    NOTIFICATION_FETCH_FAIL,
    NOTIFICATION_FETCH_REQUEST,
    NOTIFICATION_FETCH_SUCCESS,
} from "../actions/types";

export const fetchNotificationReducer = (
    state = { notifications: [] },
    action
) => {
    switch (action.type) {
        case NOTIFICATION_FETCH_REQUEST:
            return {
                loading: true,
                notifications: state.notifications
                    ? [...state.notifications]
                    : [],
            };
        case NOTIFICATION_FETCH_SUCCESS:
            return {
                loading: false,
                notifications: action.payload.data,
                lastPost: action.payload.lastPost,
            };
        case NOTIFICATION_FETCH_FAIL:
            return {
                loading: false,
                error: action.payload,
                notifications: state.notifications ? [...state.notifications] : [],
            };
        default:
            return state;
    }
};
