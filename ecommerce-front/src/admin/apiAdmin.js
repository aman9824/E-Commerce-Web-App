import {API} from "../Config";


export const createCategory = (userId, token, category) => {
    let url = API + "/category/create/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
    let url = API + "/product/create/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: tokenUrl
        },
        body: product
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
    .catch(err => {
        console.log(err);
    });
};

export const listOrders = (userId, token) => {
    let url = API + "/order/list/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
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

export const getStatusValues = (userId, token) => {
    let url = API + "/order/status-values/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
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

export const updateOrderStatus = (userId, token, orderId, status) => {
    let url = API + "/order/" + orderId + "/status/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

//to perform crud on products : get all Products,
// get single products, update the products and delete single products

export const getProducts = () => {
    let url = API + "/products?limit=100";
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

export const deleteProduct = (productId, userId, token) => {
    let url = API + "/product/" + productId + "/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "DELETE",
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

export const getProduct = (productId) => {
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

export const updateProduct = (productId, userId, token, product) => {
    let url = API + "/product/" + productId + '/' + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: tokenUrl
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};