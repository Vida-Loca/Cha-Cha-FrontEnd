import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Location.scss";
import { FormContext } from "../../../context/FormContext";
import {
  editAddress,
  editPhoneNumber,
  editDateAndTime,
  editAttitionalInformation
} from "./FormsToBeRendered/FormsToBeRendered";
import TempData from "./Data/TempData";

import InfoSection from "../../../components/InfoSection/InfoSection";

const Location = ({ openModal }) => {
  const setform = useContext(FormContext)[1];

  const [location, setLocation] = useState(TempData);

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
          <InfoSection
            label="Address"
            content={`${location.Address.City}, ${location.Address.Street}, ${location.Address.HouseNumber}/${location.Address.ApartmentNumber}`}
            clickedEditForm={openModalToEditAdress}
          />
          <InfoSection
            label="Phone Number"
            content={`${location.Contact}`}
            clickedEditForm={openModalToEditPhoneNumber}
          />
          <InfoSection
            label="Date & Time"
            content={`${location.Date}, ${location.Time}`}
            clickedEditForm={openModalToEditDateAndTtime}
          />
          <InfoSection
            label="Additional Information"
            content={location.AdditionalInformation}
            clickedEditForm={openModalToAdditionalInformation}
          />
        </div>
      </div>
    </div>
  );
};

Location.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default Location;