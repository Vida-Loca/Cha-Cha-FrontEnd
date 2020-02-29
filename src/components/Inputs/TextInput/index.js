import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({
  name,
  type,
  placeholder,
  onChange,
  size,
  classes,
  disabled,
  value
}) => {
  return (
    <div className={`textInput ${classes} ${size} `}>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        required
        disabled={disabled}
        value={value}
        min={0}
        max={1000}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: "",
  type: "text",
  onChange: null,
  size: "input-md",
  classes: "",
  disabled: false,
  value: undefined
};

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  placeholder: PropTypes.string
};

export default TextInput;
