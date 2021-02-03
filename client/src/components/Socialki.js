import React from "react";

import "../css/Socialki.css";
function Socialki({ socialki }) {
    return (
        <div className="socialki">
            <div className="socialki--actions">
                <i className={`fa${socialki.liked ? "s" : "r"} fa-heart`}></i>
                <i className="far fa-comments"></i>
                <i className="fas fa-retweet"></i>
                <i className="fas fa-share"></i>
            </div>
            <div className="socialki--main">
                <div className="socialki--body">
                    {socialki.image && (
                        <img
                            className="image"
                            src={socialki.image}
                            alt={socialki.description}
                        />
                    )}
                    {socialki.description && <p>{socialki.description}</p>}
                </div>
                <div className="socialki--user">
                    <span>@{socialki.user.username}</span> -
                    <i className="far fa-user-circle"></i>
                </div>
            </div>
        </div>
    );
}

export default Socialki;
