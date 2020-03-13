import React from "react";
import PropTypes from "prop-types";
import "./OptionsInput.scss";

const OptionsInput = ({ options, name, disabled }) => {
    return (
        <div className="options-input input-md">
            <select name={name} disabled={disabled}>
                {options.map(el => {
                    return (<option value={el}>{el}</option>)
                })}
            </select>
        </div>)
}
OptionsInput.defaultProps = {
    disabled: false
}

OptionsInput.propTypes = {
    options: PropTypes.objectOf(Array).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

export default OptionsInput;