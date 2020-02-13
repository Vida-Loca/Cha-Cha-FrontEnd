import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import "./Event.scss";

// import { userService } from "../../Authentication/service";

import Supply from "./Supply/Supply";
import Location from "./Location/Location";
import Members from "./Members/Members";

const Event = ({ eventId, eventPath }) => {
  const eventName = useState("")[0];

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
    <div>
      <h1 className="EventName">{eventName}</h1>
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
    </div>
  );
};

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired
};

export default Event;
