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
  placeholder: ""
};

EditInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default EditInput;
