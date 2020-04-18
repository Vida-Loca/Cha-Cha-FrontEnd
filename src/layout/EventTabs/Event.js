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
  const [eventInfo, setEventInfo] = useState({ name: "Loading...", type: "2" });
  const [hasAuthorization, setAuthorization] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getEventInfo = async () => {
    await eventService.getEventByID(eventId)
      .then(res => {
        setEventInfo({ name: res.name, type: res.eventType });
      }).catch(err => {
        console.log(err);
      })
    await eventService.getEventPendingInvitations(eventId)
      .then(res => {
        setAuthorization(true);
      }, err => {
        setAuthorization(false);
      });
    setLoaded(true);
  }

  useEffect(() => {
    let __isMounted = true;
    // eventService.getEventByID(eventId)
    //   .then(res => {
    //     if (__isMounted) {
    //       setEventInfo({ name: res.name, type: res.eventType });
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })

    // eventService.getEventPendingInvitations(eventId)
    //   .then(res => {
    //     setAuthorization(true);
    //   }, err => {
    //     setAuthorization(false);
    //   })
    getEventInfo();

    return () => {
      __isMounted = false;
    };
  }, [eventId]);

  return (
    <div className="event-container">

      <h1 className="event-name">{eventInfo.name}</h1>
      <Route
        path={`${eventPath}/`}
        exact
        render={() => loaded && <MainPage isAuth={hasAuthorization} eventPath={eventPath} id={eventId} type={eventInfo.type} />}
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
