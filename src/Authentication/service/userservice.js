import { authHeader, handleResponse } from "../helper";

// eslint-disable-next-line import/prefer-default-export

const createNewEvent = data => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data)
  };

  return fetch(`https://skibidi.herokuapp.com/event`, requestOptions).then(
    handleResponse
  );
};

const addNewSuplyToEvent = (eventId, data) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data)
  };

  return fetch(
    `https://skibidi.herokuapp.com/event/${eventId}/productNew`,
    requestOptions
  ).then(handleResponse);
};

const getCurrentUserInfo = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`https://skibidi.herokuapp.com/user`, requestOptions).then(
    handleResponse
  );
};

const getEventById = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}`,
    requestOptions
  ).then(handleResponse);
};

const isUserAdminOfGivenEvent = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/isAdmin`,
    requestOptions
  ).then(handleResponse);
};

const isUserAdmin = () => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/user/isAdmin`,
    requestOptions
  ).then(handleResponse);
};

const getAllUsersFromGivenEvent = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/user`,
    requestOptions
  ).then(handleResponse);
};

const getAllProductsFromGivenEvent = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/product`,
    requestOptions
  ).then(handleResponse);
};

const inviteUserTOEvent = (id, username) => {
  const requestOptions = { method: "POSt", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/user?username=${username}`,
    requestOptions
  ).then(handleResponse);
};

const kickUserTOEvent = (id, userId) => {
  const requestOptions = { method: "DELETE", headers: authHeader() };

  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/user?userToDeleteId=${userId}`,
    requestOptions
  ).then(handleResponse);
};

function getAllEvents() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`https://skibidi.herokuapp.com/event`, requestOptions).then(
    handleResponse
  );
}

function getAllEventsOfCureentlyLogedInUser() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`https://skibidi.herokuapp.com/user/event`, requestOptions).then(
    handleResponse
  );
}

export const userService = {
  createNewEvent,
  getAllEvents,
  getCurrentUserInfo,
  getEventById,
  getAllUsersFromGivenEvent,
  inviteUserTOEvent,
  kickUserTOEvent,
  addNewSuplyToEvent,
  isUserAdminOfGivenEvent,
  getAllProductsFromGivenEvent,
  getAllEventsOfCureentlyLogedInUser,
  isUserAdmin
};
