import React, { useEffect, useRef, useState } from "react";

function CustomSelect({ options, onChangeSelected }) {
    const [selected, setSelected] = useState(0);
    const [opened, setOpened] = useState(false);

    const ref = useRef();

    const changeHandler = (i) => {
        onChangeSelected(options[i].value);
        setSelected(i);
        setOpened(false);
    };

    const renderOptions = options.map((option, i) => (
        <div className="select--option" onClick={(e) => changeHandler(i)}>
            <i className={option.icon}></i>
            <span>{option.text}</span>
        </div>
    ));

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                e.stopPropagation();
                setOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div ref={ref} className={`select ${opened ? "show" : ""}`}>
            <div
                className="select--preview"
                onClick={(e) => setOpened(!opened)}
            >
                <i className={options[selected].icon}></i>
                {/* <span>{options[selected].text}</span> */}
            </div>
            <div className={`select--options ${opened ? "show" : ""}`}>
                {renderOptions}
            </div>
        </div>
    );
}

export default CustomSelect;
