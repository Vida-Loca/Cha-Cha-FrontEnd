import { authHeader, handleResponse } from "../helper";

const serverURL = process.env.REACT_APP_API_URL;


const addProduct = (id, product) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(product)
    };
    return fetch(`${serverURL}/event/${id}/productNew`, requestOptions).then(handleResponse);
};

const getProductsFromEvent = (id) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}/product`, requestOptions).then(handleResponse);
}

const updateProduct = (eventId, productId, updatedProduct) => {
    const requestOptions = {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(updatedProduct)
    };
    return fetch(`${serverURL}/event/${eventId}/product/${productId}`, requestOptions).then(handleResponse);
}

const removeProduct = (eventId, productId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/product?productToDeleteId=${productId}`, requestOptions).then(handleResponse);
}


const getProductsOfCurrentUser = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/myproducts`, requestOptions).then(handleResponse);
}

const getTotalEventAmount = (eventId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/amount`, requestOptions).then(handleResponse);
}

const getUserExpenses = (eventId,userId) => {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${serverURL}/event/${eventId}/user/${userId}/amount`, requestOptions).then(handleResponse);
}



export const productService = {
    addProduct,
    getProductsFromEvent,
    removeProduct,
    updateProduct,
    getProductsOfCurrentUser,
    getTotalEventAmount,
    getUserExpenses
}