import React from "react";
import PropTypes from "prop-types";
import "./OptionsInput.scss";

const OptionsInput = ({ options, name, disabled, onChange, value }) => {
    return (
        <div className="options-input input-md">
            <select value={value} onChange={onChange} name={name} disabled={disabled}>
                {options.map(el => {
                    return (<option key={el} value={el}>{el}</option>)
                })}
            </select>
        </div>)
}
OptionsInput.defaultProps = {
    disabled: false,
    onChange: () => { }
}

OptionsInput.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

export default OptionsInput;