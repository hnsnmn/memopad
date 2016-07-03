import axios from 'axios';

import { AUTH_LOGIN,
    AUTH_LOGIN_RCV,
    AUTH_REGISTER,
    AUTH_REGISTER_RCV } from './ActionTypes';

export function login(username, password) {
    return (dispatch) => {
        return axios.post('/api/account/signin', {
            username,
            password
        }).then((response) => {
            return dispatch(loginReceived(response));
        }).catch((error) => {
            return dispatch(loginReceived(error));
        });
    };
}

export function loginReceived(response) {
    return {
        type: AUTH_LOGIN_RCV,
        response
    };
}

export function register() {

}

export function registerReceived(response) {

}
