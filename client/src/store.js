import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    fetchExploreReducer,
    fetchFeedReducer,
    postCreateReducer,
    postFetchReducer,
    userFetchPostReducer,
} from "./reducers/postReducers";
import { userLoginReducer, fetchProfileReducer } from "./reducers/userReducers";
import { fetchNotificationReducer } from "./reducers/notificationReducers";

const reducer = combineReducers({
    fetchNotification: fetchNotificationReducer,
    fetchPost: postFetchReducer,
    fetchFeed: fetchFeedReducer,
    fetchExplore: fetchExploreReducer,
    fetchProfile: fetchProfileReducer,
    fetchUserPosts: userFetchPostReducer,
    postCreate: postCreateReducer,
    user: userLoginReducer,
});

const initialState = {};
const middleware = [thunk];

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
