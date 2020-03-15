import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "../../context/FormContext";

import { events } from "../../mockData";
// import { userService } from "../../Authentication/service";

import "./Home.scss";
import CreateEventContainer from "./CreateEventContainer";
import SearchFriends from "./FriendsSearch";

import { Button } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";

const Home = () => {
  let __isMounted = false

  const [publicEventsList, setPublicEventsList] = useState([]);
  const [friendsEventsList, setFriendsEventsList] = useState([]);

  useEffect(() => {
    __isMounted = true;
    setTimeout(() => {
      if (__isMounted) {
        setPublicEventsList(events);
        setFriendsEventsList(events);
      }
    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  const [forms, setform] = useContext(FormContext);
  const createNewEventModal = () => {
    setform({ show: true, renderForm: <CreateEventContainer /> });
  };
  const friendSearchModal = () => {
    setform({ show: true, renderForm: <SearchFriends /> });
  };


  return (
    <div className="HomeLayout">
      <div>
        <Button clicked={createNewEventModal} classes="btn-md btn-blueGradient">+ Create Event</Button>
        <Button clicked={friendSearchModal} classes="btn-md btn-orangeGradient">Look for friends</Button>
      </div>

      <div className="dashboard">
        <PaginatedContainer
          title="Public Events"
          items={publicEventsList}
          render={({ items }) =>
            items.map(ev => (
              <EventCard
                id={ev.event_id}
                key={ev.event_id}
                name={ev.name}
                date={ev.startDate}
                location={ev.address}
                eventState={ev.isComplete}
              />
            ))
          }
        />
        <PaginatedContainer
          title="Friend's Events"
          items={friendsEventsList}
          render={({ items }) =>
            items.map(ev => (
              <EventCard
                id={ev.event_id}
                key={ev.event_id}
                name={ev.name}
                date={ev.startDate}
                location={ev.address}
                eventState={ev.isComplete}
              />
            ))
          }
        />
      </div>
    </div>
  );
};

export default Home;
