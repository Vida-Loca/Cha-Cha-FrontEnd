import React from "react";
import PropTypes from "prop-types";
import "./RadioInput.scss";

const RadioInput = ({ name, id, label, onChange, classes, disabled, checked }) => {
    return (
        <>
            <div className={`radio-input ${classes}`}>
                <input type="radio" name={name} id={id} onChange={onChange} required disabled={disabled} checked={checked} />
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    );
};

RadioInput.defaultProps = {
    label: "",
    onChange: null,
    classes: "",
    disabled: false,
    checked: false
};

RadioInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool

};

export default RadioInput;
