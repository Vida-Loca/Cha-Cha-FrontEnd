import { authHeader, handleResponse } from "../helper";

const serverURL = "http://localhost:8081"

const createEvent = (eventData) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(eventData)
    };

    return fetch(`${serverURL}/event`, requestOptions).then(
        handleResponse
    );
};



export const eventService = {
    createEvent
}