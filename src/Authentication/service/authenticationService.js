import { handleResponse } from "../helper";

const CurrentUser = () => {
  return localStorage.getItem("currentUser");
};

function login(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(`https://skibidi.herokuapp.com/login`, requestOptions)
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

  return fetch(`https://skibidi.herokuapp.com/registration`, requestOptions)
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
  CurrentUser,
  login,
  register,
  logout
};
