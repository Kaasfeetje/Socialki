import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { fetchFeedReducer } from "./reducers/postReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    fetchFeed: fetchFeedReducer,
    user: userLoginReducer,
});

const initialState = {};
const middleware = [thunk];

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
