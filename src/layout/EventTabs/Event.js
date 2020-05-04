import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";


import { eventService } from "../../Authentication/service";

import Spinner from "../../components/Spinner";

import Products from "./Products";
import Location from "./Location";
import Members from "./Members";
import MainPage from "./MainPage";
import Settings from "./Settings";
import Forum from "./Forum";

import "./Event.scss";

const Event = ({ eventId, eventPath }) => {

  const [eventInfo, setEventInfo] = useState({ name: "Loading...", type: "None" });

  const [hasAuthorization, setAuthorization] = useState({auth:false, isEventAdmin: false});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let __isMounted = true;

    let a = eventService.getEventByID(eventId);
    let b = eventService.isCurrentUserAdminOfEvent(eventId);

    Promise.all([a.catch(e => e), b.catch(e => e)])
      .then(res => {
        setEventInfo({ name: res[0].name, type: res[0].eventType, currency: res[0].currency });

        if (res[1].err !== undefined) {
          // user is not a part of this event
          setAuthorization({auth:false, isEventAdmin: false});
        }  else {
          // user is a part of this event
          setAuthorization({auth:true, isEventAdmin: res[1]});
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
        render={() => loaded ? <MainPage isAuth={hasAuthorization.auth}
          eventPath={eventPath} eventId={eventId} type={eventInfo.type} />
          : <Spinner />}
      />
      {
        hasAuthorization.auth ? (
          <>
            <Route path={`${eventPath}/products`} exact render={() => <Products eventId={eventId} isEventAdmin={hasAuthorization.isEventAdmin} currency={eventInfo.currency} />} />
            <Route path={`${eventPath}/location`} exact render={() => <Location eventId={eventId} isEventAdmin={hasAuthorization.isEventAdmin} />} />
            <Route path={`${eventPath}/members`} exact render={() => <Members eventType={eventInfo.type} eventId={eventId} isEventAdmin={hasAuthorization.isEventAdmin} />} />
            <Route path={`${eventPath}/forum`} exact render={() => <Forum eventId={eventId} isEventAdmin={hasAuthorization.isEventAdmin} />} />
            <Route path={`${eventPath}/settings`} exact render={() => <Settings eventId={eventId} isEventAdmin={hasAuthorization.isEventAdmin} />} />
          </>
        )
          : (
            <Route render={() => <Redirect to={`${eventPath.substring(0, eventPath.length - 4)}/${eventId}`} />} />
          )
      }
    </div>
  );
};

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventPath: PropTypes.string.isRequired
};

export default Event;
