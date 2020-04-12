import React, { useState } from "react";
import PropTypes from "prop-types";
import "./avatar.scss";

const Avatar = ({ imageLink, title }) => {

  const [failue, setFailure] = useState(false);

  const fallback = () => {
    setFailure(true);
  }

  return (
    <>
      {failue
        ? <img className="avatar" title={title} alt="avatar" src="/default-avatar.png" />
        : <img className="avatar" title={title} alt="avatar" src={imageLink} onError={fallback} />}
    </>
  )
};

Avatar.defaultProps = {
  title: "",
  imageLink: ""
};

Avatar.propTypes = {
  title: PropTypes.string,
  imageLink: PropTypes.string
};
export default Avatar;
