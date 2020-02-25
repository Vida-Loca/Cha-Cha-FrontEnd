import React, { useState, useContext } from "react";
import { DateInput, TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { FormContext } from "../../../context/FormContext";
import { userService } from "../../../Authentication/service";

const CreateEventContainer = () => {
  const [forms, setform] = useContext(FormContext);

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
  return (
    <div>
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
    </div>
  );
};

export default CreateEventContainer;
