import React, { useContext, useState, useEffect } from "react";

import { FormContext } from "../../context/FormContext";
import { tempEvents } from "./Data/TempData";
import { userService } from "../../Authentication/service";

import "./Home.scss";

import { Button } from "../../components/Button/Index";
import { TextInput, DateInput } from "../../components/Inputs/Index";
import Form from "../../components/Form/Form";
import EventCard from "../../components/EventCard/EventCard";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    console.log("hello from effect");
    userService
      .getAllEvents()
      .then(body => {
        return body;
      })
      .then(res => {
        setEventsList(res);
        console.log(eventsList);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      console.log("unoounted ");
    };
  }, [eventsList]);

  const [forms, setform] = useContext(FormContext);

  // const events = useState(tempEvents)[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tempEvents.slice(indexOfFirstPost, indexOfLastPost);
  // const currentPosts2 = tempEvents.slice(indexOfFirstPost, indexOfLastPost);

  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: "",
    startTime: "",
    address: {
      country: "",
      city: "",
      street: "",
      postcode: "",
      number: ""
    }
  });

  const createNewEvent = event => {
    event.preventDefault();

    userService
      .createNewEvent(newEvent)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
        setform({ ...forms, show: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const onChangeHandlerEvent = event => {
    setNewEvent({ ...newEvent, [`${event.target.name}`]: event.target.value });
    console.log(newEvent);
  };
  const onChangeHandlerAddress = event => {
    setNewEvent({
      ...newEvent,
      address: {
        ...newEvent.address,
        [`${event.target.name}`]: event.target.value
      }
    });
    console.log(newEvent);
  };

  const newEventForm = () => {
    return (
      <Form>
        <TextInput
          onChange={onChangeHandlerEvent}
          placeholder="name"
          name="name"
        />
        <DateInput
          onChange={onChangeHandlerEvent}
          placeholder="Start Date"
          name="startDate"
        />
        <DateInput
          onChange={onChangeHandlerEvent}
          type="time"
          placeholder="Start Time"
          name="startTime"
        />
        <TextInput
          onChange={onChangeHandlerAddress}
          placeholder="country"
          name="country"
        />
        <TextInput
          onChange={onChangeHandlerAddress}
          placeholder="city"
          name="city"
        />
        <TextInput
          onChange={onChangeHandlerAddress}
          placeholder="street"
          name="street"
        />
        <TextInput
          onChange={onChangeHandlerAddress}
          placeholder="postcode"
          name="postcode"
        />
        <TextInput
          onChange={onChangeHandlerAddress}
          placeholder="number"
          name="number"
        />

        <Button clicked={createNewEvent} classes="btn-blueGradient btn-md">
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
              id={event.event_id}
              key={event.event_id}
              name={event.name}
              date={event.startDate}
              location={`${event.address.city}, ${event.address.street}, ${event.address.number}, ${event.address.postcode}`}
            />
          );
        })}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={tempEvents.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
