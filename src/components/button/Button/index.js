import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const DefaultBtn = ({ classes, clicked, children }) => (
  <button className={classes} onClick={clicked}>
    {children}
  </button>
);

DefaultBtn.defaultProps = {
  clicked: null,
  classes: ""
};

DefaultBtn.propTypes = {
  clicked: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default DefaultBtn;
