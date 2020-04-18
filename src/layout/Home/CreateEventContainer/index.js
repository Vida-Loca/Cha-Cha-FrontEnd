import React, { useState } from "react";
import { TextInput, OptionsInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import checkValidation from "../../../validation";
import "./CreateEvent.scss";
import Spinner from "../../../components/Spinner";

import { eventService } from "../../../Authentication/service";
import { history } from "../../../Authentication/helper";

const CreateEventContainer = () => {

  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);


  const [Information, setInformation] = useState({
    name: { value: "", isValid: false, err: "", touched: false },
    startDate: { value: "", isValid: false, err: "", touched: false },
    startTime: { value: "", isValid: false, err: "", touched: false },
    privacy: { value: "Private", isValid: true, err: "", touched: true }
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
        required: true,
        time: true
      }
    },
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
  };

  const onChangePrivacy = (event) => {
    setInformation({
      ...Information, [`${event.target.name}`]: {
        value: event.target.value,
        isValid: true,
        err: [],
        touched: true
      }
    })
  }

  const submitNewEvent = () => {

    if (Information.name.isValid && Information.startDate.isValid &&
      Information.startTime.isValid && Information.privacy.isValid &&
      newAddress.country.isValid && newAddress.city.isValid &&
      newAddress.street.isValid && newAddress.postcode.isValid &&
      newAddress.number.isValid) {
      setSendingDataSpinner(true);

      eventService.createEvent({
        name: Information.name.value,
        startTime: `${Information.startDate.value}T${Information.startTime.value}`,
        address: {
          country: newAddress.country.value,
          city: newAddress.city.value,
          street: newAddress.street.value,
          postcode: newAddress.postcode.value,
          number: newAddress.number.value
        },
        eventType: Information.privacy.value
      }).then(res => {
        history.push(`/event/${res.id}`)
        setSendingDataSpinner(false)
      })
        .catch(err => setSendingDataSpinner(false));


    } else {
      console.log("something went wrong")
    }
  }


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
      <OptionsInput onChange={onChangePrivacy} value={Information.privacy.value} name="privacy" options={["NORMAL", "PUBLIC", "PRIVATE", "SECRET"]} />
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
      {sendingDataSpinner
        ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
        : <Button clicked={submitNewEvent} classes="form-btn btn-blueGradient btn-md">Create </Button>
      }
    </div>
  );
};

export default CreateEventContainer;
