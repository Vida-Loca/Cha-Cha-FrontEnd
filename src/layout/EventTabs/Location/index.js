import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { eventService } from "../../../Authentication/service";

// import { eventLocation } from "../../../mockData";
import { TextInput } from "../../../components/Inputs";
import { EditButton, Button } from "../../../components/Button";
import checkValidation from "../../../validation";
import { UserContext } from "../../../context/UserContext";

import {locationInfoForm, addressForm, letlongRules} from "./validationRules";

import Map from "../../../components/Map";
import "./Location.scss";


const Location = ({ id }) => {
  const [fetchedEvent, setFetchedEvent] = useState({});
  const [isAuthorized, setAuthorization] = useState(false);
  const [loggedInUser,] = useContext(UserContext);


  const [locationInfo, setLocationInfo] = useState({
    dateofevent: { value: "", isValid: true, err: [] },
    time: { value: "00:00", isValid: true, err: [] }
  });
  const [tempLocationInfo, setTempLocationInfo] = useState({ dateofevent: "", time: "Loading...", addidtionalInformation: "Loading..." });
  const [address, setAddress] = useState({
    country: { value: "Loading...", isValid: true, err: [] },
    city: { value: "Loading...", isValid: true, err: [] },
    street: { value: "Loading...", isValid: true, err: [] },
    number: { value: "0", isValid: true, err: [] },
    postcode: { value: "Loading...", isValid: true, err: [] },
    lat: { value: 0, isValid: true, err: [] },
    long: { value: 0, isValid: true, err: [] }
  });
  const [tempAddress, setTempAddress] = useState({ country: "Loading....", city: "Loading...", street: "Loading...", number: "0", postcode: "Loading...", lat: 0,  long: 0 });
  const [editState, setEdit] = useState(false);

  const [tempLatLong, setTempLantLong] = useState({ lat: 54.679120, long: 25.204154 });
  const [latLong, setlantLong] = useState({ lat: { value: 0, isValid: true, err: [] }, long: { value: 0, isValid: true, err: [] } });

  

  useEffect(() => {
    let __isMounted = true;
    console.log("local debug!!");

    eventService.isCurrentUserAdminOfEvent(id)
      .then(res => {
        setAuthorization(res || loggedInUser.isAdmin);
        console.log(`ev: ${res}`);
      }, err => {
        console.log(err);
      })

    eventService.getEventByID(id)
      .then(res => {
        if (__isMounted) {
          setFetchedEvent(res);
          setLocationInfo({
            dateofevent: { ...locationInfo.dateofevent, value: res.startTime.substring(0, 10) },
            time: { ...locationInfo.time, value: res.startTime.substring(11, 16) },
          });
          setTempLocationInfo({ dateofevent: res.startTime.substring(0, 10), time: res.startTime.substring(11, 16) })
          setAddress({
            country: { ...address.city, value: res.address.country },
            city: { ...address.city, value: res.address.city },
            street: { ...address.street, value: res.address.street },
            number: { ...address.street, value: res.address.number },
            postcode: { ...address.postcode, value: res.address.postcode },
            lat: { ...address.lat, value: 54.45 },
            long: { ...address.long, value: 23.45 }
          });
          setTempAddress({
            country: res.address.country, city: res.address.city, street: res.address.street,
            number: res.address.number, postcode: res.address.postcode, lat: 0, long: 0
          })
        }
      })

    return () => {
      __isMounted = false;
    };
  }, []);

  const editHandler = () => {
    setEdit(!editState);
  };
  const cancelEdit = () => {
    setEdit(false);
    setAddress({
      country: { ...address.country, value: tempAddress.country },
      city: { ...address.city, value: tempAddress.city },
      street: { ...address.street, value: tempAddress.street },
      number: { ...address.street, value: tempAddress.number },
      postcode: { ...address.postcode, value: tempAddress.postcode },
      lat: { ...address.lat, value: tempAddress.lat },
      long: { ...address.long, value: tempAddress.long }
    });
    setLocationInfo({
      dateofevent: { ...locationInfo.dateofevent, value: tempLocationInfo.dateofevent },
      time: { ...locationInfo.time, value: tempLocationInfo.time },
      addidtionalInformation: { ...locationInfo.addidtionalInformation, value: tempLocationInfo.addidtionalInformation }
    });
  };


  const onChangeHandlerLetLong = event => {
    const validationResult = checkValidation(
      event.target.value,
      letlongRules.find(x => x.name === event.target.name).validation
    );
    setAddress({
      ...address,
      [`${event.target.name}`]: {
        ...address[`${event.target.name}`],
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1]
      }
    });
  };

  const onChangeHandlerAddress = event => {
    const validationResult = checkValidation(
      event.target.value,
      addressForm.find(x => x.name === event.target.name).validation
    );
    setAddress({
      ...address,
      [`${event.target.name}`]: {
        ...address[`${event.target.name}`],
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1]
      }
    });
  };
  const onChangeHandlerInfo = event => {
    const validationResult = checkValidation(
      event.target.value,
      locationInfoForm.find(x => x.name === event.target.name).validation
    );
    setLocationInfo({
      ...locationInfo,
      [`${event.target.name}`]: {
        ...locationInfo[`${event.target.name}`],
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1]
      }
    });
  };

  const submitLocationChanges = () => {
    if (locationInfo.dateofevent.isValid && locationInfo.time.isValid && address.city.isValid &&
      address.country.isValid && address.street.isValid && address.number.isValid && address.postcode.isValid) {

      eventService.updateEvent(id, {
        ...fetchedEvent,
        startTime: `${locationInfo.dateofevent.value}T${locationInfo.time.value}`,
        address: {
          country: address.country.value,
          city: address.city.value,
          street: address.street.value,
          number: address.number.value,
          postcode: address.postcode.value
        }
      }).then(res => {
        console.log(res);
        setEdit(false);
      })


    } else {
      console.log("can't update")
    }

  }

  return (
    <div className="location-container">
      {isAuthorized &&
        <EditButton options={editState} activate={editHandler} cancel={cancelEdit} confirm={submitLocationChanges} tags
          render={<> <i className="far fa-edit" />Edit</>} />}
      <div className="address-info">
        {addressForm.map(el => (
          <TextInput
            key={el.name}
            onChange={onChangeHandlerAddress}
            type={el.config.type}
            placeholder={el.config.placeholder}
            name={el.name}
            value={address[el.name].value}
            size="input-md"
            classes={editState ? "input-blue" : ""}
            error={address[el.name].err[0]}
            disabled={!editState}
          />
        ))}
        {locationInfoForm.map(el => (
          <TextInput
            key={el.name}
            onChange={onChangeHandlerInfo}
            type={el.config.type}
            placeholder={el.config.placeholder}
            name={el.name}
            value={locationInfo[el.name].value}
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            error={locationInfo[el.name].err[0]}
            disabled={!editState}
          />
        ))}
           {isAuthorized && (
             <>
              <h3 className="title">map coordinates</h3>
                {letlongRules.map(el => (
                <TextInput
                  key={el.name}
                  onChange={onChangeHandlerLetLong}
                  type={el.config.type}
                  placeholder={el.config.placeholder}
                  name={el.name}
                  value={address[el.name].value}
                  size="input-md"
                  classes={editState ? "input-blue" : ""}
                  error={address[el.name].err[0]}
                  disabled={!editState}
                />
              ))}
             </>
           )
          }
         
      
      </div>
      {/* {
        (tempAddress.lat.value !== 0 && tempAddress.long.value !== 0) &&
        <div className="map-container">
          <h2>Map</h2>
            <Map latitude={tempAddress.lat.value} longitude={tempAddress.lat.value} />
        </div>
      }
       */}

    </div>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired
};

export default Location;
