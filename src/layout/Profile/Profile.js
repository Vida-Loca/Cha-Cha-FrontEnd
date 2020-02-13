import React, { useContext, useState } from "react";

import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService } from "../../Authentication/service";
// import { userService } from "../../Authentication/service";

import { tempEvents } from "./Data/TempData";
import { tempFriends, tempFriendsrequests } from "./Data//userfriends";
import "./Profile.scss";

import { IconButton, Button, EditButton } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Modal from "../../components/Modal";
import Avatar from "../../components/Avatar";
import UserCard from "../../components/UserCard";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "user",
    name: "name",
    surname: "surname",
    email: "email@email.com",
    tempName: "name",
    teempSurname: "surname"
    // picUrl: null
  });
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

  const [forms, setform] = useContext(FormContext);
  const setuser = useContext(UserContext)[1];
  const [editState, setEdit] = useState(false);
  const editHandler = () => {
    setEdit(!editState);
  };
  const cancelEdit = () => {
    setEdit(false);
    setUserInfo({
      ...userInfo,
      name: userInfo.tempName,
      surname: userInfo.teempSurname
    });
  };

  const onChangeHandler = event => {
    setUserInfo({ ...userInfo, [`${event.target.name}`]: event.target.value });
    console.log(userInfo);
  };

  // const FormToDisplay = null;
  const changeAvatarForm = () => {
    return (
      <div>
        <TextInput
          onChange={onChangeHandler}
          placeholder="avatarUrl"
          name="URL"
        />
        <Button classes="btn-blueGradient btn-md">update</Button>
      </div>
    );
  };

  const listOfFriends = () => {
    return (
      <div>
        <PaginatedContainer
          title="Friends"
          items={tempFriends}
          perPage={5}
          render={({ items }) =>
            items.map(ev => (
              <UserCard username={ev.username} showControlls>
                <Button classes="btn-blueGradient btn-sm">accept</Button>
              </UserCard>
            ))
          }
        />
        <PaginatedContainer
          title="Friend Requests"
          items={tempFriendsrequests}
          perPage={5}
          render={({ items }) =>
            items.map(ev => (
              <UserCard username={ev.username} showControlls>
                <Button classes="btn-blueGradient btn-sm">accept</Button>
              </UserCard>
            ))
          }
        />
      </div>
    );
  };

  const changeAvatar = () => {
    setform({ renderForm: changeAvatarForm(), show: true });
  };

  const showFriends = () => {
    setform({ renderForm: listOfFriends(), show: true });
  };

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  const LogOut = () => {
    authenticationService.logout();
    setuser({ isLoggedIn: false, break: true });
  };

  return (
    <div className="profileRootContainer">
      <Modal show={forms.show} modalClose={hideModal}>
        {changeAvatarForm()}
      </Modal>
      <div className="ProfileCard">
        <div className="Avatar-section">
          <Avatar imageLink={userInfo.picUrl} />
          <div className="editBtn">
            <IconButton clicked={changeAvatar} iconClass="fas fa-image" />
          </div>
          <span className="username">{`@${userInfo.username}`}</span>
          <Button clicked={LogOut} classes="btn-sm btn-orangeGradient">
            Log out
          </Button>
        </div>

        <div className="information-section">
          {editState ? (
            <>
              <TextInput
                onChange={onChangeHandler}
                value={userInfo.name}
                placeholder="name"
                name="name"
                size="input-sm"
                classes="input-blue"
              />
              <TextInput
                onChange={onChangeHandler}
                value={userInfo.surname}
                placeholder="surname"
                name="surname"
                size="input-sm"
                classes="input-blue"
              />
            </>
          ) : (
            <>
              <TextInput
                disabled
                value={userInfo.name}
                placeholder="name"
                name="name"
                size="input-sm"
              />
              <TextInput
                disabled
                value={userInfo.surname}
                placeholder="surname"
                name="surname"
                size="input-sm"
              />
            </>
          )}

          <TextInput
            value={userInfo.email}
            placeholder="email"
            name="email"
            size="input-sm"
            disabled
          />
          <TextInput
            value={userInfo.joined}
            placeholder="date joined"
            name="datejoined"
            size="input-sm"
            disabled
          />
          <EditButton
            options={editState}
            activate={editHandler}
            cancel={cancelEdit}
          />
        </div>
      </div>
      <div>
        <Button classes="btn-md btn-default" clicked={showFriends}>
          20 friends
        </Button>
      </div>
      <div className="event-section">
        <PaginatedContainer
          title="My Events"
          items={tempEvents}
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
          items={tempEvents}
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
