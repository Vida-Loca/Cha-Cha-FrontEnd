import { authHeader, handleResponse } from "../helper";

const serverURL = process.env.REACT_APP_API_URL;


const makeAComment = (eventId, content) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(content)
    };
    return fetch(`${serverURL}/event/${eventId}/forum`, requestOptions).then(handleResponse);
};

const editComment = (postId, content) => {
    const requestOptions = {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(content)
    };
    return fetch(`${serverURL}/event/forum/${postId}`, requestOptions).then(handleResponse);
};

const getAllCommentsFromAnEvent = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/forum`, requestOptions).then(handleResponse);
}

const deleteComment = (postId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/forum/${postId}`, requestOptions).then(handleResponse);
}

const likeAComent = (postId) => {
    const requestOptions = { method: "PUT", headers: authHeader() };
    return fetch(`${serverURL}/event/forum/${postId}/like`, requestOptions).then(handleResponse);
}


export const forumService = {
    makeAComment,
    getAllCommentsFromAnEvent,
    editComment,
    deleteComment,
    likeAComent
}