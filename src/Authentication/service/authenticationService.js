import { handleResponse } from "../helper";
import { BehaviorSubject } from 'rxjs';

const ServerURL = process.env.REACT_APP_API_URL;

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const login = data => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`${ServerURL}/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("currentUser", JSON.stringify(user.token));
      currentUserSubject.next(user);
      return user;
    });
}

const register = data => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`${ServerURL}/registration`, requestOptions)
    .then(handleResponse)
    .then(myJson => {
      return myJson;
    });
};
const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

// eslint-disable-next-line import/prefer-default-export
export const authenticationService = {
  // CurrentUser,
  login,
  register,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value }
};
