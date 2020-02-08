import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ classes, clicked, children }) => (
  <button className={classes} onClick={clicked}>
    {children}
  </button>
);

const IconButton = ({ iconClass, clicked }) => (
  <button onClick={clicked}>
    <i className={`${iconClass} buttonIcon`} />
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

IconButton.defaultProps = {
  clicked: () => {},
  iconClass: ""
};

IconButton.propTypes = {
  clicked: PropTypes.func,
  iconClass: PropTypes.string
};

export { Button, IconButton };
