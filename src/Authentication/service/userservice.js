import { authHeader, handleResponse } from "../helper";
const serverURL = process.env.REACT_APP_API_URL;



const getFriendsList = () => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${serverURL}/user/friends`, requestOptions).then(handleResponse);
}
const getFriendRequestList = () => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${serverURL}/user/invitations`, requestOptions).then(handleResponse);
}
const getUsersByRegex = (regex) => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${serverURL}/users_contains?regex=${regex}`, requestOptions).then(handleResponse);
}
const inviteUserByID = (id) => {
  const requestOptions = { method: "POST", headers: authHeader() };
  return fetch(`${serverURL}/user/invite?invitedId=${id}`, requestOptions).then(handleResponse);
}
const acceptInvite = (invitationID) => {
  const requestOptions = { method: "PUT", headers: authHeader() };
  return fetch(`${serverURL}/user/accept?invitationId=${invitationID}`, requestOptions).then(handleResponse);
}
const rejectInvite = (invitationID) => {
  const requestOptions = { method: "PUT", headers: authHeader() };
  return fetch(`${serverURL}/user/reject?invitationId=${invitationID}`, requestOptions).then(handleResponse);
}
const removeFromFriends = (Userid) => {
  const requestOptions = { method: "PUT", headers: authHeader() };
  return fetch(`${serverURL}/user/remove?userToRemoveId=${Userid}`, requestOptions).then(handleResponse);
}
const cancelFriendInvitation = (invitationID) => {
  const requestOptions = { method: "PUT", headers: authHeader() };
  return fetch(`${serverURL}/user/cancel?invitationId=${invitationID}`, requestOptions).then(handleResponse);
}


export const userService = {
  inviteUserByID,
  getFriendsList,
  getUsersByRegex,
  getFriendRequestList,
  acceptInvite,
  rejectInvite,
  removeFromFriends,
  cancelFriendInvitation
};
