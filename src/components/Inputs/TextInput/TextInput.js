import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({ name, type, placeholder, onChange }) => {
  return (
    <div className="textInput">
      <input type={type} name={name} onChange={onChange} required />
      <label>{placeholder}</label>
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: "",
  type: "text"
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  placeholder: PropTypes.string
};

export default TextInput;
