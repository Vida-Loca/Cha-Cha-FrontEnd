import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ classes, clicked, children }) => (
  <button className={classes} onClick={clicked}>
    {children}
  </button>
);

Button.defaultProps = {
  clicked: () => {},
  classes: ""
};

Button.propTypes = {
  clicked: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;
