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
  // const [members, setMembers] = useState([]);
  // const [requests, setrequests] = useState(requestsFoThisEvent);
  const isUserAdmin = useState(true)[0];

  useEffect(() => {
    //   userService
    //     .getAllUsersFromGivenEvent(id)
    //     .then(body => {
    //       return body;
    //     })
    //     .then(res => {
    //       console.log(res);
    //       setMembers(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    //   userService
    //     .isUserAdminOfGivenEvent(id)
    //     .then(body => {
    //       return body;
    //     })
    //     .then(res => {
    //       console.log(res);
    //       if (res.message == "true") {
    //         setUserAdmin({ isAdmin: true });
    //       }
    //       // setMembers(res);
    //       // setEventsList(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    return () => {
      console.log("unoounted ");
    };
  }, []);

  const setform = useContext(FormContext)[1];

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={id} /> });
  };

  return (
    <div className="MembersContainer">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <PaginatedContainer
        title={`Pending requests ● ${requestsFoThisEvent.length}`}
        items={requestsFoThisEvent}
        perPage={4}
        render={({ items }) =>
          items.map(ev => (
            <UserCard
              key={ev.username}
              username={ev.username}
              showControlls={isUserAdmin}
            >
              <Button classes="btn-blueGradient btn-sm">accept</Button>
            </UserCard>
          ))
        }
      />

      <PaginatedContainer
        title={`Members ● ${membersOfTheEvent.length}`}
        items={membersOfTheEvent}
        perPage={3}
        render={({ items }) =>
          items.map(ev => (
            <UserCard
              key={ev.username}
              username={ev.username}
              showControlls={isUserAdmin}
            >
              <Button classes="btn-orangeGradient btn-sm">kick</Button>
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
