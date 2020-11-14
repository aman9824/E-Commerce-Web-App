import {API} from "../Config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
    let url = API + "/products?sortBy=" + sortBy + "&order=desc&limit=8";
    return fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getCategories = () => {
    let url = API + "/categories";
    return fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    let url = API + "/products/by/search";
    const data ={
        limit, skip, filters
    };
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const list = (params) => {
    let query = queryString.stringify(params);
    console.log('query',query);
    let url = API + "/products/search?"+query;
    return fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const read = (productId) => {
    let url = API + "/product/" + productId;
    return fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const listRelated = (productId) => {
    let url = API + "/products/related/" + productId;
    return fetch(url, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getBraintreeClientToken = (userId, token) => {
    let url = API + "/braintree/getToken/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const processPayment = (userId, token, paymentData) => {
    let url = API + "/braintree/payment/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const createOrder = (userId, token, createOrderData) => {
    let url = API + "/order/create/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        },
        body: JSON.stringify({order: createOrderData})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};