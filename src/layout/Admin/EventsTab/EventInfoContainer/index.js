/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { adminService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import { Button, EditButton } from "../../../../components/Button";
import PaginatedContainer from "../../../../components/PaginatedContainer";

import { FormContext } from "../../../../context/FormContext";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";

import "./EventInfoContainer.scss";

const EventInfoContainer = ({ eventId, removeEventFromList }) => {
  const [, setForm] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const [eventInfo, setEventInfo] = useState({
    name: "Loading...",
    eventType: "Loading...",
    over: false,
    startTime: "Loading...",
  });

  const [eventMembers, setEventMembers] = useState({ users: [], spinner: true });
  const [eventAdmins, setEventAdmins] = useState({ users: [], spinner: true });
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    adminService.getEventById(eventId)
      .then((res) => {
        setEventInfo({
          name: res.name,
          eventType: res.eventType,
          over: res.over,
          startTime: res.startTime,
        });
      })
      .catch(() => {});

    Promise.all([adminService.getAllEventUsers(eventId), adminService.getAllEventAdmins(eventId)])
      .then((res) => {
        const filterMembersList = res[0]
          .filter((memeber) => res[1]
            .findIndex((user) => user.id === memeber.id) < 0);
        setEventMembers({ users: filterMembersList, spinner: false });
        setEventAdmins({ users: res[1], spinner: false });
      }, () => {
        setFlashMessage({
          message: "there has been a problem fetching event members",
          show: true,
          messageState: "error",
        });
      });

    return () => {

    };
  }, []);

  const toggleDeleteState = () => {
    setDeleteState(!deleteState);
  };

  const confirmDeleteEvent = () => {
    adminService.deleteEvent(eventId)
      .then(() => {
        removeEventFromList(eventId);
        setForm({ renderForm: "", show: false });
        setFlashMessage({
          message: `successfuly deleted event id: ${eventId}`,
          show: true,
          messageState: "success",
        });
      }, () => {
        setFlashMessage({
          message: `error - there is a problem deleting event id: ${eventId}`,
          show: true,
          messageState: "error",
        });
      });
  };

  const kickUser = (userId) => {
    adminService.removeUserFromEvent(eventId, userId)
      .then(() => {
        setEventMembers({
          users: eventMembers.users.filter((user) => user.id !== userId),
          spinner: false,
        });
        setEventAdmins({
          users: eventAdmins.users.filter((user) => user.id !== userId),
          spinner: false,
        });
      }, () => {
        setFlashMessage({
          message: `error - there has beena problem with removing user ${userId} from event ${eventId}`,
          show: true,
          messageState: "error",
        });
      });
  };

  const promoteUserToAdmin = (userId) => {
    adminService.giveTakeUserAdmin(eventId, userId)
      .then(() => {
        const foundUser = eventMembers.users.findIndex((user) => user.id === userId);
        const tempAdminList = eventAdmins.users;
        tempAdminList.push(eventMembers.users[foundUser]);
        setEventAdmins({ users: tempAdminList, spinner: false });
        setEventMembers({
          users: eventMembers.users.filter((user) => user.id !== userId),
          spinner: false,
        });
      }, () => {
        setFlashMessage({
          message: "error - there has beena problem with promoting user to amdmin",
          show: true,
          messageState: "error",
        });
      });
  };

  const demoteUserFromAdmin = (userId) => {
    adminService.giveTakeUserAdmin(eventId, userId)
      .then(() => {
        const foundUser = eventAdmins.users.findIndex((user) => user.id === userId);
        const tempMemberList = eventMembers.users;
        tempMemberList.push(eventAdmins.users[foundUser]);
        setEventMembers({ users: tempMemberList, spinner: false });
        setEventAdmins({
          users: eventAdmins.users.filter((user) => user.id !== userId),
          spinner: false,
        });
      }, () => {
        setFlashMessage({
          message: "error - there has beena problem with promoting user to amdmin",
          show: true,
          messageState: "error",
        });
      });
  };

  return (
    <div className="event-info-container-box">
      <div className="event-quick-info">
        <span>name:</span>
        <p>{eventInfo.name}</p>
        <span>event type:</span>
        <p>{eventInfo.eventType}</p>
        <span>state:</span>
        <p>{eventInfo.over ? "finished" : "ongoing"}</p>
        <span>start date:</span>
        <p>{eventInfo.startTime.substring(0, 10)}</p>
        <EditButton
          options={deleteState}
          activate={toggleDeleteState}
          cancel={toggleDeleteState}
          confirm={confirmDeleteEvent}
          classes="delete"
          tags
          render={(
            <>
              <i className="fas fa-trash-alt" />
              delete
            </>
)}
        />
      </div>
      <div className="event-admin-list">
        <PaginatedContainer
          title="admins"
          perPage={5}
          items={eventAdmins.users}
          render={
            eventAdmins.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <div key={ev.username} className="user-card">
                  <span className="username">{ev.username}</span>
                  <Button clicked={() => demoteUserFromAdmin(ev.id)} classes="admin active"><i className="fas fa-star" /></Button>
                  <Button clicked={() => kickUser(ev.id)} classes="kick"><i className="fas fa-times" /></Button>
                </div>
              ))
}
        />
      </div>
      <div className="event-memeber-list">
        <PaginatedContainer
          title="members"
          perPage={10}
          items={eventMembers.users}
          render={
            eventMembers.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((ev) => (
                <div key={ev.username} className="user-card">
                  <span className="username">{ev.username}</span>
                  <Button clicked={() => promoteUserToAdmin(ev.id)} classes="admin"><i className="fas fa-star" /></Button>
                  <Button clicked={() => kickUser(ev.id)} classes="kick"><i className="fas fa-times" /></Button>
                </div>
              ))
}
        />
      </div>
    </div>
  );
};

EventInfoContainer.propTypes = {
  eventId: PropTypes.string.isRequired,
  removeEventFromList: PropTypes.func.isRequired,
};


export default EventInfoContainer;
