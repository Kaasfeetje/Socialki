import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    fetchExploreReducer,
    fetchFeedReducer,
    postCreateReducer,
} from "./reducers/postReducers";
import { userLoginReducer, fetchProfileReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    fetchFeed: fetchFeedReducer,
    fetchExplore: fetchExploreReducer,
    fetchProfile: fetchProfileReducer,
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