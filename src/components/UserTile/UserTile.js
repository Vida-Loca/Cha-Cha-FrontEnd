import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button/Index";
import Avatar from "../Avatar/Avatar";
import "./UserTile.scss";

import { userService } from "../../Authentication/service";

const UserTile = ({
  username,
  userId,
  buttonClass,
  buttonName,
  isAdmin,
  eventId
}) => {
  const kickUser = UserId => {
    userService
      .kickUserTOEvent(eventId, userId)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(`kick this guy: ${UserId}`);
  };
  return (
    <div className="UserTile">
      <div>
        <Avatar imageLink="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg" />
        <strong>{username}</strong>
      </div>
      {isAdmin ? (
        <Button clicked={() => kickUser(userId)} classes={buttonClass}>
          {buttonName}
        </Button>
      ) : null}
    </div>
  );
};

UserTile.defaultProps = {
  buttonClass: ""
};

UserTile.propTypes = {
  username: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  buttonName: PropTypes.string.isRequired
};

export default UserTile;
