import React from "react";
import PropTypes from "prop-types";
import "./EditInput.scss";

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
  placeholder: "",
  value: null,
  onChange: null
};

EditInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export default EditInput;
