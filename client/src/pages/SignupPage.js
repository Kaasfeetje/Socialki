import React from "react";
import { useDispatch } from "react-redux";
import { signup } from "../actions/userActions";

import Form from "../components/Form";
import Header from "../components/Header";

function SignupPage() {
    const dispatch = useDispatch();

    const signupHandler = (e, values) => {
        e.preventDefault();
        if (values.password === values.password_confirm) {
            console.log(values);
            dispatch(signup(values.email, values.username, values.password));
            //TODO: Redirect if successful
        } else {
            //TODO: Handle this and other form errors
        }
    };

    return (
        <div>
            <Header />
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
