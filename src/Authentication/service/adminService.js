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


const isLoggedInUserAdmin = () => {
    const requestOptions = {method: "GET",headers: authHeader()};
    return fetch(`${serverURL}/user/isAdmin`, requestOptions).then(
        handleResponse
    );
};

export const adminService = {
    deleteUser,
    getAllUsers,
    grantUserAdmin,
    isLoggedInUserAdmin,
    banUserByID,
    getAllAdmins
}