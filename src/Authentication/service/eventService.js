import { authHeader, handleResponse } from "../helper";

const serverURL = process.env.REACT_APP_API_URL;

const createEvent = (eventData) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(eventData)
    };
    return fetch(`${serverURL}/event`, requestOptions).then(handleResponse);
};

const getAllEvents = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event`, requestOptions).then(handleResponse);
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





export const eventService = {
    createEvent,
    getAllEvents,
    getEventByID,
    updateEvent,
    deleteEvent
}