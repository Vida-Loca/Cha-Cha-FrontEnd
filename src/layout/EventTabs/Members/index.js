import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { FormContext } from "../../../context/FormContext";
import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./Members.scss";

import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import PaginatedContainer from "../../../components/PaginatedContainer";

// import { userService } from "../../../Authentication/service";
import InviteUserFormContainer from "./InviteUserFormContainer";

const Members = ({ id }) => {
  const isUserAdmin = useState(true)[0];

  const setform = useContext(FormContext)[1];
  const [eventMemebers, seEventMemebers] = useState([]);
  const [eventRequests, seEventRequests] = useState([]);

  useEffect(() => {

    setTimeout(() => {
      seEventMemebers(membersOfTheEvent);
      seEventRequests(requestsFoThisEvent);
    }, 1000);

  }, []);

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={id} /> });
  };

  const kickUsers = (username) => {
    setTimeout(() => {
      console.log(`kicking user ... ${username}`)
    }, 2000);
  }
  const acceptUsers = (username) => {
    setTimeout(() => {
      console.log(`accepting user ... ${username}`)
    }, 2000);
  }


  return (
    <div className="MembersContainer">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <PaginatedContainer
        title={`Pending requests ● ${eventMemebers.length}`}
        items={eventMemebers}
        perPage={4}
        render={({ items }) =>
          items.map(ev => (
            <UserCard key={ev.username} username={ev.username} showControlls={isUserAdmin}>
              <Button clicked={() => acceptUsers(ev.username)} classes="btn-blueGradient btn-sm">accept</Button>
            </UserCard>
          ))
        }
      />

      <PaginatedContainer
        title={`Members ● ${eventRequests.length}`}
        items={eventRequests}
        perPage={3}
        render={({ items }) =>
          items.map(ev => (
            <UserCard key={ev.username} username={ev.username} showControlls={isUserAdmin}>
              <Button clicked={() => kickUsers(ev.username)} classes="btn-orangeGradient btn-sm">kick</Button>
            </UserCard>
          ))
        }
      />
    </div>
  );
};

Members.propTypes = {
  id: PropTypes.string.isRequired
};

export default Members;
