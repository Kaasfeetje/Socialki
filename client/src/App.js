import { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { history } from "./history";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getMe } from "./actions/userActions";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <Router history={history}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/" component={HomePage} />
        </Router>
    );
}

export default App;
