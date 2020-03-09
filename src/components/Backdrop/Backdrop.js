import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const Backdrop = ({ clicked }) => {
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  };

  return <div onClick={clicked} role="presentation" onKeyPress={handleKeyPress} className="backdrop"></div>;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
