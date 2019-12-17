import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import TextInput from "../../components/Inputs/TextInput/TextInput";
import Form from "../../components/Form/Form";
import EventCard from "../../components/EventCard/EventCard";
import { FormContext } from "../../context/FormContext";
import "./Home.scss";

const HomeLayout = props => {
  const setform = useContext(FormContext)[1];

  const events = useState([
    {
      id: "ab3bdek3nfklNN",
      name: "event 1",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    },
    {
      id: "dwdjJ7nd&md",
      name: "event 2",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    },
    {
      id: "dwdadaw8M",
      name: "event 3",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    },
    {
      id: "dwYU68n77",
      name: "event 4",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    },
    {
      id: "dwdKN&&666s",
      name: "event 5",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    },
    {
      id: "dwdw34Hss",
      name: "event 6",
      time: "2:30PM",
      date: "10-12-2019",
      location: "Gdansk, Oliwskiego 25"
    }
  ])[0];

  const newEventForm = () => {
    return (
      <Form>
        <TextInput placeholder="name" name="name" />
        <TextInput placeholder="location" name="location" />
        <TextInput placeholder="date" name="date" />
        <TextInput placeholder="time" name="time" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const insideHome = () => {
    setform({ renderForm: newEventForm() });
    props.openModal();
  };

  return (
    <div className="HomeLayout">
      <Link to="/">
        <Button clicked={insideHome} classes="btn-md btn-blueGradient">
          + Create Event
        </Button>
      </Link>
      <div>
        <h2>Public Events</h2>
        {events.map(event => {
          return (
            <EventCard
              id={event.id}
              key={event.name}
              name={event.name}
              location={event.location}
              date={event.date}
            />
          );
        })}
      </div>
    </div>
  );
};
HomeLayout.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default HomeLayout;
