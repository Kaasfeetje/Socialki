import React, { useState } from "react";

function Message({ text, icon, type }) {
    const [show, setShow] = useState(true);

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
