import { authHeader, handleResponse } from "../helper";

const serverURL = "http://localhost:8081"

const getCurrentUserInfo = () => {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${serverURL}/user`, requestOptions).then(
        handleResponse
    );
};



const changeAvatar = avatarUrl => {
    const requestOptions = {
        method: "PUT",
        headers: authHeader()
    };

    return fetch(`${serverURL}/user/changePhoto?url=${avatarUrl}`, requestOptions).then(
        handleResponse
    );
};


const getAllUserEvents = () => {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${serverURL}/user/event`, requestOptions).then(
        handleResponse
    );
};

const getEventInvitations = () => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/user/event_invitations`, requestOptions).then(handleResponse);
}


export const profileService = {
    getCurrentUserInfo,
    changeAvatar,
    getAllUserEvents,
    getEventInvitations
}