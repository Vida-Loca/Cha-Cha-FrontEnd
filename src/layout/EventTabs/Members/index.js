import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";
// import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./Members.scss";

import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import PaginatedContainer from "../../../components/PaginatedContainer";

import { eventService } from "../../../Authentication/service";
import InviteUserFormContainer from "./InviteUserFormContainer";
import Spinner from "../../../components/Spinner";


const Members = ({ eventId, eventType, isEventAdmin }) => {


  const [, setform] = useContext(FormContext);
  const [loggedInUser,] = useContext(UserContext);
  const [eventMemebers, setEventMemebers] = useState({ members: [], spinner: true });
  const [eventRequests, seEventRequests] = useState({ members: [], spinner: true });
  const [sentRequests, seSentRequests] = useState({ members: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;
    if (isEventAdmin) {
      eventService.getEventPendingInvitations(eventId)
        .then(res => {
          if (__isMounted) {
            seSentRequests({ members: res, spinner: false });
          }
        }, err => {
          console.log(err);
        })
      eventService.getAllEventsRequests(eventId)
        .then(res => {
          if (__isMounted) {
            seEventRequests({ members: res, spinner: false });
          }
        })
    }

    eventService.getEventMembers(eventId)
      .then(res => {
        if (__isMounted) {
          setEventMemebers({ members: res, spinner: false });
        }
      }, err => {
        console.log(err);
      })

    return () => {
      __isMounted = false;
    };
  }, [eventId]);

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={eventId} /> });
  };

  const kickUsers = (userId) => {
    eventService.kickUserFromEvent(eventId, userId)
      .then(res => {
        setEventMemebers({ members: eventMemebers.members.filter(prod => prod.id !== userId), spinner: false })
      }, err => {
        console.log(err);
      })

  }
  const ignoreRequest = (userId, invitationId) => {
    eventService.rejectEventInvitation(invitationId)
      .then(res => {
        seEventRequests({ members: eventRequests.members.filter(prod => prod.id !== userId), spinner: false })
      }, err => {
        console.log(err);
      })

  }
  const acceptUsers = (userId, invitationId) => {
    eventService.acceptRequest(invitationId)
      .then(res => {
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
      {
        (isEventAdmin || eventType === "NORMAL" || eventType === "PUBLIC")
        && <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
          + Invite User
        </Button>
      }

      {(isEventAdmin && eventRequests.members.length > 0) &&
        <PaginatedContainer
          title={`Requests to join ● ${eventRequests.members.length}`}
          items={eventRequests.members}
          perPage={4}
          render={
            eventRequests.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <UserCard key={ev.user.username} username={ev.user.username} imageUrl={ev.user.picUrl} showControlls>
                    <Button clicked={() => ignoreRequest(ev.user.id, ev.id)} classes="btn-orangeGradient-icon btn-sm">
                      <i className="fas fa-times-circle" />
                    </Button>
                    <Button clicked={() => acceptUsers(ev.user.id, ev.id)} classes="btn-blueGradient-icon btn-sm">
                      <i className="fas fa-check-circle" />
                    </Button>
                  </UserCard>
                ))
          }
        />
      }

      {(isEventAdmin && sentRequests.members.length > 0) &&
        <PaginatedContainer
          title={`Sent requests ● ${sentRequests.members.length}`}
          items={sentRequests.members}
          perPage={4}
          render={
            sentRequests.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map(ev => (
                  <UserCard key={ev.user.username} username={ev.user.username} imageUrl={ev.user.picUrl} showControlls>
                    <Button clicked={() => ignoreRequest(ev.user.id, ev.id)} classes="btn-orangeGradient-icon btn-sm">
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
                <UserCard key={ev.username} username={ev.username} imageUrl={ev.picUrl} showControlls={isEventAdmin}>
                  {loggedInUser.user.id !== ev.id &&
                  <Button clicked={() => kickUsers(ev.id)} classes="btn-orangeGradient-icon btn-sm">
                     <i className="fas fa-user-times" />
                  </Button>}
                </UserCard>
              ))
        }
      />
    </div>
  );
};

Members.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired
};

export default Members;
