import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const DefaultBtn = ({ classes, clicked, children, dissabled }) => (
  <button className={classes} onClick={clicked} disabled={dissabled}>
    {children}
  </button>
);

DefaultBtn.defaultProps = {
  clicked: null,
  classes: "",
  dissabled: false
};

DefaultBtn.propTypes = {
  dissabled: PropTypes.bool,
  clicked: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default DefaultBtn;
