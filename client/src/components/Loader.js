import React, { useEffect, useRef } from "react";

function Loader({ size, color }) {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            if (size) ref.current.style.setProperty("--spinner-width", size);
            if (color) ref.current.style.setProperty("--spinner-color", color);
        }
    }, [ref, size, color]);

    return (
        <div ref={ref} className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Loader;
