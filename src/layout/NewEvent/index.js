import React, { useState } from "react";

import { DateInput, TextInput } from "../../components/Inputs";
import { Button } from "../../components/Button";

import "./NewEvent.scss";

const NewEvent = () => {
  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: "",
    startTime: ""
  });
  const [newAddress, setNewAddress] = useState({
    country: "",
    city: "",
    street: "",
    postcode: "",
    number: ""
  });

  const onChangeHandlerEvent = event => {
    setNewEvent({ ...newEvent, [`${event.target.name}`]: event.target.value });
  };
  const onChangeHandlerAddress = event => {
    setNewAddress({ ...newAddress, [`${event.target.name}`]: event.target.value });
  };
  return (
    <div>
      <TextInput classes="input-blue" onChange={onChangeHandlerEvent} placeholder="name" name="name" />
      <DateInput onChange={onChangeHandlerEvent} placeholder="Start Date" name="startDate" />
      <DateInput onChange={onChangeHandlerEvent} type="time" placeholder="Start Time" name="startTime" />
      <TextInput classes="input-blue" onChange={onChangeHandlerAddress} placeholder="country" name="country" />
      <TextInput classes="input-blue" onChange={onChangeHandlerAddress} placeholder="city" name="city" />
      <TextInput classes="input-blue" onChange={onChangeHandlerAddress} placeholder="street" name="street" />
      <TextInput classes="input-blue" onChange={onChangeHandlerAddress} placeholder="postcode" name="postcode" />
      <TextInput classes="input-blue" onChange={onChangeHandlerAddress} placeholder="number" name="number" />

      <Button classes="form-btn btn-blueGradient btn-md">apply</Button>
    </div>
  );
};

export default NewEvent;
