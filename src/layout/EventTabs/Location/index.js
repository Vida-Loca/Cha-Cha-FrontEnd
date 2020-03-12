import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
// import { userService } from "../../../Authentication/service";

import { eventLocation } from "../../../mockData";
import { TextInput } from "../../../components/Inputs";
import { EditButton } from "../../../components/Button";
import checkValidation from "../../../validation";

import "./Location.scss";


const Location = ({ id }) => {
  const [locationInfo, setLocationInfo] = useState({
    dateofevent: { value: "", isValid: true, err: [] },
    time: { value: "", isValid: true, err: [] },
    addidtionalInformation: { value: "", isValid: true, err: [] }
  });
  const [tempLocationInfo, setTempLocationInfo] = useState({ dateofevent: "", time: "", addidtionalInformation: "" });
  const [adress, setAddress] = useState({
    city: { value: "", isValid: true, err: [] },
    street: { value: "", isValid: true, err: [] },
    number: { value: "", isValid: true, err: [] },
    postcode: { value: "", isValid: true, err: [] }
  });
  const [tempAdress, setTempAdress] = useState({ city: "", street: "", number: "", postcode: "" });
  const [editState, setEdit] = useState(false);

  const addressForm = useState([
    {
      name: "city",
      config: {
        placeholder: "city"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "street",
      config: {
        placeholder: "street"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "number",
      config: {
        placeholder: "house number"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "postcode",
      config: {
        placeholder: "post code"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ])[0];
  const locationInfoForm = useState([
    {
      name: "dateofevent",
      config: {
        placeholder: "date of event"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "time",
      config: {
        placeholder: "time"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ])[0];

  useEffect(() => {
    setLocationInfo({
      dateofevent: { ...locationInfo.dateofevent, value: eventLocation.dateofevent },
      time: { ...locationInfo.time, value: eventLocation.time },
      addidtionalInformation: { ...locationInfo.addidtionalInformation, value: eventLocation.addidtionalInformation }
    });
    setTempLocationInfo({ dateofevent: eventLocation.dateofevent, time: eventLocation.time, addidtionalInformation: eventLocation.addidtionalInformation })

    setAddress({
      city: { ...adress.city, value: eventLocation.Address.city },
      street: { ...adress.street, value: eventLocation.Address.street },
      number: { ...adress.street, value: eventLocation.Address.number },
      postcode: { ...adress.postcode, value: eventLocation.Address.postcode }
    });
    setTempAdress({ city: eventLocation.Address.city, street: eventLocation.Address.street, number: eventLocation.Address.number, postcode: eventLocation.Address.postcode })

    // userService
    //   .getEventById(id)
    //   .then(body => {
    //     return body;
    //   })
    //   .then(res => {
    //     setLocation({
    //       ...location,
    //       dateofevent: { field: res.startDate, edit: false },
    //       time: { field: res.startTime, edit: false },
    //       addidtionalInformation: {
    //         field: res.additionalInformation,
    //         edit: false
    //       },
    //       Address: {
    //         ...location.Address,
    //         city: res.address.city,
    //         street: res.address.street,
    //         number: res.address.number,
    //         postcode: res.address.postcode
    //       }
    //     });
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    return () => { };
  }, []);

  const editHandler = () => {
    setEdit(!editState);
  };
  const cancelEdit = () => {
    setEdit(false);
    setAddress({
      city: { ...adress.city, value: tempAdress.city },
      street: { ...adress.street, value: tempAdress.street },
      number: { ...adress.street, value: tempAdress.number },
      postcode: { ...adress.postcode, value: tempAdress.postcode }
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
      ...adress,
      [`${event.target.name}`]: {
        ...adress[`${event.target.name}`],
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

  return (
    <div className="LocationBody">
      <div className="info">
        <div className="Adress-info">
          <EditButton options={editState} activate={editHandler} cancel={cancelEdit} tags
            render={<> <i className="far fa-edit" />Edit</>} />
          {addressForm.map(el => (
            <TextInput
              key={el.name}
              onChange={onChangeHandlerAddress}
              placeholder={el.config.placeholder}
              name={el.name}
              value={adress[el.name].value}
              size="input-sm"
              classes={editState ? "input-blue" : ""}
              error={adress[el.name].err[0]}
              disabled={!editState}
            />
          ))}
          {locationInfoForm.map(el => (
            <TextInput
              key={el.name}
              onChange={onChangeHandlerInfo}
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
          className="Map"
          src="https://techupdatess.com/wp-content/uploads/2019/05/google-maps-speed-cams.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired
};

export default Location;
