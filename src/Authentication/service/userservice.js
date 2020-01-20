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

const getCurrentUserInfo = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    `https://skibidi.herokuapp.com/currentUser`,
    requestOptions
  ).then(handleResponse);
};

const getEventById = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}`,
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

const inviteUserTOEvent = (id, username) => {
  const requestOptions = { method: "POSt", headers: authHeader() };
  return fetch(
    `https://skibidi.herokuapp.com/event/${id}/user?username=${username}`,
    requestOptions
  ).then(handleResponse);
};

function getAllEvents() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`https://skibidi.herokuapp.com/event`, requestOptions).then(
    handleResponse
  );
}

export const userService = {
  createNewEvent,
  getAllEvents,
  getCurrentUserInfo,
  getEventById,
  getAllUsersFromGivenEvent,
  inviteUserTOEvent
};
