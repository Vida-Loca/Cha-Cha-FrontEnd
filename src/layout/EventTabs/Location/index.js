import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../../context/FormContext";
import { userService } from "../../../Authentication/service";

import { eventLocation } from "../../../mockData";

import "./Location.scss";

import InfoSection from "../../../components/InfoSection/InfoSection";
// import { TextInputNL } from "../../../components/Inputs";

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
          dateofevent: { field: res.startDate, edit: false },
          time: { field: res.startTime, edit: false },
          addidtionalInformation: {
            field: res.additionalInformation,
            edit: false
          },
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
  }, [id, location]);

  const setform = useContext(FormContext)[1];

  // const [location, setLocation] = useState(TempData);

  const toggleEditForAdress = () => {
    setLocation({
      ...location,
      Address: { ...location.Address, edit: !location.Address.edit }
    });
  };

  const onChangeHandlerAdress = event => {
    setLocation({
      ...location,
      Address: {
        ...location.Address,
        [`${event.target.name}`]: event.target.value
      }
    });
    console.log(location);
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
              <p>test</p>
              {/* <EditInput
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
              /> */}
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
          <InfoSection label="Date & Time" />
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
          />
        </div>
      </div>
    </div>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired
};

export default Location;
