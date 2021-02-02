import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";
function Header() {
    const [hover, setHover] = useState(null);

    return (
        <header>
            <div className="container">
                <div>
                    <Link to="/">
                        <h2>Socialki</h2>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li
                            className="nav-item"
                            onMouseEnter={(e) => setHover(0)}
                            onMouseLeave={(e) => setHover(null)}
                        >
                            <Link to="/">
                                <i className="fas fa-home"></i>
                                <div className={`${hover === 0 ? "show" : ""}`}>
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            onMouseEnter={(e) => setHover(1)}
                            onMouseLeave={(e) => setHover(null)}
                        >
                            <Link to="/explore">
                                <i className="fas fa-search"></i>
                                <div className={`${hover === 1 ? "show" : ""}`}>
                                    Explore
                                </div>
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            onMouseEnter={(e) => setHover(2)}
                            onMouseLeave={(e) => setHover(null)}
                        >
                            <Link to="/profile">
                                <i class="fas fa-user-circle"></i>
                                <div className={`${hover === 2 ? "show" : ""}`}>
                                    Profile
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
