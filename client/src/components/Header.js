import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../css/Header.css";
function Header() {
    const [hover, setHover] = useState(null);

    const user = useSelector((state) => state.user);
    const { loading, error, userInfo } = user;

    const newPostHandler = () => {
        console.log("hello");
        alert("NEW POST");
    };

    return (
        <header>
            <div className="container">
                <div>
                    <Link to="/">
                        <h2>Socialki</h2>
                    </Link>
                </div>
                <nav>
                    {userInfo ? (
                        <ul>
                            <li
                                className="nav-item"
                                onMouseEnter={(e) => setHover(0)}
                                onMouseLeave={(e) => setHover(null)}
                            >
                                <Link to="/">
                                    <i className="fas fa-home"></i>
                                    <div
                                        className={`${
                                            hover === 0 ? "show" : ""
                                        }`}
                                    >
                                        Home
                                    </div>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                onMouseEnter={(e) => setHover(1)}
                                onMouseLeave={(e) => setHover(null)}
                            >
                                <button onClick={newPostHandler}>
                                    <i class="fas fa-plus-circle"></i>
                                    <div
                                        className={`${
                                            hover === 1 ? "show" : ""
                                        }`}
                                    >
                                        New Post
                                    </div>
                                </button>
                            </li>

                            <li
                                className="nav-item"
                                onMouseEnter={(e) => setHover(2)}
                                onMouseLeave={(e) => setHover(null)}
                            >
                                <Link to="/explore">
                                    <i className="fas fa-search"></i>
                                    <div
                                        className={`${
                                            hover === 2 ? "show" : ""
                                        }`}
                                    >
                                        Explore
                                    </div>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                onMouseEnter={(e) => setHover(3)}
                                onMouseLeave={(e) => setHover(null)}
                            >
                                <Link to="/profile">
                                    <i className="fas fa-user-circle"></i>
                                    <div
                                        className={`${
                                            hover === 3 ? "show" : ""
                                        }`}
                                    >
                                        Profile
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li className="nav-item">
                                <Link to="/login" className="btn">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/signup"
                                    className="btn btn-secondary"
                                >
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
