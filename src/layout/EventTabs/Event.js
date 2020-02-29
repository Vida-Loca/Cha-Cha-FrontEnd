import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./Event.scss";

// import { userService } from "../../Authentication/service";

import Supply from "./Supply";
import Location from "./Location";
import Members from "./Members";
import MainPage from "./MainPage";

const Event = ({ eventId, eventPath }) => {
  // check if user is a part of this event
  //  * if not redirect to /:id page
  //  * else leave him be
  const eventName = useState("")[0];
  const [hasAuthorization, setAuthorization] = useState(true);

  useEffect(() => {
    //   userService
    //     .getEventById(this.props.eventId)
    //     .then(body => {
    //       return body;
    //     })
    //     .then(res => {
    //       setEventName(res.name );
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    return () => {};
  }, []);

  return (
    <>
      <h1 className="EventName">{eventName}</h1>
      <Route
        path={`${eventPath}/`}
        exact
        render={() => (
          <MainPage
            isAuth={hasAuthorization}
            eventPath={eventPath}
            id={eventId}
          />
        )}
      />
      {!hasAuthorization ? (
        <Route
          path={`${eventPath}/*`}
          exact
          render={() => (
            <Redirect
              to={`${eventPath.substring(0, eventPath.length - 4)}/${eventId}`}
            />
          )}
        />
      ) : (
        <>
          <Route
            path={`${eventPath}/suplies`}
            exact
            render={() => <Supply id={eventId} />}
          />
          <Route
            path={`${eventPath}/location`}
            exact
            render={() => <Location id={eventId} />}
          />
          <Route
            path={`${eventPath}/members`}
            exact
            render={() => <Members id={eventId} />}
          />
        </>
      )}
    </>
  );
};

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired
};

export default Event;
