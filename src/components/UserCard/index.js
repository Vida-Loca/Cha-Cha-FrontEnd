import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import "./UserCard.scss";

const UserCard = ({ username, imageUrl, isBanned, showControlls, clicked, children }) => {
  return (
    <div style={{ cursor: `${clicked ? "pointer" : "auto"}` }} className={`user-card-container ${isBanned ? "user-card-banned" : ""}`} onClick={clicked}>
      <div>
        {
          isBanned
          ? <i class="fas fa-ban" />
          : <Avatar imageLink={imageUrl} />
        }
        
        <strong>{username}</strong>
      </div>
      {showControlls ? <div className="controlls">{children}</div> : null}
    </div>
  );
};

UserCard.defaultProps = {
  imageUrl:"",
  showControlls: false,
  children: null,
  clicked: null
};

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  showControlls: PropTypes.bool,
  children: PropTypes.node,
  clicked: PropTypes.func
};

export default UserCard;
