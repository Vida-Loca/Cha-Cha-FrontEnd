import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import "./UserCard.scss";

const UserCard = ({ username, imageUrl, showControlls, children }) => {
  return (
    <div className="UserTile">
      <div>
        <Avatar imageLink={imageUrl} />
        <strong>{username}</strong>
      </div>
      {showControlls ? <div className="controlls">{children}</div> : null}
    </div>
  );
};

UserCard.defaultProps = {
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s",
  showControlls: false,
  children: null
};

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  showControlls: PropTypes.bool,
  children: PropTypes.node
};

export default UserCard;
