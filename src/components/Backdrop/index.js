import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const Backdrop = ({ show, clicked }) => {


  return <div onClick={clicked} role="presentation" className={show ? "backdrop backdrop-open" : "backdrop"}></div>;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
