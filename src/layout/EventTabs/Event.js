import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./Event.scss";

import { eventService } from "../../Authentication/service";

import Products from "./Products";
import Location from "./Location";
import Members from "./Members";
import MainPage from "./MainPage";
import Settings from "./Settings";

const Event = ({ eventId, eventPath }) => {
  // check if user is a part of this event
  //  * if not redirect to /:id page
  //  * else leave him be
  const [eventName, setEventName] = useState("Loading...");
  const [hasAuthorization,] = useState(true);

  useEffect(() => {
    let __isMounted = true;
    eventService.getEventByID(eventId)
      .then(res => {
        if (__isMounted) {
          setEventName(res.name);
        }
      }).catch(err => {
        console.log(err);
      })
    return () => {
      __isMounted = false;
    };
  }, []);

  return (
    <div className="event-container">
      <h1 className="event-name">{eventName}</h1>
      <Route
        path={`${eventPath}/`}
        exact
        render={() => <MainPage isAuth={hasAuthorization} eventPath={eventPath} id={eventId} />}
      />
      {!hasAuthorization ? (
        <Route
          path={`${eventPath}/*`} exact
          render={() => <Redirect to={`${eventPath.substring(0, eventPath.length - 4)}/${eventId}`} />}
        />
      ) : (
          <>
            <Route path={`${eventPath}/products`} exact render={() => <Products id={eventId} />} />
            <Route path={`${eventPath}/location`} exact render={() => <Location id={eventId} />} />
            <Route path={`${eventPath}/members`} exact render={() => <Members id={eventId} />} />
            <Route path={`${eventPath}/settings`} exact render={() => <Settings id={eventId} />} />
          </>
        )}
    </div>
  );
};

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired
};

export default Event;
