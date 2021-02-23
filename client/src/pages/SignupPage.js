import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActions";

import Form from "../components/Form";
import Header from "../components/Header";
import Message from "../components/Message";

function SignupPage({ history }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { signupError, signupSuccess } = user;

    useEffect(() => {
        if (signupSuccess) {
            history.push("/");
        }
    }, [history, signupSuccess]);

    const signupHandler = (e, values) => {
        e.preventDefault();

        dispatch(
            signup(
                values.email,
                values.username,
                values.password,
                values.password_confirm
            )
        );
    };

    return (
        <div>
            <Header />
            {signupError &&
                signupError.map((error) => (
                    <Message text={error.message} type="danger" />
                ))}
            <div className="container">
                <Form
                    fields={[
                        {
                            name: "Email",
                            id: "email",
                            type: "text",
                            icon: "fas fa-envelope",
                        },
                        {
                            name: "Username",
                            id: "username",
                            type: "text",
                            icon: "fas fa-user-circle",
                        },
                        {
                            name: "Password",
                            id: "password",
                            type: "password",
                            icon: "fas fa-key",
                        },
                        {
                            name: "Confirm Password",
                            id: "password_confirm",
                            type: "password",
                            icon: "fas fa-key",
                        },
                    ]}
                    submitText="Create Account"
                    onSubmit={signupHandler}
                    title="Create Account"
                />
            </div>
        </div>
    );
}

export default SignupPage;
