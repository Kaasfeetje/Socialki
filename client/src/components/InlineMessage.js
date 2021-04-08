import React, { useState } from "react";

function InlineMessage({ icon, text, type }) {
    const [show, setShow] = useState(true);

    return (
        <div className={`inline-message ${show && "show"} ${type && "danger"}`}>
            <span>{text}</span>
            {icon && <i className={icon} />}
            <button type="button" onClick={() => setShow(false)}>
                X
            </button>
        </div>
    );
}

export default InlineMessage;
