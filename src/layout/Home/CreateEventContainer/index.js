import React, { useState } from "react";
import { history } from "../../../Authentication/helper";
import { TextInput, OptionsInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import checkValidation from "../../../validation";
import Spinner from "../../../components/Spinner";
import { primaryInfoFormRules, adressFormRules } from "./validationCfg";

import { eventService } from "../../../Authentication/service";

import "./CreateEvent.scss";

const CreateEventContainer = () => {

  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [Information, setInformation] = useState({
    name: { value: "", isValid: false, err: "", touched: false },
    startDate: { value: "", isValid: false, err: "", touched: false },
    startTime: { value: "", isValid: false, err: "", touched: false },
    privacy: { value: "PRIVATE", isValid: true, err: "", touched: true }
  });
  const [newAddress, setNewAddress] = useState({
    country: { value: "", isValid: false, err: "", touched: false },
    city: { value: "", isValid: false, err: "", touched: false },
    street: { value: "", isValid: false, err: "", touched: false },
    postcode: { value: "", isValid: false, err: "", touched: false },
    number: { value: "", isValid: false, err: "", touched: false }
  });


  const onChangeHandler = (event, setStateFun, initialState, ruleList) => {
    const validationResult = checkValidation(
      event.target.value,
      ruleList.find(x => x.name === event.target.name).validation
    );
    setStateFun({
      ...initialState,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true
      }
    });
  };

  const onChangeAddressHandler = event => {
    onChangeHandler(event, setNewAddress, newAddress, adressFormRules);
  }
  const onChangePrimaryInformationHandler = event => {
    onChangeHandler(event, setInformation, Information, primaryInfoFormRules);
  }

  const onChangePrivacy = event => {
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
        isOver: false,
        currency: "USD",
        eventType: Information.privacy.value
      }).then(res => {
        history.push(`/event/${res.id}`)
        setSendingDataSpinner(false)
      });

    }
  }

  return (
    <div className="Create-Event-Container">
      {primaryInfoFormRules.map(el => (
        <TextInput
          onChange={onChangePrimaryInformationHandler}
          key={el.name}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={Information[el.name].value}
          classes={Information[el.name].touched ^ Information[el.name].isValid ? "input-orange" : el.config.classes}
          error={Information[el.name].err[0]}
        />
      ))}
      <OptionsInput classes="input-md option-md option-blue" onChange={onChangePrivacy} value={Information.privacy.value} name="privacy" options={["PRIVATE", "NORMAL", "PUBLIC", "SECRET"]} />
      {adressFormRules.map(el => (
        <TextInput
          onChange={onChangeAddressHandler}
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
