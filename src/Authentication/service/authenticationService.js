import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../helper";

// const currentUserSubject = new BehaviorSubject(
//   JSON.parse(localStorage.getItem("currentUser"))
// );

function login(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`http://localhost:8081/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user.token));

      return user;
    });
}

const register = data => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`http://localhost:8081/user/registration`, requestOptions)
    .then(handleResponse)
    .then(myJson => {
      return myJson;
    });
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  //   currentUserSubject.next(null);
}

// eslint-disable-next-line import/prefer-default-export
export const authenticationService = {
  login,
  register,
  logout
  //   currentUser: currentUserSubject.asObservable(),
  //   get currentUserValue() {
  //     return currentUserSubject.value;
  //   }
};
