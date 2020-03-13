import React, { useState, useContext } from "react";
import { TextInput, OptionsInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
// import { userService } from "../../../Authentication/service";
import checkValidation from "../../../validation";
import "./CreateEvent.scss";
import { number } from "prop-types";

const CreateEventContainer = () => {


  // const [isFormValid, setFormValid] = useState(false);
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
        type: 'text',
        placeholder: "event name",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true,
        minLength: 5,
        maxLength: 25,
      }
    },
    {
      name: "startDate",
      config: {
        type: 'date',
        placeholder: "start date",
        classes: "input-blue text-input-extra"
      },
      validation: {
        required: true
      }
    },
    {
      name: "startTime",
      config: {
        type: 'time',
        placeholder: "start time",
        classes: "input-blue text-input-extra"
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
        string: true,
      }
    },
    {
      name: "street",
      config: {
        placeholder: "street",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "postcode",
      config: {
        placeholder: "post code",
        classes: "input-blue"
      },
      validation: {
        required: true,
        postcode: true
      }
    },
    {
      name: "number",
      config: {
        type: "number",
        placeholder: "house",
        classes: "input-blue",
        disabled: true
      },
      validation: {
        required: true
      }
    }
  ])[0];
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


  return (
    <div className="Create-Event-Container">
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
      ))}
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
      <OptionsInput name="privacy" options={["private", "public", "friends"]} />
      <Button classes="form-btn btn-blueGradient btn-md">Create</Button>
    </div>
  );
};

export default CreateEventContainer;
