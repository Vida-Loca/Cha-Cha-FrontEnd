import React from "react";
import PropTypes from "prop-types";
import "./TextArea.scss";

const TextArea = ({ name, onChange, disabled, value, placeholder }) => {
  return <textarea onChange={onChange} name={name} disabled={disabled} className="resizable-ta" value={value} placeholder={placeholder} />;
};

TextArea.defaultProps = {
  onChange: null,
  disabled: false,
  placeholder: ""
};

TextArea.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  placeholder: PropTypes.string
};

export default TextArea;
