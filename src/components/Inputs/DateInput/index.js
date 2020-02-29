import React from "react";
import PropTypes from "prop-types";
import "./TextInputDate.scss";

const DateInput = ({ name, placeholder, onChange, type }) => {
  return (
    <div className="textInputt">
      <input type={type} name={name} id={name} onChange={onChange} required />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
};

DateInput.defaultProps = {
  placeholder: "",
  type: "date",
  onChange: null
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["date", "time"]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default DateInput;
