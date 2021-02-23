import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/Form";
import Header from "../components/Header";
import { signin } from "../actions/userActions";
import Message from "../components/Message";

function LoginPage({ history }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { loginError, loginSuccess } = user;

    const loginHandler = (e, values) => {
        e.preventDefault();

        dispatch(signin(values.username_email, values.password));
    };

    useEffect(() => {
        if (loginSuccess) {
            history.push("/");
        }
    }, [history, loginSuccess]);

    return (
        <div>
            <Header />
            {loginError &&
                loginError.map((error) => (
                    <Message text={error.message} type="danger" />
                ))}
            <div className="container">
                <Form
                    fields={[
                        {
                            name: "Username or Email",
                            id: "username_email",
                            type: "text",
                            icon: "fas fa-user-circle",
                        },
                        {
                            name: "Password",
                            id: "password",
                            type: "password",
                            icon: "fas fa-key",
                        },
                    ]}
                    submitText="Login"
                    onSubmit={loginHandler}
                    title="Login"
                />
            </div>
        </div>
    );
}

export default LoginPage;
