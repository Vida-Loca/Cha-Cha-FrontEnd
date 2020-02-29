import React, { useContext, useState } from "react";

import { FormContext } from "../../context/FormContext";

import { events } from "../../mockData";
// import { userService } from "../../Authentication/service";

import "./Home.scss";
import CreateEventContainer from "./CreateEventContainer";

import { Button } from "../../components/Button";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";

const Home = () => {
  const [eventsList, setEventsList] = useState([]);

  // useEffect(() => {
  //   userService
  //     .getAllEvents()
  //     .then(body => {
  //       return body;
  //     })
  //     .then(res => {
  //       setEventsList(res);
  //       console.log(eventsList);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   return () => {};
  // }, [eventsList]);

  const [forms, setform] = useContext(FormContext);

  const insideHome = () => {
    setform({ show: true, renderForm: <CreateEventContainer /> });
  };

  return (
    <div className="HomeLayout">
      <div>
        <Button clicked={insideHome} classes="btn-md btn-blueGradient">
          + Create Event
        </Button>
      </div>
      <div className="dashboard">
        <div>
          <PaginatedContainer
            title="Public Events"
            items={events}
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
    </div>
  );
};

export default Home;
