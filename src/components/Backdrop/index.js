import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const Backdrop = ({ clicked }) => {


  return <div onClick={clicked} role="presentation" className="backdrop"></div>;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
