import { Router, Route } from "react-router-dom";
import { history } from "./history";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router history={history}>
            <Route exact path="/" component={HomePage} />
        </Router>
    );
}

export default App;
