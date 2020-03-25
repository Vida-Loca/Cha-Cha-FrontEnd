import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "../../../components/Button";

import "./MainPage.scss";

const MainPage = ({ eventPath, id, isAuth }) => {
  // fetch current logged in user

  // cheeck if got invitations
  //  * if yes buttons "accept" or "decline" apears

  // if event is public button "join apears"

  // if none of the above requirements are met dislpay error page

  const [userStatus,] = useState(2);

  const conditionalRender = () => {
    switch (userStatus) {
      case 1:
        return (
          <>
            <h2>You have been invited to attend this event</h2>
            <div className="accept-decline-box">
              <Button classes="btn-blueGradient btn-md">accept</Button>
              <Button classes="btn-orangeGradient btn-md">decline</Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>This event is public so please join us</h2>
            <Button classes="btn-blueGradient btn-md">join event</Button>
          </>
        );

      default:
        return <h1>Error Page</h1>;
    }
  };

  return isAuth ? (
    <Redirect to={`${eventPath.substring(0, eventPath.length - 4)}/${id}/products`} />
  ) : (
      <div className="MainPage">{conditionalRender()}</div>
    );
};

MainPage.propTypes = {
  eventPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default MainPage;
