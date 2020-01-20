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

const getCurrentUserInfo = data => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data)
  };

  return fetch(`https://skibidi.herokuapp.com/event`, requestOptions).then(
    handleResponse
  );
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
  getCurrentUserInfo
};
