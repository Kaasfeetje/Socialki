import React from "react";

function Avatar({ image, width, height, fluid }) {
    return (
        <img
            className={`avatar ${fluid && "fluid"}`}
            src={image}
            alt="Profile avatar"
            width={width}
            height={height}
        ></img>
    );
}

export default Avatar;
