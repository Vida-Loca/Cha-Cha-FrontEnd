import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./Members.scss";
import { FormContext } from "../../../context/FormContext";
import inviteUser from "./FormsToBeRendered/FormsToBeRendered";
import { membersOfTheEvent, requestsFoThisEvent } from "./Data/TempData";

import UserTile from "../../../components/UserTile/UserTile";
import Button from "../../../components/button/Button";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";
import TextInput from "../../../components/Inputs/TextInput/TextInput";

import { userService } from "../../../Authentication/service";

const Members = ({ id }) => {
  const [members, setMembers] = useState([]);
  const [requests, setrequests] = useState(requestsFoThisEvent);

  useEffect(() => {
    userService
      .getAllUsersFromGivenEvent(id)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
        setMembers(res);
        // setEventsList(res);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      console.log("unoounted ");
    };
  }, []);

  const [forms, setform] = useContext(FormContext);

  const [findUser, setfindUser] = useState({ username: "" });

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: inviteUser() });
  };
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
      <Form>
        <TextInput
          onChange={onChangeHandler}
          placeholder="Username"
          name="username"
        />
        <Button clicked={inviteUserPost} classes="btn-blueGradient btn-md">
          send and invite
        </Button>
      </Form>
    );
  };

  return (
    <div className="MembersContainer">
      <Modal show={forms.show} modalClose={hideModal}>
        {inviteUser()}
      </Modal>
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      {/* <h2>Pending requests ● {requests.length}</h2>
      {requests.map(member => {
        return (
          <UserTile
            username={member.username}
            buttonName="accept"
            buttonClass="btn-blueGradient btn-sm"
            key={member.username}
          />
        );
      })} */}

      <h2>Members ● {members.length}</h2>
      {members.map(member => {
        return member ? (
          <UserTile
            username={member.username}
            userId={member.id}
            eventId={id}
            buttonName="kick"
            buttonClass="btn-orangeGradient btn-sm"
            key={member.username}
          />
        ) : null;
      })}
    </div>
  );
};

Members.defaultProps = {
  openModal: () => {}
};

Members.propTypes = {
  openModal: PropTypes.func
};

export default Members;
