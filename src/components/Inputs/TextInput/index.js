import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({ name, type, placeholder, onChange }) => {
  return (
    <div className="textInput">
      <input type={type} name={name} id={name} onChange={onChange} required />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: "",
  type: "text",
  onChange: null
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  placeholder: PropTypes.string
};

export default TextInput;
