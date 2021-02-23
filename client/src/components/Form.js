import React, { useEffect, useState } from "react";

import "../css/Form.css";
function Form({ fields, submitText, onSubmit, title }) {
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (values) return;
        const state = {};
        for (let i = 0; i < fields.length; i++) {
            state[fields[i].id] = "";
        }
        setValues(state);
    }, [fields, values]);

    const onChangeHandler = (e, field) => {
        const tempValues = values;
        tempValues[field.id] = e.target.value;

        setValues(tempValues);
    };

    const renderFields = fields.map((field) => (
        <div className="form-item" key={field.id}>
            <i className={field.icon}></i>
            <input
                onChange={(e) => onChangeHandler(e, field)}
                id={field.id}
                type={field.type}
                placeholder={field.name}
            ></input>
        </div>
    ));

    return (
        <form onSubmit={(e) => onSubmit(e, values)} className="form--container">
            <h2>{title}</h2>
            {renderFields}
            <button type="submit">{submitText}</button>
        </form>
    );
}

export default Form;
