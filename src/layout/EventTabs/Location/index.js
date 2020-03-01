import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
// import { userService } from "../../../Authentication/service";

import { eventLocation } from "../../../mockData";
import { TextInput } from "../../../components/Inputs";
import { EditButton } from "../../../components/Button";

import "./Location.scss";

// import { TextInputNL } from "../../../components/Inputs";

const Location = ({ id }) => {
  const [location, setLocation] = useState({
    Address: {
      city: "",
      street: "",
      number: "",
      postcode: ""
    },
    phonenumber: "",
    dateofevent: "",
    time: "",
    addidtionalInformation: ""
  });
  const [tempLocation] = useState(eventLocation);
  const [editState, setEdit] = useState(false);

  useEffect(() => {
    setLocation(eventLocation);
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
    return () => {};
  }, []);

  const editHandler = () => {
    setEdit(!editState);
  };
  const cancelEdit = () => {
    setEdit(false);
    setLocation(tempLocation);
  };

  const onChangeHandler = event => {
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
        <div className="Adress-info">
          <EditButton
            options={editState}
            activate={editHandler}
            cancel={cancelEdit}
            tags
            render={
              <>
                <i className="far fa-edit" />
                Edit
              </>
            }
          />
          <TextInput
            onChange={onChangeHandler}
            value={location.Address.city}
            placeholder="city"
            name="city"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
          <TextInput
            onChange={onChangeHandler}
            value={location.Address.street}
            placeholder="street"
            name="street"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
          <TextInput
            value={location.Address.number}
            placeholder="number"
            name="number"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
          <TextInput
            value={location.Address.postcode}
            placeholder="postcode"
            name="postcode"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
          <TextInput
            value={location.dateofevent}
            placeholder="date"
            name="date"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
          <TextInput
            value={location.time}
            placeholder="time"
            name="time"
            size="input-sm"
            classes={editState ? "input-blue" : ""}
            disabled={!editState}
          />
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
