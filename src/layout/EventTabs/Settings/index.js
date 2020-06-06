/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../../context/FormContext";
import { FlashMessageContext } from "../../../context/FlashMessageContext";

import { history } from "../../../Authentication/helper";
import { OptionsInput, TextInput } from "../../../components/Inputs";
import { Button, EditButton } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import LeaveEventContainer from "./LeaveEventContainer";
import EndEventContainer from "./EndEventContainer";

import { currencyCodes } from "./currencyList";

import { eventService } from "../../../Authentication/service";

// import { requestsFoThisEvent } from "../../../mockData";

import "./settings.scss";

const Settings = ({ eventId, isEventAdmin }) => {
  const [, setform] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const [editState, setEdit] = useState(false);

  const [members, setMembers] = useState({ users: [], spinner: true });
  const [admins, setAdmins] = useState({ users: [], spinner: true });

  const [eventInfo, setEventInfo] = useState(
    {
      event: {
        name: "Loading...",
        currency: "Loading...",
        eventType: "Loading...",
      },
      spinner: true,
      fullEvent: {},
    },
  );


  useEffect(() => {
    let __isMounted = true;

    eventService.getEventByID(eventId)
      .then((res) => {
        if (__isMounted) {
          setEventInfo({
            event: {
              name: res.name,
              currency: res.currency,
              eventType: res.eventType,
            },
            spinner: false,
            fullEvent: res,
          });
        }
      }, (err) => {
        console.log(err);
        setEventInfo({ ...eventInfo, spinner: false });
      });
    if (isEventAdmin) {
      Promise.all([eventService.getEventMembers(eventId), eventService.getAllEventAdmins(eventId)])
        .then((res) => {
          if (__isMounted) {
            setMembers({
              users: res[0].filter((user) => res[1]
                .filter((admin) => admin.id === user.id).length <= 0),
              spinner: false,
            });
            setAdmins({ users: res[1], spinner: false });
          }
        });
    }

    return () => {
      __isMounted = false;
    };
  }, [eventId]);

  const editHandler = () => {
    setEdit(!editState);
  };

  const onChangeHandler = (event) => {
    setEventInfo({
      ...eventInfo, event: { ...eventInfo.event, [`${event.target.name}`]: event.target.value },
    });
  };


  const confirmEventDeletion = () => {
    eventService.deleteEvent(eventId)
      .then(() => {
        setFlashMessage({
          message: "event successfully deleted",
          show: true,
          messageState: "success",
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        editHandler();
        setFlashMessage({
          message: "there has been a problem with deleting this event",
          show: true,
          messageState: "error",
        });
      });
  };

  const endEventOpenModal = () => {
    setform({
      show: true,
      renderForm: <EndEventContainer eventId={eventId} currentEvent={eventInfo.fullEvent} />,
    });
  };

  const promoteToAdmin = (userId, username) => {
    eventService.promoteToEventAdmin(eventId, userId)
      .then(() => {
        const tempAdminsList = admins.users;
        const foundUser = members.users.filter((user) => user.id === userId)[0];
        tempAdminsList.push(foundUser);
        setMembers({ users: members.users.filter((user) => user.id !== userId), spinner: false });
        setAdmins({ users: tempAdminsList, spinner: false });
      }, (err) => {
        console.log(err);
        setFlashMessage({
          message: `there has been a problem promoting user ${username} to admin`,
          show: true,
          messageState: "error",
        });
      });
  };

  const saveChanges = () => {
    if (eventInfo.event.name.length > 0) {
      setEventInfo({ ...eventInfo, spinner: true });
      const updatedEvent = {
        ...eventInfo.fullEvent,
        startTime: eventInfo.fullEvent.startTime !== undefined ? eventInfo.fullEvent.startTime.replace(" ", "T") : "",
        name: eventInfo.event.name,
        currency: eventInfo.event.currency,
        eventType: eventInfo.event.eventType,
      };
      eventService.updateEvent(eventId, updatedEvent).then(() => {
        setEventInfo({ ...eventInfo, spinner: false });
        setFlashMessage({
          message: "changes saved",
          show: true,
          messageState: "success",
        });
      }, (err) => {
        console.log(err);
        setEventInfo({ ...eventInfo, spinner: false });
        setFlashMessage({
          message: "there has been a problem with saving changes",
          show: true,
          messageState: "error",
        });
      });
    } else {
      setFlashMessage({
        message: "some fields are invalid",
        show: true,
        messageState: "warning",
      });
    }
  };

  const openModalToLeaveEvent = () => {
    setform({ show: true, renderForm: <LeaveEventContainer eventId={eventId} /> });
  };

  return (
    <div className="settings-container">
      <div className="settings-btn-container">
        <Button clicked={openModalToLeaveEvent} classes="btn-orangeGradient btn-md">
          <i className="fas fa-sign-out-alt" />
          {" "}
          Leave Event
        </Button>
        {isEventAdmin && !eventInfo.fullEvent.over && (
          <Button clicked={endEventOpenModal} classes="btn-blueGradient btn-md">
            <i className="fas fa-check-square" />
            {" "}
            end event
          </Button>
        )}
      </div>

      {
      // eslint-disable-next-line operator-linebreak
      isEventAdmin &&
        <>
          <div className="name-box">
            <h3>Event Name</h3>
            <TextInput
              onChange={onChangeHandler}
              placeholder=""
              name="name"
              value={eventInfo.event.name}
              size="input-md"
              classes="input-blue"
              error=""
            />
          </div>
          <div className="privacy-box">
            <h3>Privacy</h3>
            <OptionsInput classes="input-md option-md option-blue" onChange={onChangeHandler} value={eventInfo.event.eventType} name="eventType" options={["PRIVATE", "PUBLIC", "NORMAL", "SECRET"]} />
          </div>
          <div className="currency-box">
            <h3>Currency</h3>
            <OptionsInput classes="input-md option-md option-blue" onChange={onChangeHandler} value={eventInfo.event.currency} name="currency" options={currencyCodes} />
          </div>
          <div className="save-btn">
            {eventInfo.spinner
              ? <Spinner classes="spinner-container-h-sm" size="spinner-sm" />
              : <Button clicked={saveChanges} classes="btn-blueGradient btn-sm">Save changes</Button>}
          </div>
          <div className="delete-box">
            <h3>Delete Event</h3>
            <EditButton
              options={editState}
              activate={editHandler}
              cancel={editHandler}
              confirm={confirmEventDeletion}
              tags
              render={
                <>
                  <i className="far fa-trash-alt" />
                  Delete
                </>
            }
            />
          </div>
          <div className="admin-members-box">
            <h3>Event Admins</h3>
            <PaginatedContainer
              title=""
              items={admins.users}
              perPage={5}
              render={
                admins.spinner
                  ? () => <Spinner />
                  : ({ items }) => items.map((ev) => (
                    <UserCard key={ev.username} username={ev.username} showControlls>
                    </UserCard>
                  ))
              }
            />

            <h3>Event Members</h3>
            <PaginatedContainer
              title=""
              items={members.users}
              perPage={5}
              render={
                members.spinner
                  ? () => <Spinner />
                  : ({ items }) => items.map((ev) => (
                    <UserCard
                      key={ev.username}
                      isBanned={ev.banned}
                      username={ev.username}
                      showControlls
                    >
                      {!ev.banned && <Button clicked={() => promoteToAdmin(ev.id, ev.username)} classes="btn-secondary-orange btn-sm">promote</Button>}
                    </UserCard>
                  ))
}
            />
          </div>
        </>
      }


    </div>
  );
};

Settings.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
};

export default Settings;
