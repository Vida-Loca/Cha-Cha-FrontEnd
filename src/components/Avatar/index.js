import React from "react";
import PropTypes from "prop-types";
import "./avatar.scss";

const Avatar = ({ imageLink, title }) => {
  const avatarURL = imageLink === "" ? "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png" : imageLink;
  return <img className="avatar" title={title} src={avatarURL} alt="AVATAR" />;
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
