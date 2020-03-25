import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../context/FormContext";

import { events } from "../../mockData";
// import { userService } from "../../Authentication/service";

import "./Home.scss";
import CreateEventContainer from "./CreateEventContainer";
import SearchFriends from "./FriendsSearch";

import { Button } from "../../components/Button";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [publicEventsList, setPublicEventsList] = useState({ events: [], spinner: true });
  const [friendsEventsList, setFriendsEventsList] = useState({ events: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;
    setTimeout(() => {
      if (__isMounted) {
        setPublicEventsList({ events: events, spinner: false });
        setFriendsEventsList({ events: events, spinner: false });
      }
    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  const setform = useContext(FormContext)[1];
  const createNewEventModal = () => {
    setform({ show: true, renderForm: <CreateEventContainer /> });
  };
  const friendSearchModal = () => {
    setform({ show: true, renderForm: <SearchFriends /> });
  };


  return (
    <div className="home-container">
      <div className="buttons-container">
        <Button clicked={createNewEventModal} classes="btn-md btn-blueGradient">+ Create Event</Button>
        <Button clicked={friendSearchModal} classes="btn-md btn-orangeGradient">Look for friends</Button>
      </div>



      <div className="dashboard">

        <PaginatedContainer
          title={<span><i className="fas fa-door-open" /> {`Public Events`}</span>}
          items={publicEventsList.events}
          render={
            publicEventsList.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <EventCard
                    id={ev.event_id}
                    key={ev.event_id}
                    name={ev.name}
                    date={ev.startDate}
                    location={ev.address}
                    eventState={ev.eventState}
                  />
                ))
          }
        />
        <PaginatedContainer
          // title="Friend's Events"
          title={<span><i className="fas fa-users" /> {`Friend's Events`}</span>}
          items={friendsEventsList.events}
          render={
            friendsEventsList.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <EventCard
                    id={ev.event_id}
                    key={ev.event_id}
                    name={ev.name}
                    date={ev.startDate}
                    location={ev.address}
                    eventState={ev.eventState}
                  />
                ))
          }
        />
      </div>
    </div>
  );
};

export default Home;
