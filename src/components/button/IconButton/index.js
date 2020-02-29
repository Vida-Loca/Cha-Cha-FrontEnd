import React from "react";
import PropTypes from "prop-types";

const IconButton = ({ iconClass, clicked }) => (
  <button onClick={clicked}>
    <i className={`${iconClass} buttonIcon`} />
  </button>
);

IconButton.defaultProps = {
  clicked: null,
  iconClass: ""
};

IconButton.propTypes = {
  clicked: PropTypes.func,
  iconClass: PropTypes.string
};

export default IconButton;
