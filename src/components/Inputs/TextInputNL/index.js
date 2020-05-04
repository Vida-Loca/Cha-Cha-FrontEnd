import React from "react";
import PropTypes from "prop-types";
import "./EditInput.scss";

const TextInputNL = ({ name, type, onChange, size, disabled, value, classes }) => {

  return (
    <input
      className={`Text-Input-NL ${classes} ${size} `}
      type={type}
      name={name}
      onChange={onChange}
      required
      disabled={disabled}
      value={value}
    />
  );
};

TextInputNL.defaultProps = {
  type: "text",
  onChange: null,
  size: "",
  disabled: false,
  value: undefined,
  classes: ""
};

TextInputNL.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  classes: PropTypes.string
};

export default TextInputNL;
