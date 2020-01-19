import React, { useContext, useState, useEffect } from "react";
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
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";

const Home = props => {
  // useEffect(() => {
  //   console.log("hello from effect");
  //   return () => {
  //     console.log("be bie");
  //   };
  // }, []);

  const [forms, setform] = useContext(FormContext);

  const events = useState(tempEvents)[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tempEvents.slice(indexOfFirstPost, indexOfLastPost);

  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    time: ""
  });

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const onChangeHandler = event => {
    setNewEvent({ ...newEvent, [`${event.target.name}`]: event.target.value });
    console.log(newEvent);
  };

  const newEventForm = () => {
    return (
      <Form>
        <TextInput onChange={onChangeHandler} placeholder="name" name="name" />
        <TextInput
          onChange={onChangeHandler}
          placeholder="location"
          name="location"
        />
        <DateInput onChange={onChangeHandler} placeholder="date" name="date" />
        <DateInput
          onChange={onChangeHandler}
          type="time"
          placeholder="time"
          name="time"
        />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const insideHome = () => {
    setform({ show: true, renderForm: newEventForm() });
  };

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  return (
    <div className="HomeLayout">
      <Modal show={forms.show} modalClose={hideModal}>
        {newEventForm()}
      </Modal>

      <div>
        <Button clicked={insideHome} classes="btn-md btn-blueGradient">
          + Create Event
        </Button>
      </div>
      <div>
        <h2>Public Events</h2>
        {currentPosts.map(event => {
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={events.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
Home.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Home;
