/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "../../../components/Button";
import { eventService, profileService } from "../../../Authentication/service";
import { history } from "../../../Authentication/helper";
import Spinner from "../../../components/Spinner";

import "./MainPage.scss";

const MainPage = ({
  eventPath, eventId, isAuth, type,
}) => {
  const [userStatus, setUserStatus] = useState(2);
  const [invitationId, setInvitationId] = useState("");
  const [actionComplete, setactionComplete] = useState(false);

  useEffect(() => {
    let __isMounted = true;
    profileService.getEventInvitations()
      .then((res) => {
        const found = res === []
          ? false : res.find((el) => el.event.id.toString() === eventId.toString());
        if (found) {
          // if found invitation for this event
          if (__isMounted) {
            setInvitationId(found.id);
            setUserStatus(1);
          }
        } else if (type === "PUBLIC") {
          // if invitation is not found - check if event is Public
          if (__isMounted) {
            setUserStatus(2);
          }
        } else if (type === "NORMAL" || type === "PRIVATE") {
          // if invitation is not fund check if event is Normal or Private
          if (__isMounted) {
            setUserStatus(3);
          }
          // None of the above -return error page
        } else if (__isMounted) {
          setUserStatus(4);
        }
      })
      .catch(() => {});

    return () => {
      __isMounted = false;
    };
  }, [eventId, type]);

  const joinCurrentEvent = () => {
    setactionComplete(true);
    eventService.joinEvent(eventId)
      .then(() => {
        history.go(0);
        setactionComplete(false);
      }, () => {
        setactionComplete(false);
      });
  };
  const requestToJoinEvent = () => {
    setactionComplete(true);
    eventService.sendRequestToJoinEvent(eventId)
      .then(() => {
        history.push("/");
        setactionComplete(false);
      }, () => {
        setactionComplete(false);
      });
  };
  const acceptInvitationToEvent = () => {
    eventService.acceptEventInvitation(invitationId)
      .then((res) => {
        console.log("res: ", res);
        history.go(0);
      }, (err) => {
        console.log("err:", err);
      });
  };
  const rejectInvitationToEvent = () => {
    eventService.rejectEventInvitation(invitationId)
      .then((res) => {
        console.log("res: ", res);
        history.push("/");
      }, (err) => {
        console.log("err:", err);
      });
  };

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
            <h2>This event is public so join us</h2>
            {
              actionComplete
                ? <Spinner size="spinner-sm" classes="spinner-container-h-sm" />
                : <Button clicked={joinCurrentEvent} classes="btn-blueGradient btn-md">join event</Button>
            }
          </>
        );
      case 3:
        return (
          <>
            <h2>Request to join this event</h2>
            {
              actionComplete
                ? <Spinner size="spinner-sm" classes="spinner-container-h-sm" />
                : <Button clicked={requestToJoinEvent} classes="btn-blueGradient btn-md">send request</Button>
            }

          </>
        );

      default:
        return (
          <>
            <h1>Error - 403</h1>
            <h3>you are not authorized to join this event</h3>
          </>
        );
    }
  };

  return isAuth ? (
    <Redirect to={`${eventPath.substring(0, eventPath.length - 4)}/${eventId}/products`} />
  ) : (
    <div className="MainPage">{conditionalRender()}</div>
  );
};

MainPage.propTypes = {
  type: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default MainPage;
