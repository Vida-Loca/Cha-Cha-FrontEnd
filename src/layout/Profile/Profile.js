import React, { useContext, useState, useEffect } from "react";

import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService } from "../../Authentication/service";
// import { userService } from "../../Authentication/service";

import { events } from "../../mockData";
import "./Profile.scss";

import { IconButton, Button, EditButton } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Avatar from "../../components/Avatar";
import checkValidation from "../../validation";
import ChangeAvatarContainer from "./ChangeAvatarContainer";
import FriendsList from "./FriendsList";

import { loggedInUser } from "../../mockData";

const Profile = () => {
  let __isMounted = false

  const [userInfo, setUserInfo] = useState({
    username: "Loading ...",
    email: "Loading ...",
    datejoined: "Loading ...",
    avatarUrl: ""
  });
  const [editableUserInfo, setEditableUserInfo] = useState({
    name: { value: "Loading ...", isValid: true, err: "" },
    surname: { value: "Loading ...", isValid: true, err: "" },
    tempName: "Loading ...",
    tempSurname: "Loading ..."
  });

  const [myEvents, setMyEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const setform = useContext(FormContext)[1];
  const setuser = useContext(UserContext)[1];
  const [editState, setEdit] = useState(false);


  useEffect(() => {
    __isMounted = true;
    setTimeout(() => {
      if (__isMounted) {
        setUserInfo({
          username: loggedInUser.username,
          email: loggedInUser.email,
          datejoined: loggedInUser.joined.substring(0, 10),
          avatarUrl: loggedInUser.picUrl
        })

        setEditableUserInfo({
          name: { value: loggedInUser.name, isValid: true, err: "" },
          surname: { value: loggedInUser.surname, isValid: true, err: "" },
          tempName: loggedInUser.name,
          tempSurname: loggedInUser.surname
        })

        setMyEvents(events);
        setInvitations(events);
      }

    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  const editableFormProfile = useState([
    {
      name: "name",
      config: {
        placeholder: "name"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "surname",
      config: {
        placeholder: "surname"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ])[0];
  const FormProfile = useState([
    {
      name: "email",
      config: {
        placeholder: "e-mail"
      }
    },
    {
      name: "datejoined",
      config: {
        placeholder: "date joined"
      }
    }
  ])[0];

  const editHandler = () => {
    setEdit(!editState);
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditableUserInfo({
      ...editableUserInfo,
      name: { ...editableUserInfo.name, value: editableUserInfo.tempName, err: [] },
      surname: { ...editableUserInfo.surname, value: editableUserInfo.tempSurname, err: [] }
    });
  };

  const onChangeHandler = event => {
    const validationResult = checkValidation(
      event.target.value,
      editableFormProfile.find(x => x.name === event.target.name).validation
    );
    setEditableUserInfo({
      ...editableUserInfo,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1]
      }
    });
  };

  const LogOut = () => {
    authenticationService.logout();
    setuser({ isLoggedIn: false, break: true });
  };

  const submitUpdateProfile = () => {
    if (editableUserInfo.name.isValid && editableUserInfo.surname.isValid) {
      setTimeout(() => {
        console.log({
          name: editableUserInfo.name.value,
          surname: editableUserInfo.surname.value,
        })
      }, 2000);
    } else {
      console.log("can't update profile")
    }

  }


  const showFriendsInModal = () => {
    setform({ renderForm: <FriendsList />, show: true });
  };

  const changeAvatarInModal = () => {
    setform({ renderForm: <ChangeAvatarContainer />, show: true });
  };

  return (
    <div className="profileRootContainer">
      <div className="ProfileCard">
        <div className="Avatar-section">
          <Avatar imageLink={userInfo.avatarUrl} />
          <div className="editBtn">
            <IconButton clicked={changeAvatarInModal} iconClass="fas fa-image" />
          </div>
          <span className="username">{`@${userInfo.username}`}</span>
          <Button clicked={LogOut} classes="btn-sm btn-orangeGradient">
            Log out
          </Button>
        </div>

        <div className="information-section">
          <h3>Profile</h3>
          <EditButton
            options={editState}
            activate={editHandler}
            cancel={cancelEdit}
            confirm={submitUpdateProfile}
            tags
            render={
              <>
                <i className="far fa-edit" />
                Edit
              </>
            }
          />
          {editableFormProfile.map(el => (
            <TextInput
              key={el.name}
              onChange={onChangeHandler}
              placeholder={el.config.placeholder}
              name={el.name}
              value={editableUserInfo[el.name].value}
              size="input-sm"
              classes={editState ? "input-blue" : ""}
              error={editableUserInfo[el.name].err[0]}
              disabled={!editState}
            />
          ))}
          {FormProfile.map(el => (
            <TextInput
              key={el.name}
              onChange={onChangeHandler}
              placeholder={el.config.placeholder}
              name={el.name}
              value={userInfo[el.name]}
              size="input-sm"
              disabled={true}
            />
          ))}
        </div>
      </div>
      <div>
        <Button classes="btn-md btn-default" clicked={showFriendsInModal}>
          friends
        </Button>
      </div>
      <div className="event-section">
        <PaginatedContainer
          title="My Events"
          items={myEvents}
          perPage={4}
          render={({ items }) =>
            items.map(ev => (
              <EventCard
                id={ev.event_id}
                key={ev.event_id}
                name={ev.name}
                date={ev.startDate}
                location={ev.address}
                eventState={ev.isComplete}
              />
            ))
          }
        />
        <PaginatedContainer
          title="Invitations"
          items={invitations}
          perPage={4}
          render={({ items }) =>
            items.map(ev => (
              <EventCard
                id={ev.event_id}
                key={ev.event_id}
                name={ev.name}
                date={ev.startDate}
                location={ev.address}
                eventState={ev.isComplete}
              />
            ))
          }
        />
      </div>
    </div>
  );
};

export default Profile;
