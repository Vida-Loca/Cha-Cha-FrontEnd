import React, { useState, useContext, useEffect } from "react";

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
import EditInput from "../../../components/Inputs/EditInput/EditInput";

import { userService } from "../../../Authentication/service";

const Location = ({ id }) => {
  const [location, setLocation] = useState({
    Address: {
      city: "",
      street: "",
      number: "",
      postcode: "",
      edit: false
    },
    phonenumber: { field: "", edit: false },
    dateofevent: { field: "", edit: false },
    time: { field: "", edit: false },
    addidtionalInformation: { field: "", edit: false }
  });

  useEffect(() => {
    console.log("hello from effect");
    userService
      .getEventById(id)
      .then(body => {
        return body;
      })
      .then(res => {
        setLocation({
          ...location,
          Address: {
            ...location.Address,
            city: res.address.city,
            street: res.address.street,
            number: res.address.number,
            postcode: res.address.postcode
          }
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      console.log("unoounted ");
    };
  }, []);

  const setform = useContext(FormContext)[1];

  // const [location, setLocation] = useState(TempData);

  const toggleEditForAdress = () => {
    setLocation({
      ...location,
      Address: { ...location.Address, edit: !location.Address.edit }
    });
  };
  const openModalToEditPhoneNumber = () => {
    setform({ show: true, renderForm: editPhoneNumber() });
  };
  const openModalToEditDateAndTtime = () => {
    setform({ show: true, renderForm: editDateAndTime() });
  };
  const openModalToAdditionalInformation = () => {
    setform({ show: true, renderForm: editAttitionalInformation() });
  };

  const onChangeHandlerAdress = event => {
    setLocation({
      ...location,
      Address: {
        ...location.Address,
        [`${event.target.name}`]: event.target.value
      }
    });
    console.log(location.Address);
  };

  return (
    <div className="LocationBody">
      <div className="info">
        <img
          className="Map"
          src="https://techupdatess.com/wp-content/uploads/2019/05/google-maps-speed-cams.jpg"
          alt=""
        />
        <div className="TextInfo">
          <InfoSection label="Address" clickedEditForm={toggleEditForAdress} />
          {location.Address.edit ? (
            <div>
              <EditInput
                value={location.Address.city}
                onChange={onChangeHandlerAdress}
                placeholder="city"
                name="city"
              />
              <EditInput
                value={location.Address.street}
                onChange={onChangeHandlerAdress}
                placeholder="street"
                name="street"
              />
              <EditInput
                value={location.Address.number}
                onChange={onChangeHandlerAdress}
                placeholder="number"
                name="number"
              />
              <EditInput
                value={location.Address.postcode}
                onChange={onChangeHandlerAdress}
                placeholder="postcode"
                name="postcode"
              />
            </div>
          ) : (
            <div>
              <p className="AdressField">
                <strong>City:</strong>
                {location.Address.city}
              </p>
              <p className="AdressField">
                <strong>Street:</strong>
                {location.Address.street}
              </p>
              <p className="AdressField">
                <strong>Number:</strong>
                {location.Address.number}
              </p>
              <p className="AdressField">
                <strong>Postalcode:</strong>
                {location.Address.postcode}
              </p>
            </div>
          )}
          <InfoSection
            label="Phone Number"
            content={location.phonenumber.field}
            clickedEditForm={openModalToEditPhoneNumber}
          />
          <InfoSection
            label="Date & Time"
            clickedEditForm={openModalToEditDateAndTtime}
          />
          <p className="AdressField">
            <strong>Date:</strong>
            {location.dateofevent.field}
          </p>
          <p className="AdressField">
            <strong>Time:</strong>
            {location.time.field}
          </p>
          <InfoSection
            label="Additional Information"
            content={location.addidtionalInformation.field}
            clickedEditForm={openModalToAdditionalInformation}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
