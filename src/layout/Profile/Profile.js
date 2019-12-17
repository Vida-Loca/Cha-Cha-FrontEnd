import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../context/FormContext";
import Button from "../../components/button/Button";
import TextInput from "../../components/Inputs/TextInput/TextInput";
import Form from "../../components/Form/Form";
import EventCard from "../../components/EventCard/EventCard";
import "./Profile.scss";

const Profile = props => {
  const setform = useContext(FormContext)[1];

  const ProfileForm = () => {
    return (
      <Form>
        <TextInput placeholder="name" name="name" />
        <TextInput placeholder="surname" name="surname" />
        <TextInput placeholder="email" name="email" />
        <TextInput placeholder="password" name="password" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          update
        </Button>
      </Form>
    );
  };

  const insideProfile = () => {
    setform({ renderForm: ProfileForm() });
    props.openModal();
  };

  return (
    <div className="profileRootContainer">
      <div>
        <img
          src="https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
          alt=""
        />
        <div className="information">
          <span className="username">@Heylee</span>
          <Button clicked={insideProfile} classes="btn-sm btn-blueGradient">
            Edit Profile
          </Button>
          <div className="icon-span">
            <i className="fas fa-calendar-alt" />
            <span>joined 10-12-2009</span>
          </div>
          <div className="icon-span">
            <i className="fas fa-users" />
            <span>Friends 20</span>
          </div>
        </div>
      </div>
      <div>
        <h2>My Events</h2>
        <EventCard
          id="dwkm45s"
          key="1"
          name="Ebent 233"
          location="some location"
          date="2010-23-2"
        />
        <EventCard
          id="swf45"
          key="2"
          name="Ebent 233"
          location="some location"
          date="2010-23-2"
        />
        <EventCard
          id="swdwf245"
          key="3"
          name="Ebent 233"
          location="some location"
          date="2010-23-2"
        />
        <EventCard
          id="dwwDD45"
          key="4"
          name="Ebent 233"
          location="some location"
          date="2010-23-2"
        />
        <EventCard
          id="dawdGTh4J"
          key="5"
          name="Ebent 233"
          location="some location"
          date="2010-23-2"
        />
      </div>
    </div>
  );
};

Profile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Profile;
