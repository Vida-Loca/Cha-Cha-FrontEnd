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

const removeProduct = (id, productId) => {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    return fetch(`${serverURL}/event/${id}/product?productToDeleteId=${productId}`, requestOptions).then(handleResponse);
}



export const productService = {
    addProduct,
    getProductsFromEvent,
    removeProduct
}