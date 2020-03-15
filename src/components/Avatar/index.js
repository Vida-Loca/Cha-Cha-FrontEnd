import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ imageLink, title }) => {
  return <img title={title} src={imageLink} alt="AVATAR" />;
};

Avatar.defaultProps = {
  title: "",
  imageLink:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

Avatar.propTypes = {
  title: PropTypes.string,
  imageLink: PropTypes.string
};
export default Avatar;
