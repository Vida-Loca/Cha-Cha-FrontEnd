/* eslint-disable no-undef */
import { BehaviorSubject } from "rxjs";
// eslint-disable-next-line import/no-cycle
import { handleResponse } from "../helper";

const ServerURL = process.env.REACT_APP_API_URL;


// eslint-disable-next-line no-undef
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));


const login = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${ServerURL}/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user.token));
      currentUserSubject.next(user);

      return user;
    });
};

const register = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${ServerURL}/registration`, requestOptions)
    .then(handleResponse)
    .then((myJson) => myJson);
};

const registerConfirmation = (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${ServerURL}/registrationConfirm?token=${token}`, requestOptions)
    .then(handleResponse)
    .then((myJson) => myJson);
};
const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
};

// eslint-disable-next-line import/prefer-default-export
export const authenticationService = {
  // CurrentUser,
  login,
  register,
  logout,
  registerConfirmation,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value; },
};
