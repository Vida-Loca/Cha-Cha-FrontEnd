import React from "react";
import PropTypes from "prop-types";
import "./spinner.scss";

const Spinner = ({ classes, size }) => (
  <div className={`loader-container ${classes}`}>
    <div className={`loader ${size}`}>Loading...</div>
  </div>
);

Spinner.defaultProps = {
  classes: "",
  size: "",
};

Spinner.propTypes = {
  classes: PropTypes.string,
  size: PropTypes.string,
};

export default Spinner;
