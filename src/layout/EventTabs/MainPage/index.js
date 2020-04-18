import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "../../../components/Button";
import { eventService, profileService } from "../../../Authentication/service";
import { history } from "../../../Authentication/helper";

import "./MainPage.scss";

const MainPage = ({ eventPath, id, isAuth, type }) => {
  // fetch current logged in user

  // cheeck if got invitations
  //  * if yes buttons "accept" or "decline" apears

  // if event is public button "join apears"

  // if none of the above requirements are met dislpay error page

  const [userStatus, setUserStatus] = useState(2);
  const [invitationId, setInvitationId] = useState("");

  useEffect(() => {
    let __isMounted = true;
    profileService.getEventInvitations()
      .then(res => {
        const found = res.find(el => el.event.id.toString() === id.toString());
        setInvitationId(found.id);
        if (found) {
          setUserStatus(1);
        } else if (type === "PUBLIC") {
          setUserStatus(2);
        } else {
          setUserStatus(3);
        }
      }
        , err => {
          console.log(err);
        });

    return () => {
      __isMounted = false;
    };
  }, [])

  const joinCurrentEvent = () => {

    eventService.joinEvent(id)
      .then(res => {
        console.log(res);
        history.go(0);
      }, err => {
        console.log(err);
      })
  }
  const acceptInvitationToEvent = () => {
    eventService.acceptEventInvitation(invitationId)
      .then(res => {
        console.log(res);
        history.go(0);
      }, err => {
        console.log(err);
      })
  }
  const rejectInvitationToEvent = () => {
    eventService.rejectEventInvitation(invitationId)
      .then(res => {
        console.log(res);
        history.go(0);
      }, err => {
        console.log(err);
      })
  }

  const conditionalRender = () => {
    switch (userStatus) {
      case 1:
        return (
          <>
            <h2>You have been invited to attend this event</h2>
            <div className="accept-decline-box">
              <Button clicked={acceptInvitationToEvent} classes="btn-blueGradient btn-md">accept</Button>
              <Button clicked={rejectInvitationToEvent} classes="btn-orangeGradient btn-md">decline</Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>This event is public so please join us</h2>
            <Button clicked={joinCurrentEvent} classes="btn-blueGradient btn-md">join event</Button>
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
