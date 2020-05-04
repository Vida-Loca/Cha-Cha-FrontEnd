import React from "react";
import PropTypes from "prop-types";
import "./ShowMore.scss";

const ShowMoreButton = ({ clicked, showState }) => {
  return (
    <button onClick={clicked}>
      <i className={showState ? "fas fa-angle-right rotateArrow showMoreArrow" : "fas fa-angle-right showMoreArrow"} />
    </button>
  );
};

ShowMoreButton.defaultProps = {
  clicked: null
};

ShowMoreButton.propTypes = {
  clicked: PropTypes.func,
  showState: PropTypes.bool.isRequired
};

export default ShowMoreButton;
