import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import TextInput from "../../components/Inputs/TextInput/TextInput";
import DateInput from "../../components/Inputs/DateInput/DateInput";
import Form from "../../components/Form/Form";
import EventCard from "../../components/EventCard/EventCard";
import { FormContext } from "../../context/FormContext";
import "./Home.scss";
import { tempEvents } from "./Data/TempData";

const HomeLayout = props => {
  const setform = useContext(FormContext)[1];

  const events = useState(tempEvents)[0];

  const newEventForm = () => {
    return (
      <Form>
        <TextInput placeholder="name" name="name" />
        <TextInput placeholder="location" name="location" />
        <DateInput placeholder="date" name="date" />
        <DateInput type="time" placeholder="time" name="time" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const insideHome = () => {
    setform({ show: true, renderForm: newEventForm() });
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
