import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "../css/Modal.css";
function Modal({ opened, content, onDismiss }) {
    const [show, setShow] = useState(opened || true);
    const ref = useRef();

    useEffect(() => {
        setShow(opened);
    }, [opened]);

    return ReactDOM.createPortal(
        <div
            onClick={onDismiss}
            className={`modal--container ${show && "show"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                ref={ref}
                className={`modal `}
            >
                {content}
            </div>
        </div>,
        document.querySelector("#modal")
    );
}

export default Modal;
