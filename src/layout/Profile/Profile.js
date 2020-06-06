/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from "react";

import { FormContext } from "../../context/FormContext";
import { FlashMessageContext } from "../../context/FlashMessageContext";
import { authenticationService, profileService, userService } from "../../Authentication/service";

import { editableProfileRules, profileRules } from "./validationCfg";

import { Button, EditButton } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Avatar from "../../components/Avatar";
import Spinner from "../../components/Spinner";

import checkValidation from "../../validation";
import ChangeAvatarContainer from "./ChangeAvatarContainer";
import FriendsList from "./FriendsList";

import "./Profile.scss";
// import { events } from "../../mockData";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "Loading ...",
    email: "Loading ...",
    datejoined: "Loading ...",
    avatarUrl: { link: "", loaded: false },
  });
  const [editableUserInfo, setEditableUserInfo] = useState({
    name: { value: "Loading ...", isValid: true, err: "" },
    surname: { value: "Loading ...", isValid: true, err: "" },
    tempName: "Loading ...",
    tempSurname: "Loading ...",
  });

  const [myEvents, setMyEvents] = useState({ events: [], spinner: true });
  const [invitations, setInvitations] = useState({ events: [], spinner: true });

  const [isEditable, setEdit] = useState(false);
  const [amountOfNewRequests, setNewRequests] = useState(0);

  const [, setform] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  useEffect(() => {
    let __isMounted = true;

    userService.getFriendRequestList()
      .then((res) => {
        if (__isMounted) {
          setNewRequests(res.filter((invite) => invite.invitationStatus === "PROCESSING").length);
        }
      });

    profileService.getCurrentUserInfo()
      .then((res) => {
        if (__isMounted) {
          setUserInfo({
            username: res.username,
            email: res.email,
            datejoined: res.joined.substring(0, 10),
            avatarUrl: { link: res.picUrl, loaded: true },
          });
          setEditableUserInfo({
            name: { value: res.name, isValid: true, err: "" },
            surname: { value: res.surname, isValid: true, err: "" },
            tempName: res.name,
            tempSurname: res.surname,
          });
        }
      });

    profileService.getAllUserEvents()
      .then((res) => {
        setMyEvents({ events: res, spinner: false });
      });

    profileService.getEventInvitations()
      .then((res) => {
        setInvitations({ events: res.filter((invitation) => invitation.accessStatus === "PROCESSING"), spinner: false });
      });

    return () => {
      __isMounted = false;
    };
  }, []);


  const editHandler = () => {
    setEdit(!isEditable);
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditableUserInfo({
      ...editableUserInfo,
      name: { ...editableUserInfo.name, value: editableUserInfo.tempName, err: [] },
      surname: { ...editableUserInfo.surname, value: editableUserInfo.tempSurname, err: [] },
    });
  };

  const onChangeHandler = (event) => {
    const validationResult = checkValidation(
      event.target.value,
      editableProfileRules.find((x) => x.name === event.target.name).validation,
    );
    setEditableUserInfo({
      ...editableUserInfo,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
      },
    });
  };

  const LogOut = () => {
    authenticationService.logout();
  };

  const submitUpdateProfile = () => {
    if (editableUserInfo.name.isValid && editableUserInfo.surname.isValid) {
      userService.updateCredentials(
        editableUserInfo.name.value,
        editableUserInfo.surname.value,
      ).then(() => {
        setEdit(false);
        setFlashMessage({
          message: "succesfully updated profile",
          show: true,
          messageState: "success",
        });
      }, () => {
        setFlashMessage({
          message: "there is a problem updating your profile",
          show: true,
          messageState: "warning",
        });
      });
    }
  };

  const changeAvatarInApp = (imageLink) => {
    setUserInfo({ ...userInfo, avatarUrl: { link: imageLink, loaded: true } });
  };


  const showFriendsInModal = () => {
    setform({ renderForm: <FriendsList />, show: true });
  };

  const changeAvatarInModal = () => {
    setform({
      renderForm: <ChangeAvatarContainer changeAvatarState={changeAvatarInApp} />, show: true,
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-section">
          {userInfo.avatarUrl.loaded && <Avatar imageLink={userInfo.avatarUrl.link} />}

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
            options={isEditable}
            activate={editHandler}
            cancel={cancelEdit}
            confirm={submitUpdateProfile}
            tags
            render={(
              <>
                <i className="far fa-edit" />
                Edit
              </>
            )}
          />
          {editableProfileRules.map((el) => (
            <TextInput
              key={el.name}
              onChange={onChangeHandler}
              placeholder={el.config.placeholder}
              name={el.name}
              value={editableUserInfo[el.name].value}
              size="input-sm"
              classes={isEditable ? "input-blue" : ""}
              error={editableUserInfo[el.name].err[0]}
              disabled={!isEditable}
            />
          ))}
          {profileRules.map((el) => (
            <TextInput
              key={el.name}
              onChange={onChangeHandler}
              placeholder={el.config.placeholder}
              name={el.name}
              value={userInfo[el.name]}
              size="input-sm"
              disabled
            />
          ))}
        </div>
      </div>
      <div className="friends-btn">

        <Button classes="btn-md btn-default" clicked={showFriendsInModal}>
          friends
          {amountOfNewRequests > 0 && <span className="red-marker"></span>}

        </Button>
      </div>
      <div className="event-section">
        <PaginatedContainer
          title="My Events"
          noContentMsg="you are not a part of any event"
          items={myEvents.events}
          perPage={4}
          render={
            myEvents.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <EventCard
                  id={ev.id}
                  key={ev.id}
                  name={ev.name}
                  date={ev.startTime}
                  location={ev.address}
                  eventState={ev.over ? "finished" : "ongoing"}
                />
              ))
          }
        />
        <PaginatedContainer
          title="Invitations"
          items={invitations.events}
          noContentMsg="no new invitations"
          perPage={4}
          render={
            invitations.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <EventCard
                  id={ev.event.id}
                  key={ev.event.id}
                  name={ev.event.name}
                  date={ev.event.startTime}
                  location={ev.event.address}
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
