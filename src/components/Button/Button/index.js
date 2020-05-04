import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ classes, clicked, children, dissabled }) => (
  <button className={classes} onClick={clicked} disabled={dissabled}>
    {children}
  </button>
);

Button.defaultProps = {
  clicked: null,
  classes: "",
  dissabled: false
};

Button.propTypes = {
  dissabled: PropTypes.bool,
  clicked: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;
