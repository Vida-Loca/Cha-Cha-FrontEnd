import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({ name, placeholder, onChange }) => {
  return (
    <div className="textInput">
      <input type="text" name={name} onChange={onChange} required />
      <label>{placeholder}</label>
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: ""
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default TextInput;
