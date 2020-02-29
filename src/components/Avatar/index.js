import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ imageLink }) => {
  return <img src={imageLink} alt="AVATAR" />;
};

Avatar.defaultProps = {
  imageLink:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

Avatar.propTypes = {
  imageLink: PropTypes.string
};
export default Avatar;
