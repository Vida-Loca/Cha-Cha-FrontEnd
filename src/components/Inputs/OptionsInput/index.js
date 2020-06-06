import React from "react";
import PropTypes from "prop-types";
import "./OptionsInput.scss";

const OptionsInput = ({
  classes, options, name, disabled, onChange, value,
}) => (
  <div className={`options-input ${classes}`}>
    <select value={value} onChange={onChange} name={name} disabled={disabled}>
      {options.map((el) => (<option key={el} value={el}>{el}</option>))}
    </select>
  </div>
);
OptionsInput.defaultProps = {
  disabled: false,
  onChange: () => { },
  classes: "",
};

OptionsInput.propTypes = {
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default OptionsInput;
