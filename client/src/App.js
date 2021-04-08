import { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { history } from "./history";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getMe } from "./actions/userActions";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import SocialkiPage from "./pages/SocialkiPage";
import Logout from "./components/Logout";
import SearchPage from "./pages/SearchPage";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <Router history={history}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/search/:keyword" component={SearchPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/:user" component={ProfilePage} />
            <Route exact path="/post/:id" component={SocialkiPage} />
            <Route exact path="/" component={HomePage} />
        </Router>
    );
}

export default App;
