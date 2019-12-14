import React from "react";
import PropTypes from "prop-types";
import "./ShowMoreButton.scss";

const ShowMoreButton = ({ clicked, showState }) => {
  const changeArrow = () => {
    clicked();
  };

  return (
    <button onClick={changeArrow}>
      <i
        className={
          showState ? "fas fa-angle-right rotateArrow" : "fas fa-angle-right"
        }
      ></i>
    </button>
  );
};

ShowMoreButton.defaultProps = {
  clicked: () => {}
};

ShowMoreButton.propTypes = {
  clicked: PropTypes.func
};

export default ShowMoreButton;
