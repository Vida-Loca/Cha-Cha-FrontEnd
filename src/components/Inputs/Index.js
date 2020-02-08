import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";
// import "./TextInputDate.scss";
import "./EditInput.scss";

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

const EditInput = ({ name, placeholder, value, onChange }) => {
  return (
    <input
      className="EditInput"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      required
    />
  );
};

EditInput.defaultProps = {
  placeholder: ""
};

EditInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

const DateInput = ({ name, placeholder, onChange, type }) => {
  return (
    <div className="textInputt">
      <input type={type} name={name} onChange={onChange} required />
      <label>{placeholder}</label>
    </div>
  );
};

DateInput.defaultProps = {
  placeholder: "",
  type: "date"
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["date", "time"]),
  placeholder: PropTypes.string
};

export { TextInput, DateInput, EditInput };
