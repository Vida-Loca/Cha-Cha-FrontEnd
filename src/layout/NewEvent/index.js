import React, { useState } from "react";

import { DateInput, TextInput, RadioInput } from "../../components/Inputs";
import { Button } from "../../components/Button";
import InviteUserFormContainer from "../EventTabs/Members/InviteUserFormContainer";


import checkValidation from "../../validation";

import "./NewEvent.scss";

const NewEvent = () => {
  const [isFormValid, setFormValid] = useState(false);
  const [Information, setInformation] = useState({
    name: { value: "", isValid: false, err: "", touched: false },
    startDate: { value: "", isValid: false, err: "", touched: false },
    startTime: { value: "", isValid: false, err: "", touched: false },
    privacy: { value: "", isValid: false, err: "", touched: false }
  });
  const [newAddress, setNewAddress] = useState({
    country: { value: "", isValid: false, err: "", touched: false },
    city: { value: "", isValid: false, err: "", touched: false },
    street: { value: "", isValid: false, err: "", touched: false },
    postcode: { value: "", isValid: false, err: "", touched: false },
    number: { value: "", isValid: false, err: "", touched: false }
  });

  const formInfo = useState([
    {
      name: "name",
      config: {
        placeholder: "event name",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "startDate",
      config: {
        placeholder: "start date",
        classes: "input-blue start-date"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "startTime",
      config: {
        placeholder: "start time",
        classes: "input-blue start-time"
      },
      validation: {
        required: true
      }
    },
    {
      name: "privacy",
      config: {
        placeholder: "privacy",
        classes: "input-blue"
      },
      validation: {
        required: true
      }
    }
  ])[0];

  const formAdress = useState([
    {
      name: "country",
      config: {
        placeholder: "coutnry",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "city",
      config: {
        placeholder: "city",
        classes: "input-blue"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "street",
      config: {
        placeholder: "street",
        classes: "input-blue"
      },
      validation: {
        required: true
      }
    },
    {
      name: "postcode",
      config: {
        placeholder: "post code",
        classes: "input-blue"
      },
      validation: {
        required: true
      }
    },
    {
      name: "number",
      config: {
        placeholder: "house number",
        classes: "input-blue",
      },
      validation: {
        required: true
      }
    }
  ])[0];

  const [createStage, setCreateStage] = useState(0);

  const onChangeHandlerEvent = event => {
    const validationResult = checkValidation(
      event.target.value,
      formInfo.find(x => x.name === event.target.name).validation
    );
    setInformation({
      ...Information,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true
      }
    });
  };
  const onChangeHandlerAddress = event => {
    const validationResult = checkValidation(
      event.target.value,
      formAdress.find(x => x.name === event.target.name).validation
    );
    setNewAddress({
      ...newAddress,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true
      }
    });
    // let testValidity = true;
    // for (let key in newAddress) {
    //   testValidity = newAddress[key].isValid && testValidity;
    // }
    // setFormValid(testValidity);
  };
  const nextStage = () => {
    if (createStage < 2) {
      setCreateStage(createStage + 1)
    }
  }
  const lastStage = () => {
    if (createStage > 0) {
      setCreateStage(createStage - 1)
    }
  }
  return (
    <div className="Create-Event-Container">
      {createStage === 0 &&
        <>
          <h3>Information</h3>
          {formInfo.map(el => (
            <TextInput
              onChange={onChangeHandlerEvent}
              key={el.name}
              placeholder={el.config.placeholder}
              type={el.config.type}
              name={el.name}
              value={Information[el.name].value}
              classes={Information[el.name].touched ^ Information[el.name].isValid ? "input-orange" : el.config.classes}
              error={Information[el.name].err[0]}
            />
          ))}</>}
      {createStage === 1 &&
        <>
          <h3>Address</h3>
          {formAdress.map(el => (
            <TextInput
              onChange={onChangeHandlerAddress}
              key={el.name}
              placeholder={el.config.placeholder}
              type={el.config.type}
              name={el.name}
              value={newAddress[el.name].value}
              classes={newAddress[el.name].touched ^ newAddress[el.name].isValid ? "input-orange" : el.config.classes}
              error={newAddress[el.name].err[0]}
            />
          ))}
        </>}
      {createStage === 2 &&
        <>
          <InviteUserFormContainer id={2} />
        </>}

      <div className="create-event-controll-btns">
        <Button clicked={lastStage} classes="form-btn btn-orangeGradient btn-sm">Back</Button>
        <Button classes="form-btn btn-blueGradient btn-md">Create</Button>
        <Button clicked={nextStage} classes="form-btn btn-orangeGradient btn-sm">Next</Button>
      </div>
    </div>
  );
};

export default NewEvent;




