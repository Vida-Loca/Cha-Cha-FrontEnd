import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Location.scss";
import { FormContext } from "../../../context/FormContext";
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import Form from "../../../components/Form/Form";
import TextInput from "../../../components/Inputs/TextInput/TextInput";

const Location = ({ openModal }) => {
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
    openModal();
  };
  const openModalToEditPhoneNumber = () => {
    setform({ renderForm: editPhoneNumber() });
    openModal();
  };
  const openModalToEditDateAndTtime = () => {
    setform({ renderForm: editDateAndTime() });
    openModal();
  };
  const openModalToAdditionalInformation = () => {
    setform({ renderForm: editAttitionalInformation() });
    openModal();
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

          <div className="infoSection">
            <div>
              <IconButton
                clicked={openModalToEditAdress}
                iconClass="fas fa-edit"
              />
              <strong>Adress:</strong>
            </div>
            <div>
              {location.Address.City},{location.Address.Street},{" "}
              {location.Address.HouseNumber}/{location.Address.ApartmentNumber}
            </div>
          </div>

          <div className="infoSection">
            <div>
              <IconButton
                clicked={openModalToEditPhoneNumber}
                iconClass="fas fa-edit"
              />
              <strong>Phone Number:</strong>
            </div>
            <div>{location.Contact}</div>
          </div>

          <div className="infoSection">
            <div>
              <IconButton
                clicked={openModalToEditDateAndTtime}
                iconClass="fas fa-edit"
              />
              <strong>Date & Time:</strong>
            </div>
            <div>
              {location.Date}, {location.Time}
            </div>
          </div>

          <div className="infoSection">
            <div>
              <IconButton
                clicked={openModalToAdditionalInformation}
                iconClass="fas fa-edit"
              />
              <strong>Additional Information:</strong>
            </div>
            <div>{location.AdditionalInformation}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

Location.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default Location;
