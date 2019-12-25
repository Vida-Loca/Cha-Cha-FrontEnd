import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Members.scss";
import { FormContext } from "../../../context/FormContext";
import inviteUser from "./FormsToBeRendered/FormsToBeRendered";
import { membersOfTheEvent, requestsFoThisEvent } from "./Data/TempData";

import UserTile from "../../../components/UserTile/UserTile";
import Button from "../../../components/button/Button";

const Members = ({ openModal }) => {
  const [members, setMembers] = useState(membersOfTheEvent);
  const [requests, setrequests] = useState(requestsFoThisEvent);

  const setform = useContext(FormContext)[1];

  const openModalToInviteUser = () => {
    setform({ renderForm: inviteUser() });
    openModal();
  };

  return (
    <div className="MembersContainer">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <h2>Pending requests ● {requests.length}</h2>
      {requests.map(member => {
        return (
          <UserTile
            username={member.username}
            buttonName="accept"
            buttonClass="btn-blueGradient btn-sm"
            key={member.username}
          />
        );
      })}

      <h2>Members ● {members.length}</h2>
      {members.map(member => {
        return (
          <UserTile
            username={member.username}
            buttonName="kick"
            buttonClass="btn-orangeGradient btn-sm"
            key={member.username}
          />
        );
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
