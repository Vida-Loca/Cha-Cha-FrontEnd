import { handleResponse } from "../helper";

const ServerURL = "http://localhost:8081";

const CurrentUser = () => {
  return localStorage.getItem("currentUser");
};

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

      return user;
    });
}

// const login = data => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   };

//   return fetch(`${ServerURL}/login`, requestOptions)
//     .then(res => res.json())
//     .then(user => {
//       if (user.token !== undefined) {
//         localStorage.setItem("currentUser", JSON.stringify(user.token));
//       }
//       return user;
//     });
// }

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
  //   currentUserSubject.next(null);
}

// eslint-disable-next-line import/prefer-default-export
export const authenticationService = {
  CurrentUser,
  login,
  register,
  logout
};
