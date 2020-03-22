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
import Spinner from "../../../components/Spinner";

const Members = ({ id }) => {
  let __isMounted = false

  const isUserAdmin = useState(true)[0];

  const [, setform] = useContext(FormContext);
  const [eventMemebers, seEventMemebers] = useState({ members: [], spinner: true });
  const [eventRequests, seEventRequests] = useState({ members: [], spinner: true });

  useEffect(() => {
    __isMounted = true;

    setTimeout(() => {
      if (__isMounted) {
        seEventMemebers({ members: membersOfTheEvent, spinner: false });
        seEventRequests({ members: requestsFoThisEvent, spinner: false });
      }

    }, 1000);
    return () => {
      __isMounted = false;
    };
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
    <div className="members-container">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <PaginatedContainer
        title={`Pending requests ● ${eventMemebers.members.length}`}
        items={eventMemebers.members}
        perPage={4}
        render={
          eventMemebers.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard key={ev.username} username={ev.username} showControlls={isUserAdmin}>
                  <Button clicked={() => acceptUsers(ev.username)} classes="btn-blueGradient btn-sm">accept</Button>
                </UserCard>
              ))
        }
      />

      <PaginatedContainer
        title={`Members ● ${eventRequests.members.length}`}
        items={eventRequests.members}
        perPage={3}
        render={
          eventRequests.spinner
            ? () => <Spinner />
            : ({ items }) =>
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
