import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../helper";
import { UserContext } from "../../context/UserContext";

// const currentUserSubject = new BehaviorSubject(
//   JSON.parse(localStorage.getItem("currentUser"))
// );

function login(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`http://localhost:8080/register`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      //   currentUserSubject.next(user);

      console.log(user);
      //   return user;
    });
}

const register = data => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  fetch(`http://localhost:8080/register`, requestOptions)
    .then(handleResponse)
    .then(myJson => {
      console.log(myJson);
      //   return myJson;
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
