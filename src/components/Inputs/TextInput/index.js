import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({ name, type, min, placeholder, onChange, size, classes, disabled, value, error }) => {
  return (
    <>
      <div className={`text-input ${classes} ${size} `}>
        <input type={type} name={name} id={name} onChange={onChange} required disabled={disabled} value={value} />
        <label htmlFor={name}>{placeholder}</label>
        <span className="error-msg">{error}</span>
      </div>
    </>
  );
};

TextInput.defaultProps = {
  placeholder: "",
  type: "text",
  onChange: null,
  size: "input-md",
  classes: "",
  disabled: false,
  value: undefined,
  error: ""
};

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
