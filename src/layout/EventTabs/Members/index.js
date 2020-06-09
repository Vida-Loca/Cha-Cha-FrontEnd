/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";
import { FlashMessageContext } from "../../../context/FlashMessageContext";
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
  const [, setFlashMessage] = useContext(FlashMessageContext);
  const [loggedInUser] = useContext(UserContext);
  const [eventMemebers, setEventMemebers] = useState({ members: [], spinner: true });
  const [eventRequests, seEventRequests] = useState({ members: [], spinner: true });
  const [sentRequests, seSentRequests] = useState({ members: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;
    if (isEventAdmin) {
      eventService.getEventPendingInvitations(eventId)
        .then((res) => {
          console.log(res);
          if (__isMounted) {
            seSentRequests({ members: res, spinner: false });
          }
        })
        .catch(() => {});
      eventService.getAllEventsRequests(eventId)
        .then((res) => {
          if (__isMounted) {
            seEventRequests({ members: res, spinner: false });
          }
        });
    }

    eventService.getEventMembers(eventId)
      .then((res) => {
        if (__isMounted) {
          setEventMemebers({ members: res, spinner: false });
        }
      })
      .catch(() => {});

    return () => {
      __isMounted = false;
    };
  }, [eventId]);

  const openModalToInviteUser = () => {
    setform({ show: true, renderForm: <InviteUserFormContainer id={eventId} /> });
  };

  const kickUsers = (userId, username) => {
    eventService.kickUserFromEvent(eventId, userId)
      .then(() => {
        setEventMemebers({
          members: eventMemebers.members.filter((prod) => prod.id !== userId),
          spinner: false,
        });
        setFlashMessage({
          message: `successfully kicked user ${username}`,
          show: true,
          messageState: "success",
        });
      }, () => {
        setFlashMessage({
          message: "there has been a problem with kicking this user",
          show: true,
          messageState: "error",
        });
      });
  };
  const ignoreRequest = (userId, invitationId) => {
    eventService.rejectRequest(invitationId)
      .then(() => {
        seEventRequests({
          members: eventRequests.members.filter((invitation) => invitation.id !== invitationId),
          spinner: false,
        });
      })
      .catch(() => {});
  };

  const cancelInvitation = (userId, invitationId) => {
    eventService.rejectEventInvitation(invitationId)
      .then((res) => {
        console.log(res);
        seSentRequests({
          members: sentRequests.members.filter((invitation) => invitation.id !== invitationId),
          spinner: false,
        });
      })
      .catch(() => {});
  };

  const acceptUsers = (userId, invitationId, username) => {
    eventService.acceptRequest(invitationId)
      .then(() => {
        const tempMembersList = eventMemebers.members;
        const acceptedMember = eventRequests.members.filter((prod) => prod.user.id === userId)[0];
        tempMembersList.push(acceptedMember.user);
        seEventRequests({
          members: eventRequests.members.filter((prod) => prod.user.id !== userId),
          spinner: false,
        });
        setEventMemebers({ members: tempMembersList, spinner: false });
        setFlashMessage({
          message: `accepted ${username} request to join this event`,
          show: true,
          messageState: "success",
        });
      }, () => {
        setFlashMessage({
          message: `there has been a problme accepting ${username} request to join this event`,
          show: true,
          messageState: "error",
        });
      });
  };


  return (
    <div className="members-container">
      {
        (isEventAdmin || eventType === "NORMAL" || eventType === "PUBLIC")
        && (
        <Button clicked={openModalToInviteUser} classes="btn-blueGradient btn-md">
          + Invite User
        </Button>
        )
      }

      {(isEventAdmin && eventRequests.members.length > 0)
        && (
        <PaginatedContainer
          title={`Requests to join ● ${eventRequests.members.length}`}
          items={eventRequests.members}
          perPage={4}
          render={
            eventRequests.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <UserCard
                  key={ev.user.username}
                  username={ev.user.username}
                  imageUrl={ev.user.picUrl}
                  isBanned={ev.user.banned}
                  showControlls
                >
                  <Button clicked={() => ignoreRequest(ev.user.id, ev.id)} classes="btn-orangeGradient-icon btn-sm">
                    <i className="fas fa-times-circle" />
                  </Button>
                  <Button clicked={() => acceptUsers(ev.user.id, ev.id, ev.user.username)} classes="btn-blueGradient-icon btn-sm">
                    <i className="fas fa-check-circle" />
                  </Button>
                </UserCard>
              ))
          }
        />
        )}

      {(isEventAdmin && sentRequests.members.length > 0)
        && (
        <PaginatedContainer
          title={`Sent requests ● ${sentRequests.members.length}`}
          items={sentRequests.members}
          perPage={4}
          render={
            sentRequests.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <UserCard
                  key={ev.user.username}
                  username={ev.user.username}
                  imageUrl={ev.user.picUrl}
                  isBanned={ev.user.banned}
                  showControlls
                >
                  <Button clicked={() => cancelInvitation(ev.user.id, ev.id)} classes="btn-orangeGradient-icon btn-sm">
                    <i className="fas fa-times-circle" />
                  </Button>
                </UserCard>
              ))
          }
        />
        )}


      <PaginatedContainer
        title={`Members ● ${eventMemebers.members.length}`}
        items={eventMemebers.members}
        perPage={3}
        render={
          eventMemebers.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                key={ev.username}
                username={ev.username}
                isBanned={ev.banned}
                imageUrl={ev.picUrl}
                showControlls={isEventAdmin}
              >
                {loggedInUser.user.id !== ev.id && (
                <Button clicked={() => kickUsers(ev.id, ev.username)} classes="btn-orangeGradient-icon btn-sm">
                  <i className="fas fa-user-times" />
                </Button>
                )}
              </UserCard>
            ))
        }
      />
    </div>
  );
};

Members.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
};

export default Members;
