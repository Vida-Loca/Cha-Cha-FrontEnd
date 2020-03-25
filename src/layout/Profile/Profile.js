import React, { useContext, useState, useEffect } from "react";

import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService, profileService } from "../../Authentication/service";

import "./Profile.scss";

import { Button, EditButton } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Avatar from "../../components/Avatar";
import checkValidation from "../../validation";
import ChangeAvatarContainer from "./ChangeAvatarContainer";
import FriendsList from "./FriendsList";
import Spinner from "../../components/Spinner";

import { events } from "../../mockData";

const Profile = () => {

  const [userInfo, setUserInfo] = useState({
    username: "Loading ...",
    email: "Loading ...",
    datejoined: "Loading ...",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
  });
  const [editableUserInfo, setEditableUserInfo] = useState({
    name: { value: "Loading ...", isValid: true, err: "" },
    surname: { value: "Loading ...", isValid: true, err: "" },
    tempName: "Loading ...",
    tempSurname: "Loading ..."
  });

  const [myEvents, setMyEvents] = useState({ events: [], spinner: true });
  const [invitations, setInvitations] = useState({ invitations: [], spinner: true });

  const [, setform] = useContext(FormContext);
  const [, setuser] = useContext(UserContext);
  const [editState, setEdit] = useState(false);


  useEffect(() => {
    let __isMounted = true;
    profileService.getCurrentUserInfo().then(res => {
      if (__isMounted) {
        setUserInfo({
          username: res.username,
          email: res.email,
          datejoined: res.joined.substring(0, 10),
          avatarUrl: res.picUrl
        })

        setEditableUserInfo({
          name: { value: res.name, isValid: true, err: "" },
          surname: { value: res.surname, isValid: true, err: "" },
          tempName: res.name,
          tempSurname: res.surname
        })

        setMyEvents({ events: events, spinner: false });
        setInvitations({ invitations: events, spinner: false });
      }
    }).catch(err => {
      console.log(err);
      console.log("sad face");

      setMyEvents({ events: events, spinner: false });
      setInvitations({ invitations: events, spinner: false });
    })
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
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-section">
          <Avatar imageLink={userInfo.avatarUrl} />
          <div className="edit-btn">
            <Button clicked={changeAvatarInModal} classes="change-avatar-icon"><i className="fas fa-image" /></Button>
          </div>
          <span className="username">{`@${userInfo.username}`}</span>
          <Button clicked={LogOut} classes="btn-sm btn-orangeGradient logout">
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
      <div className="friends-btn">
        <Button classes="btn-md btn-default" clicked={showFriendsInModal}>
          friends
        </Button>
      </div>
      <div className="event-section">
        <PaginatedContainer
          title="My Events"
          items={myEvents.events}
          perPage={4}
          render={
            myEvents.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <EventCard
                    id={ev.event_id}
                    key={ev.event_id}
                    name={ev.name}
                    date={ev.startDate}
                    location={ev.address}
                    eventState={ev.eventState}
                  />
                ))
          }
        />
        <PaginatedContainer
          title="Invitations"
          items={invitations.invitations}
          perPage={4}
          render={
            invitations.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <EventCard
                    id={ev.event_id}
                    key={ev.event_id}
                    name={ev.name}
                    date={ev.startDate}
                    location={ev.address}
                    eventState="invite"
                  />
                ))
          }
        />
      </div>
    </div>
  );
};

export default Profile;
