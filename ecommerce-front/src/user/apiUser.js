import {API} from "../Config";

export const read = (userId, token) => {
    let url = API + "/user/" + userId;
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

export const update = (userId, token, user) => {
    let url = API + "/user/" + userId;
    let tokenUrl = 'Bearer ' + token;
    return fetch(url, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenUrl
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const updateUser = (user, next) => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const getPurchaseHistory = (userId, token) => {
    let url = API + "/orders/by/user/" + userId;
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