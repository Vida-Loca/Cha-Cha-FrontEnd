import { authHeader, handleResponse } from "../helper";

const serverURL = process.env.REACT_APP_API_URL;

const getAllUsers = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/getAllUsers`, requestOptions).then(handleResponse);
}
const getAllAdmins = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/getAllAdmins`, requestOptions).then(handleResponse);
}
const getEventById = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}`, requestOptions).then(handleResponse);
}
const grantUserAdmin = (id) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/admin/user/${id}/grantAdmin`, requestOptions).then(handleResponse);
}
const banUserByID = (id) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/admin/user/${id}/banishUser`, requestOptions).then(handleResponse);
}
const deleteUser = (id) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/admin/user/${id}`, requestOptions).then(handleResponse);
}
const deleteEvent = (eventId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}`, requestOptions).then(handleResponse);
}
const removeUserFromEvent = (eventId, userId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}/user?userToDeleteId=${userId}`, requestOptions).then(handleResponse);
}

const getAllEventUsers = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}/users`, requestOptions).then(handleResponse);
}
const getAllEventAdmins = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}/admins`, requestOptions).then(handleResponse);
}

const isLoggedInUserAdmin = () => {
    const requestOptions = {method: "GET",headers: authHeader()};
    return fetch(`${serverURL}/user/isAdmin`, requestOptions).then(
        handleResponse
    );
};

const giveTakeUserAdmin = (eventId, userId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/admin/event/${eventId}/user/${userId}/eventAdmin`, requestOptions).then(handleResponse);
}

export const adminService = {
    deleteUser,
    getAllUsers,
    grantUserAdmin,
    isLoggedInUserAdmin,
    banUserByID,
    getAllAdmins,
    deleteEvent,
    getEventById,
    getAllEventUsers,
    giveTakeUserAdmin,
    removeUserFromEvent,
    getAllEventAdmins
}