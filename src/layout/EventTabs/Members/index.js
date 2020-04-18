import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { FormContext } from "../../../context/FormContext";
import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./Members.scss";

import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import PaginatedContainer from "../../../components/PaginatedContainer";

import { eventService } from "../../../Authentication/service";
import InviteUserFormContainer from "./InviteUserFormContainer";
import Spinner from "../../../components/Spinner";

const Members = ({ id }) => {

  const isUserAdmin = useState(true)[0];

  const [, setform] = useContext(FormContext);
  const [eventMemebers, seEventMemebers] = useState({ members: [], spinner: true });
  const [eventRequests, seEventRequests] = useState({ members: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;

    eventService.getEventPendingInvitations(id)
      .then(res => {
        console.log(res);
        if (__isMounted) {
          seEventRequests({ members: res, spinner: false });
        }
      })

    eventService.getEventMembers(id)
      .then(res => {
        console.log(res);
        if (__isMounted) {
          seEventMemebers({ members: res, spinner: false });
        }
      }, err => {
        console.log(err);
      })


    return () => {
      __isMounted = false;
    };
  }, []);

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={id} /> });
  };

  const kickUsers = (userId) => {
    seEventMemebers({ members: eventMemebers.members.filter(prod => prod.id !== userId), spinner: false })

  }
  const ignoreRequest = (userId) => {
    seEventRequests({ members: eventRequests.members.filter(prod => prod.id !== userId), spinner: false })

  }
  const acceptUsers = (userId) => {
    const tempMembersList = eventMemebers.members;
    const acceptedMember = eventRequests.members.filter(prod => prod.id === userId)[0];
    tempMembersList.push(acceptedMember);
    seEventRequests({ members: eventRequests.members.filter(prod => prod.id !== userId), spinner: false })
    seEventMemebers({ members: tempMembersList, spinner: false })
  }


  return (
    <div className="members-container">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      <PaginatedContainer
        title={`Pending requests ● ${eventRequests.members.length}`}
        items={eventRequests.members}
        perPage={4}
        render={
          eventRequests.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard key={ev.user.username} username={ev.user.username} imageUrl={ev.user.picUrl} showControlls={isUserAdmin}>
                  <Button clicked={() => ignoreRequest(ev.user.id)} classes="btn-orangeGradient btn-sm">
                    <i className="fas fa-times-circle" />
                  </Button>
                  <Button clicked={() => acceptUsers(ev.user.id)} classes="btn-blueGradient btn-sm">
                    <i className="fas fa-check-circle" />
                  </Button>
                </UserCard>
              ))
        }
      />

      <PaginatedContainer
        title={`Members ● ${eventMemebers.members.length}`}
        items={eventMemebers.members}
        perPage={3}
        render={
          eventMemebers.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard key={ev.username} username={ev.username} imageUrl={ev.picUrl} showControlls={isUserAdmin}>
                  <Button clicked={() => kickUsers(ev.id)} classes="btn-orangeGradient btn-sm">
                    <i className="fas fa-user-times" />
                  </Button>
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
