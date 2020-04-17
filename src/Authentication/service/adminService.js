import { authHeader, handleResponse } from "../helper";

const serverURL = process.env.REACT_APP_API_URL;

const getAllUsers = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/admin/getAllUsers`, requestOptions).then(handleResponse);
}
const grantUserAdmin = (id) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/admin/grantUserAdmin/${id}`, requestOptions).then(handleResponse);
}
const deleteUser = (id) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/admin/deleteUser/${id}`, requestOptions).then(handleResponse);
}
const isLoggedInUserAdmin = () => {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${serverURL}/user/isAdmin`, requestOptions).then(
        handleResponse
    );
};

export const adminService = {
    deleteUser,
    getAllUsers,
    grantUserAdmin,
    isLoggedInUserAdmin
}