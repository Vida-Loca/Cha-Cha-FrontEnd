import { authHeader, handleResponse } from "../helper";

const serverURL = "http://localhost:8081"

const createEvent = (eventData) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(eventData)
    };
    return fetch(`${serverURL}/event`, requestOptions).then(handleResponse);
};

const joinEvent = (id) => {
    const requestOptions = { method: "POST", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}/join`, requestOptions).then(handleResponse);
}

const getAllEvents = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event`, requestOptions).then(handleResponse);
}
const getAllPublicEvents = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/public`, requestOptions).then(handleResponse);
}

const getEventByID = (id) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}`, requestOptions).then(handleResponse);
}

const updateEvent = (id, updatedData) => {
    const requestOptions = {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(updatedData)
    };
    return fetch(`${serverURL}/event/${id}`, requestOptions).then(handleResponse);
};

const deleteEvent = (id) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}`, requestOptions).then(handleResponse);
}

const getEventPendingInvitations = (id) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}/invitations`, requestOptions).then(handleResponse);
}


const inviteUserToAnEvent = (eventId, userId) => {
    const requestOptions = { method: "POST", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/invite?userId=${userId}`, requestOptions).then(handleResponse);
}

const getEventMembers = (id) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}/users`, requestOptions).then(handleResponse);
}

const acceptEventInvitation = (invitationId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/event/invite/${invitationId}/accept`, requestOptions).then(handleResponse);
}
const rejectEventInvitation = (invitationId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/event/invite/${invitationId}/reject`, requestOptions).then(handleResponse);
}

const getAllEventsRequests = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/requests`, requestOptions).then(handleResponse);
}
const sendRequestToJoinEvent = (eventId) => {
    const requestOptions = { method: "POST", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/send_request`, requestOptions).then(handleResponse);
}

const acceptRequest = (requestId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/event/request/${requestId}/accept`, requestOptions).then(handleResponse);
}

const rejectRequest = (requestId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/event/request/${requestId}/reject`, requestOptions).then(handleResponse);
}

const kickUserFromEvent = (eventId, userId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/user?userToDeleteId=${userId}`, requestOptions).then(handleResponse);
}




const isCurrentUserAdminOfEvent = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/isAdmin`, requestOptions).then(handleResponse);
}

const leaveEvent = (eventId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/leave`, requestOptions).then(handleResponse);
}

export const eventService = {
    getAllPublicEvents,
    getAllEvents,
    createEvent,
    getEventByID,
    updateEvent,
    deleteEvent,
    joinEvent,
    getEventPendingInvitations,
    inviteUserToAnEvent,
    getEventMembers,
    acceptEventInvitation,
    rejectEventInvitation,
    getAllEventsRequests,
    sendRequestToJoinEvent,
    acceptRequest,
    rejectRequest,
    kickUserFromEvent,
    isCurrentUserAdminOfEvent,
    leaveEvent
}