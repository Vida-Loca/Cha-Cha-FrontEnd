import React, { useContext } from "react";
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
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};
HomeLayout.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default HomeLayout;
