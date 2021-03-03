import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { history } from "../history";
import Loader from "./Loader";
function Logout() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { logoutSuccess } = user;

    useEffect(() => {
        dispatch(signout());
    }, [dispatch]);

    useEffect(() => {
        console.log("test", logoutSuccess);
        if (logoutSuccess) history.push("/login");
    }, [logoutSuccess]);

    return (
        <div>
            <Loader />
        </div>
    );
}

export default Logout;
