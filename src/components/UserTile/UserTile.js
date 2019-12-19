import React from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import Avatar from "../Avatar/Avatar";
import "./UserTile.scss";

const UserTile = ({ username, buttonClass, buttonName }) => {
  return (
    <div className="UserTile">
      <div>
        <Avatar imageLink="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg" />
        <strong>{username}</strong>
      </div>
      <Button classes={buttonClass}>{buttonName}</Button>
    </div>
  );
};

UserTile.propType = {
  username: PropTypes.string.isRequired
};

export default UserTile;
