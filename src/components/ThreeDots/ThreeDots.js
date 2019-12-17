import React from "react";
import PropTypes from "prop-types";

const ThreeDots = ({ clicked }) => (
  <button onClick={clicked}>
    <i className="fas fa-ellipsis-v" />
  </button>
);

ThreeDots.defaultProps = {
  clicked: () => {}
};

ThreeDots.propTypes = {
  clicked: PropTypes.func
};

export default ThreeDots;
