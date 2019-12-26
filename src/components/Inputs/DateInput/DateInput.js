import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

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

export default DateInput;
