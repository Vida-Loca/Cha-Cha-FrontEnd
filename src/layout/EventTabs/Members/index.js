import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { UserContext } from "../../../context/UserContext";
import { FormContext } from "../../../context/FormContext";
// import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./Members.scss";

import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import PaginatedContainer from "../../../components/PaginatedContainer";

import { eventService } from "../../../Authentication/service";
import InviteUserFormContainer from "./InviteUserFormContainer";
import Spinner from "../../../components/Spinner";


const Members = ({ id }) => {


  const [, setform] = useContext(FormContext);
  const [loggedInUser,] = useContext(UserContext);
  const [eventMemebers, setEventMemebers] = useState({ members: [], spinner: true });
  const [eventRequests, seEventRequests] = useState({ members: [], spinner: true });
  const [sentRequests, seSentRequests] = useState({ members: [], spinner: true });
  const [isAuthorized, setAuthorization] = useState(false);

  useEffect(() => {
    let __isMounted = true;

    eventService.isCurrentUserAdminOfEvent(id)
      .then(res => {
        setAuthorization(isAuthorized || res || loggedInUser.isAdmin);
        console.log(`ev: ${res}`);
      }, err => {
        console.log(err);
      })

    eventService.getEventPendingInvitations(id)
      .then(res => {
        console.log(res);
        if (__isMounted) {
          seSentRequests({ members: res, spinner: false });
        }
      }, err => {
        console.log(err);
      })
    eventService.getAllEventsRequests(id)
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
          setEventMemebers({ members: res, spinner: false });
        }
      }, err => {
        console.log(err);
      })


    return () => {
      __isMounted = false;
    };
  }, [id]);

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={id} /> });
  };

  const kickUsers = (userId) => {
    eventService.kickUserFromEvent(userId, userId)
      .then(res => {
        console.log(res);
        setEventMemebers({ members: eventMemebers.members.filter(prod => prod.id !== userId), spinner: false })

      }, err => {
        console.log(err);
      })

  }
  const ignoreRequest = (userId, invitationId) => {
    eventService.rejectEventInvitation(invitationId)
      .then(res => {
        console.log(res);
        seEventRequests({ members: eventRequests.members.filter(prod => prod.id !== userId), spinner: false })

      }, err => {
        console.log(err);
      })

  }
  const acceptUsers = (userId, invitationId) => {
    eventService.acceptRequest(invitationId)
      .then(res => {
        console.log(res);
        const tempMembersList = eventMemebers.members;
        const acceptedMember = eventRequests.members.filter(prod => prod.user.id === userId)[0];
        tempMembersList.push(acceptedMember.user);
        seEventRequests({ members: eventRequests.members.filter(prod => prod.user.id !== userId), spinner: false })
        setEventMemebers({ members: tempMembersList, spinner: false })
      }, err => {
        console.log(err);
      })


  }


  return (
    <div className="members-container">
      <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
        + Invite User
      </Button>
      {isAuthorized &&
        <PaginatedContainer
          title={`Requests to join ● ${eventRequests.members.length}`}
          items={eventRequests.members}
          perPage={4}
          render={
            eventRequests.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <UserCard key={ev.user.username} username={ev.user.username} imageUrl={ev.user.picUrl} showControlls={isAuthorized}>
                    <Button clicked={() => ignoreRequest(ev.user.id, ev.id)} classes="btn-orangeGradient btn-sm">
                      <i className="fas fa-times-circle" />
                    </Button>
                    <Button clicked={() => acceptUsers(ev.user.id, ev.id)} classes="btn-blueGradient btn-sm">
                      <i className="fas fa-check-circle" />
                    </Button>
                  </UserCard>
                ))
          }
        />
      }

      {isAuthorized &&
        <PaginatedContainer
          title={`Sent requests ● ${sentRequests.members.length}`}
          items={sentRequests.members}
          perPage={4}
          render={
            sentRequests.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <UserCard key={ev.user.username} username={ev.user.username} imageUrl={ev.user.picUrl} showControlls={isAuthorized}>
                    <Button clicked={() => ignoreRequest(ev.user.id, ev.id)} classes="btn-orangeGradient btn-sm">
                      <i className="fas fa-times-circle" />
                    </Button>
                  </UserCard>
                ))
          }
        />
      }


      <PaginatedContainer
        title={`Members ● ${eventMemebers.members.length}`}
        items={eventMemebers.members}
        perPage={3}
        render={
          eventMemebers.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard key={ev.username} username={ev.username} imageUrl={ev.picUrl} showControlls={isAuthorized}>
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
