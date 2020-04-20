import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { UserContext } from "../../context/UserContext";

import { eventService } from "../../Authentication/service";

import Spinner from "../../components/Spinner";

import Products from "./Products";
import Location from "./Location";
import Members from "./Members";
import MainPage from "./MainPage";
import Settings from "./Settings";

import "./Event.scss";

const Event = ({ eventId, eventPath }) => {

  const [eventInfo, setEventInfo] = useState({ name: "Loading...", type: "None" });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [hasAuthorization, setAuthorization] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let __isMounted = true;
    console.log("you are in event!!!!");

    let a = eventService.getEventByID(eventId);
    let b = eventService.isCurrentUserAdminOfEvent(eventId);


    Promise.all([a.catch(e => e), b.catch(e => e)])
      .then(res => {
        setEventInfo({ name: res[0].name, type: res[0].eventType });

        if (res[1].err !== undefined) {
          console.log("not from this event");
          setLoggedInUser({
            ...loggedInUser,
            eventAuth: {
              eventId: res[0].id,
              hasAuth: false,
              isAdmin: false
            }
          });
          setAuthorization(false);
        } else if (res[1] === false) {
          console.log("normal user");
          setLoggedInUser({
            ...loggedInUser,
            eventAuth: {
              eventId: res[0].id,
              hasAuth: true,
              isAdmin: false
            }
          });
          setAuthorization(true);
        } else if (res[1] === true) {
          console.log("this is Admin of the event")
          setLoggedInUser({
            ...loggedInUser,
            eventAuth: {
              eventId: res[0].id,
              hasAuth: true,
              isAdmin: true
            }
          });
          setAuthorization(true);
        } else {
          console.log("WTF");
          setLoggedInUser({
            ...loggedInUser,
            eventAuth: {
              eventId: res[0].id,
              hasAuth: false,
              isAdmin: false
            }
          });
          setAuthorization(false);
        }
      })
      .catch(err => console.log('Catch', err))
      .finally(() => {
        if (__isMounted) {
          setLoaded(true);
        }
      })


    return () => {
      __isMounted = false;
    };
  }, []);

  return (
    <div className="event-container">

      <h1 className="event-name">{eventInfo.name}</h1>
      <Route
        path={`${eventPath}/`}
        exact
        render={() => loaded ? <MainPage isAuth={hasAuthorization || loggedInUser.isAdmin}
          eventPath={eventPath} eventId={eventId} type={eventInfo.type} />
          : <Spinner />}
      />
      {(hasAuthorization || loggedInUser.isAdmin) ? (
        <>
          <Route path={`${eventPath}/products`} exact render={() => <Products id={eventId} />} />
          <Route path={`${eventPath}/location`} exact render={() => <Location id={eventId} />} />
          <Route path={`${eventPath}/members`} exact render={() => <Members eventType={eventInfo.type} eventId={eventId} />} />
          <Route path={`${eventPath}/settings`} exact render={() => <Settings eventId={eventId} />} />
        </>
      )
        : (
          <Route render={() => <Redirect to={`${eventPath.substring(0, eventPath.length - 4)}/${eventId}`} />} />
        )}
    </div>
  );
};

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired
};

export default Event;
