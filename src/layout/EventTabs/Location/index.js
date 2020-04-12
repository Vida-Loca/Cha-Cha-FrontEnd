import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { eventService } from "../../../Authentication/service";

// import { eventLocation } from "../../../mockData";
import { TextInput } from "../../../components/Inputs";
import { EditButton } from "../../../components/Button";
import checkValidation from "../../../validation";

import "./Location.scss";


const Location = ({ id }) => {

  const [fetchedEvent, setFetchedEvent] = useState({});
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
    postcode: { value: "Loading...", isValid: true, err: [] }
  });
  const [tempAddress, setTempAddress] = useState({ country: "Loading....", city: "Loading...", street: "Loading...", number: "0", postcode: "Loading..." });
  const [editState, setEdit] = useState(false);

  const [addressForm,] = useState([
    {
      name: "country",
      config: {
        placeholder: "country",
        type: "text"
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
        type: "text"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "street",
      config: {
        placeholder: "street",
        type: "text"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "number",
      config: {
        placeholder: "house number",
        type: "number"
      },
      validation: {
        required: true,
        number: true,
        maxLength: 10
      }
    },
    {
      name: "postcode",
      config: {
        placeholder: "post code",
        type: "text"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ]);
  const [locationInfoForm,] = useState([
    {
      name: "dateofevent",
      config: {
        placeholder: "date of event",
        type: "date"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "time",
      config: {
        placeholder: "time",
        type: "time"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ]);

  useEffect(() => {
    let __isMounted = true;

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
            postcode: { ...address.postcode, value: res.address.postcode }
          });
          setTempAddress({
            country: res.address.country, city: res.address.city, street: res.address.street,
            number: res.address.number, postcode: res.address.postcode
          })
        }
      })

    return () => {
      __isMounted = false;
    };
  }, [id, address.city, address.street, address.postcode, address.country, address.number, locationInfo.dateofevent, locationInfo.time]);

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
      postcode: { ...address.postcode, value: tempAddress.postcode }
    });
    setLocationInfo({
      dateofevent: { ...locationInfo.dateofevent, value: tempLocationInfo.dateofevent },
      time: { ...locationInfo.time, value: tempLocationInfo.time },
      addidtionalInformation: { ...locationInfo.addidtionalInformation, value: tempLocationInfo.addidtionalInformation }
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
      <div className="address-info">
        <EditButton options={editState} activate={editHandler} cancel={cancelEdit} confirm={submitLocationChanges} tags
          render={<> <i className="far fa-edit" />Edit</>} />
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
      </div>
      <img
        className="location-map"
        src="https://techupdatess.com/wp-content/uploads/2019/05/google-maps-speed-cams.jpg"
        alt=""
      />
    </div>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired
};

export default Location;
