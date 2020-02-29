import React from "react";
import PropTypes from "prop-types";
import "./TextArea.scss";

const TextArea = ({ name, onChange, disabled, value }) => {
  return (
    <textarea
      onChange={onChange}
      name={name}
      disabled={disabled}
      className="resizable-ta"
      value={value}
    />
  );
};

TextArea.defaultProps = {
  onChange: null,
  disabled: false
};

TextArea.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired
};

export default TextArea;
