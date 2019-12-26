import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const DateInput = ({ name, placeholder, onChange }) => {
  return (
    <div className="textInput">
      <input type="url" name={name} onChange={onChange} required />
      <label>{placeholder}</label>
    </div>
  );
};

DateInput.defaultProps = {
  placeholder: ""
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default DateInput;
