import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../css/Header.css";
import Modal from "./Modal";
import CreateSocialki from "./CreateSocialki";
import Avatar from "./Avatar";
function Header() {
    const [hover, setHover] = useState(null);
    const [newPostOpened, setNewPostOpened] = useState(false);

    const user = useSelector((state) => state.user);
    const { userInfo } = user;

    return (
        <header>
            <Modal
                opened={newPostOpened}
                onDismiss={() => setNewPostOpened(false)}
                content={
                    <CreateSocialki onSuccess={() => setNewPostOpened(false)} />
                }
            />

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
                                <button
                                    onClick={(e) =>
                                        setNewPostOpened(!newPostOpened)
                                    }
                                >
                                    <i className="fas fa-plus-circle"></i>
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
                                className="nav-item profileImage"
                                onMouseEnter={(e) => setHover(3)}
                                onMouseLeave={(e) => setHover(null)}
                            >
                                <Link to="/profile">
                                    <Avatar
                                        image={
                                            // "http://localhost:5000/uploads/default.jpg"
                                            userInfo.profileImage
                                        }
                                        width="50px"
                                        height="50px"
                                    />
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
