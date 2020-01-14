import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../context/FormContext";
import { UserContext } from "../../context/UserContext";
import { authenticationService } from "../../Authentication/service";
import Button from "../../components/button/Button";
import TextInput from "../../components/Inputs/TextInput/TextInput";
import Form from "../../components/Form/Form";
import EventCard from "../../components/EventCard/EventCard";
import Pagination from "../../components/Pagination/Pagination";
import { tempEvents } from "./Data/TempData";

import "./Profile.scss";

const Profile = props => {
  const setform = useContext(FormContext)[1];
  const [user, setuser] = useContext(UserContext);
  const [myEvents] = useState(tempEvents);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myEvents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const ProfileForm = () => {
    return (
      <Form>
        <TextInput placeholder="name" name="name" />
        <TextInput placeholder="surname" name="surname" />
        <TextInput placeholder="email" name="email" />
        <TextInput placeholder="password" name="password" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          update
        </Button>
      </Form>
    );
  };

  const insideProfile = () => {
    setform({ renderForm: ProfileForm(), show: true });
  };

  const LogOut = () => {
    authenticationService.logout();
    setuser({ isLoggedIn: false, break: true });
  };

  return (
    <div className="profileRootContainer">
      <div>
        <img
          src="https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
          alt=""
        />
        <div className="information">
          <span className="username">@Heylee</span>
          <div>
            <Button clicked={insideProfile} classes="btn-sm btn-blueGradient">
              Edit Profile
            </Button>
          </div>
          <div className="icon-span">
            <i className="fas fa-calendar-alt" />
            <span>joined 10-12-2009</span>
          </div>
          <div className="icon-span">
            <i className="fas fa-users" />
            <span>Friends 20</span>
            <Button clicked={LogOut} classes="btn-sm btn-orangeGradient">
              Log out
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2>My Events</h2>
        {currentPosts.map(event => {
          return (
            <EventCard
              id={event.id}
              key={event.name}
              name={event.name}
              location={event.location}
              date={event.date}
            />
          );
        })}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myEvents.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

Profile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Profile;
