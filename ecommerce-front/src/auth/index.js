import {API} from "../Config";

export const signup = (user) => {
    //console.log(name, email, password);
    let url = API + '/signup';
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
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

export const signin = (user) => {
    //console.log(name, email, password);
    let url1 = API + '/signin';
    return fetch(url1, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
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

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    let url2 = API + '/signout';
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(url2, {
            method: 'GET'
        })
        .then(response => {
            console.log('signout', response);
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};