import React, { useState, useContext } from "react";
import "./Location.scss";
import { FormContext } from "../../../context/FormContext";
import Button from "../../../components/button/Button";
import Form from "../../../components/Form/Form";
import TextInput from "../../../components/Inputs/TextInput/TextInput";

const Location = props => {
  const setform = useContext(FormContext)[1];

  const [location, setLocation] = useState({
    Address: {
      City: "Gdansk",
      Street: "3-Maja",
      HouseNumber: "34",
      ApartmentNumber: "44"
    },
    Contact: "784758933",
    Date: "2019-12-31",
    Time: "20:00",
    AdditionalInformation:
      "if bell doesnt work please knock or class our cellphones"
  });

  const editAddress = () => {
    return (
      <Form>
        <TextInput placeholder="City" name="city" />
        <TextInput placeholder="Street" name="street" />
        <TextInput placeholder="House Number" name="houseNumber" />
        <TextInput placeholder="Apartment Number" name="apartmentNumber" />
        <Button classes="btn-blueGradient btn-md">update</Button>
      </Form>
    );
  };
  const editPhoneNumber = () => {
    return (
      <Form>
        <TextInput placeholder="Phone Number" name="phoneNumber" />
        <Button classes="btn-blueGradient btn-md">update</Button>
      </Form>
    );
  };
  const editDateAndTime = () => {
    return (
      <Form>
        <TextInput placeholder="Date" name="date" />
        <TextInput placeholder="Time" name="time" />
        <Button classes="btn-blueGradient btn-md">update</Button>
      </Form>
    );
  };
  const editAttitionalInformation = () => {
    return (
      <Form>
        <TextInput
          placeholder="Additional Information"
          name="additionalInformation"
        />
        <Button classes="btn-blueGradient btn-md">update</Button>
      </Form>
    );
  };

  const openModalToEditAdress = () => {
    setform({ renderForm: editAddress() });
    props.openModal();
  };
  const openModalToEditPhoneNumber = () => {
    setform({ renderForm: editPhoneNumber() });
    props.openModal();
  };
  const openModalToEditDateAndTtime = () => {
    setform({ renderForm: editDateAndTime() });
    props.openModal();
  };
  const openModalToAdditionalInformation = () => {
    setform({ renderForm: editAttitionalInformation() });
    props.openModal();
  };

  return (
    <div className="LocationBody">
      <p className="EventName">New Year 2020</p>
      <div className="info">
        <img
          className="Map"
          src="https://techupdatess.com/wp-content/uploads/2019/05/google-maps-speed-cams.jpg"
          alt=""
        />
        <div className="TextInfo">
          <p>
            <strong>Adress:</strong>
            <Button
              clicked={openModalToEditAdress}
              classes="btn-blueGradient btn-sm"
            >
              Edit
            </Button>
          </p>
          <p>
            {location.Address.City},{location.Address.Street},{" "}
            {location.Address.HouseNumber}/{location.Address.ApartmentNumber}
          </p>
          <p>
            <strong>Phone Number:</strong>
            <Button
              clicked={openModalToEditPhoneNumber}
              classes="btn-blueGradient btn-sm"
            >
              Edit
            </Button>
          </p>
          <p>{location.Contact}</p>
          <p>
            <strong>Date & Time:</strong>
            <Button
              clicked={openModalToEditDateAndTtime}
              classes="btn-blueGradient btn-sm"
            >
              Edit
            </Button>
          </p>
          <p>
            {location.Date}, {location.Time}
          </p>
          <p>
            <strong>Additional Information:</strong>
            <Button
              clicked={openModalToAdditionalInformation}
              classes="btn-blueGradient btn-sm"
            >
              Edit
            </Button>
          </p>
          <p>{location.AdditionalInformation}</p>
        </div>
      </div>
    </div>
  );
};

export default Location;
