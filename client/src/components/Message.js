import React, { useEffect, useState } from "react";

function Message({ text, icon, type }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`message ${show && "show"} ${type && "danger"}`}>
            <span>{text}</span>
            {icon && <i className={icon} />}
            <button type="button" onClick={() => setShow(false)}>
                X
            </button>
        </div>
    );
}

export default Message;
