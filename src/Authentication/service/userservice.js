import { authHeader, handleResponse } from "../helper";

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  getAll
};

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`https://skibidi.herokuapp.com/event`, requestOptions).then(
    handleResponse
  );
}
