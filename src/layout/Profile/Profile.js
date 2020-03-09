import React, { useContext, useState } from "react";

import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService } from "../../Authentication/service";
// import { userService } from "../../Authentication/service";

import { friends, friendsRequests, events } from "../../mockData";
import "./Profile.scss";

import { IconButton, Button, EditButton } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Avatar from "../../components/Avatar";
import UserCard from "../../components/UserCard";
import checkValidation from "../../validation";
import ChangeAvatarContainer from "./ChangeAvatarContainer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "username",
    email: "email@email.com",
    datejoined: "2010-10-12"
  });
  const [editableUserInfo, setEditableUserInfo] = useState({
    name: { value: "name", isValid: true, err: "" },
    surname: { value: "surname", isValid: true, err: "" },
    tempName: "name",
    teempSurname: "surname"
  });

  const [forms, setform] = useContext(FormContext);
  const setuser = useContext(UserContext)[1];
  const [editState, setEdit] = useState(false);
  // const [myEvents, setMyEvent] = useState([]);

  // useEffect(() => {
  //   userService
  //     .getCurrentUserInfo()
  //     .then(body => {
  //       return body;
  //     })
  //     .then(res => {
  //       console.log(res);
  //       setUserInfo(res);
  //       // setEventsList(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   userService
  //     .getAllEventsOfCureentlyLogedInUser()
  //     .then(body => {
  //       return body;
  //     })
  //     .then(res => {
  //       console.log(res);
  //       setMyEvent(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

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
      surname: { ...editableUserInfo.surname, value: editableUserInfo.teempSurname, err: [] }
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

  const listOfFriends = () => {
    return (
      <div>
        <PaginatedContainer
          title="Friends"
          items={friends}
          perPage={5}
          render={({ items }) =>
            items.map(ev => (
              <UserCard key={ev.username} username={ev.username} showControlls>
                <Button classes="btn-orangeGradient btn-sm">remove</Button>
              </UserCard>
            ))
          }
        />
        <PaginatedContainer
          title="Friend Requests"
          items={friendsRequests}
          perPage={5}
          render={({ items }) =>
            items.map(ev => (
              <UserCard key={ev.username} username={ev.username} showControlls>
                <Button classes="btn-blueGradient btn-sm">accept</Button>
              </UserCard>
            ))
          }
        />
      </div>
    );
  };
  const showFriendsInModal = () => {
    setform({ renderForm: listOfFriends(), show: true });
  };

  const changeAvatarInModal = () => {
    setform({ renderForm: <ChangeAvatarContainer />, show: true });
  };

  return (
    <div className="profileRootContainer">
      <div className="ProfileCard">
        <div className="Avatar-section">
          <Avatar imageLink={userInfo.picUrl} />
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
              classes={editState && "input-blue"}
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
          {`friends • ${friends.length}`}
        </Button>
      </div>
      <div className="event-section">
        <PaginatedContainer
          title="My Events"
          items={events}
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
          items={events}
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
