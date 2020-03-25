import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../context/FormContext";

// import { events } from "../../mockData";
import { eventService } from "../../Authentication/service";

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
    if (__isMounted) {
      eventService.getAllEvents()
        .then(res => {
          setPublicEventsList({ events: res, spinner: false })
        }).catch(err => console.log(err));


      eventService.getAllEvents()
        .then(res => {
          setFriendsEventsList({ events: res, spinner: false })
        }).catch(err => console.log(err));
    }
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
                    id={ev.id}
                    key={ev.id}
                    name={ev.name}
                    date={ev.startTime}
                    location={ev.address}
                    eventState="ongoing"
                  />
                ))
          }
        />
        <PaginatedContainer
          title={<span><i className="fas fa-users" /> {`Friend's Events`}</span>}
          items={friendsEventsList.events}
          render={
            friendsEventsList.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <EventCard
                    id={ev.id}
                    key={ev.id}
                    name={ev.name}
                    date={ev.startTime}
                    location={ev.address}
                    eventState="ongoing"
                  />
                ))
          }
        />
      </div>
    </div>
  );
};

export default Home;
