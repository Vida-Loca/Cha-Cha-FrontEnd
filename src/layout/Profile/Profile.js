import React, { useContext, useState } from "react";

import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService } from "../../Authentication/service";
// import { userService } from "../../Authentication/service";

import { tempEvents } from "./Data/TempData";
import "./Profile.scss";

import { Button } from "../../components/Button";
import { TextInput } from "../../components/Inputs";
import EventCard from "../../components/EventCard";
import Pagination from "../../components/Pagination/Pagination";

import Modal from "../../components/Modal";
import Avatar from "../../components/Avatar";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "user",
    name: "name",
    surname: "surname",
    email: "email@email.com"
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
  // const [myEvents] = useState(tempEvents);

  // const [status, setstatu] = useState({ kek: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tempEvents.slice(indexOfFirstPost, indexOfLastPost);

  const onChangeHandler = event => {
    setUserInfo({ ...userInfo, [`${event.target.name}`]: event.target.value });
    console.log(userInfo);
  };

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const ProfileForm = () => {
    return (
      <div>
        <TextInput
          onChange={onChangeHandler}
          placeholder="username"
          name="username"
        />
        <TextInput
          onChange={onChangeHandler}
          placeholder="email"
          name="email"
        />
        <TextInput onChange={onChangeHandler} placeholder="name" name="name" />
        <TextInput
          onChange={onChangeHandler}
          placeholder="surname"
          name="surname"
        />
        <Button to="/home" classes="btn-blueGradient btn-md">
          update
        </Button>
      </div>
    );
  };

  const insideProfile = () => {
    setform({ renderForm: ProfileForm(), show: true });
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
        {ProfileForm()}
      </Modal>
      <div>
        <Avatar imageLink={userInfo.picUrl} />
        <div className="information">
          <span className="username">{`@${userInfo.username}`}</span>

          <div className="logout-btn">
            <Button clicked={LogOut} classes="btn-sm btn-orangeGradient">
              Log out
            </Button>
            <Button clicked={insideProfile} classes="btn-sm btn-blueGradient">
              Edit Profile
            </Button>
          </div>
          <div className="icon-span">
            <i className="fas fa-address-card" />
            <span>{userInfo.name}</span>
          </div>
          <div className="icon-span">
            <i className="fas fa-address-card" />
            <span>{userInfo.surname}</span>
          </div>
          <div className="icon-span">
            <i className="fas fa-envelope" />
            <span>{userInfo.email}</span>
          </div>
          <div className="icon-span">
            <i className="fas fa-calendar-alt" />
            <span>
              {`Date Joined ${
                userInfo.joined
                  ? userInfo.joined.substring(0, 10)
                  : "not specified"
              }`}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2>My Events</h2>
        {currentPosts !== [] ? (
          currentPosts.map(event => {
            return (
              <EventCard
                id={event.event_id}
                key={event.event_id}
                name={event.name}
                date={event.startDate}
                location={`${event.address.city}, ${event.address.street}, ${event.address.number}, ${event.address.postcode}`}
              />
            );
          })
        ) : (
          <h3>You have no events</h3>
        )}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={tempEvents.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Profile;
