import React from "react";
import { useDispatch } from "react-redux";

import Form from "../components/Form";
import Header from "../components/Header";
import { signin } from "../actions/userActions";

function LoginPage() {
    const dispatch = useDispatch();

    const loginHandler = (e, values) => {
        e.preventDefault();

        dispatch(signin(values.username_email, values.password));
    };

    return (
        <div>
            <Header />
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
