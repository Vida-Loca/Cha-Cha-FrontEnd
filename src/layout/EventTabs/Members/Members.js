import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { FormContext } from "../../../context/FormContext";
import { membersOfTheEvent, requestsFoThisEvent } from "./Data/TempData";

import "./Members.scss";

// import inviteUser from "./FormsToBeRendered/FormsToBeRendered";

import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import Modal from "../../../components/Modal";
import { TextInput } from "../../../components/Inputs";

import { userService } from "../../../Authentication/service";

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

  const [forms, setform] = useContext(FormContext);

  const [findUser, setfindUser] = useState({ username: "" });

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  const onChangeHandler = event => {
    setfindUser({ ...findUser, [`${event.target.name}`]: event.target.value });
    console.log(findUser);
  };

  const inviteUserPost = event => {
    event.preventDefault();
    userService
      .inviteUserTOEvent(id, findUser.username)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
        setform({ ...forms, show: false });
        // setEventsList(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const inviteUser = () => {
    return (
      <div>
        <TextInput
          onChange={onChangeHandler}
          placeholder="Username"
          name="username"
        />
        <Button clicked={inviteUserPost} classes="btn-blueGradient btn-md">
          send and invite
        </Button>
      </div>
    );
  };

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: inviteUser() });
  };

  return (
    <div className="MembersContainer">
      <Modal show={forms.show} modalClose={hideModal}>
        {inviteUser()}
      </Modal>
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <h2>{`Pending requests ● ${requestsFoThisEvent.length}`}</h2>
      {requestsFoThisEvent.map(member => {
        return (
          <UserCard
            key={member.username}
            username={member.username}
            showControlls={isUserAdmin}
          >
            <Button classes="btn-blueGradient btn-sm">accept</Button>
          </UserCard>
        );
      })}

      <h2>{`Members ● ${membersOfTheEvent.length}`}</h2>
      {membersOfTheEvent.map(member => {
        return member ? (
          <UserCard
            key={member.username}
            username={member.username}
            showControlls={isUserAdmin}
          >
            <Button classes="btn-orangeGradient btn-sm">kick</Button>
          </UserCard>
        ) : null;
      })}
    </div>
  );
};

Members.propTypes = {
  id: PropTypes.string.isRequired
};

export default Members;
