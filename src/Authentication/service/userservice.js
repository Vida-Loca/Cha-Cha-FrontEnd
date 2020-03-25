import { authHeader, handleResponse } from "../helper";
const serverURL = "http://localhost:8081"

// eslint-disable-next-line import/prefer-default-export


// const addNewSuplyToEvent = (eventId, data) => {
//   const requestOptions = {
//     method: "POST",
//     headers: authHeader(),
//     body: JSON.stringify(data)
//   };

//   return fetch(
//     `https://skibidi.herokuapp.com/event/${eventId}/productNew`,
//     requestOptions
//   ).then(handleResponse);
// };


// const isUserAdminOfGivenEvent = id => {
//   const requestOptions = { method: "GET", headers: authHeader() };
//   return fetch(
//     `https://skibidi.herokuapp.com/event/${id}/isAdmin`,
//     requestOptions
//   ).then(handleResponse);
// };


// const getAllUsersFromGivenEvent = id => {
//   const requestOptions = { method: "GET", headers: authHeader() };
//   return fetch(
//     `https://skibidi.herokuapp.com/event/${id}/user`,
//     requestOptions
//   ).then(handleResponse);
// };

// const getAllProductsFromGivenEvent = id => {
//   const requestOptions = { method: "GET", headers: authHeader() };
//   return fetch(
//     `https://skibidi.herokuapp.com/event/${id}/product`,
//     requestOptions
//   ).then(handleResponse);
// };

// const inviteUserTOEvent = (id, username) => {
//   const requestOptions = { method: "POSt", headers: authHeader() };
//   return fetch(
//     `https://skibidi.herokuapp.com/event/${id}/user?username=${username}`,
//     requestOptions
//   ).then(handleResponse);
// };

// const kickUserTOEvent = (id, userId) => {
//   const requestOptions = { method: "DELETE", headers: authHeader() };

//   return fetch(
//     `https://skibidi.herokuapp.com/event/${id}/user?userToDeleteId=${userId}`,
//     requestOptions
//   ).then(handleResponse);
// };


// function getAllEventsOfCureentlyLogedInUser() {
//   const requestOptions = { method: "GET", headers: authHeader() };
//   return fetch(`https://skibidi.herokuapp.com/user/event`, requestOptions).then(
//     handleResponse
//   );
// }

const getAllUsers = () => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${serverURL}/user`, requestOptions).then(handleResponse);
}

export const userService = {
  getAllUsers
};
