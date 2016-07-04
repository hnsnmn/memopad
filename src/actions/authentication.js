import axios from 'axios';

import { AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGOUT,
    AUTH_LOGOUT_SUCCESS,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE
} from './ActionTypes';


/*
    LOGIN
*/
export function login() {
    // informs that the API call is starting
    return {
        type: AUTH_LOGIN
    };
}

export function loginRequest(username, password) {
    return (dispatch) => {

        // API is starting..
        dispatch(login());

        // REQUEST
        return axios.post('/api/account/signin', {
            username,
            password
        }).then((response) => {
            // SUCCEED
            console.log(response);
            return dispatch(loginSuccess(username));
        }).catch((error) => {
            // FAILED
            console.log(error);
            return dispatch(loginFailure(error.data.code));
        });
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure(error) {
    return {
        type: AUTH_LOGIN_FAILURE,
        error
    };
}

/*
    REGISTER
*/
export function register() {
    // informs that the API call is starting
    return {
        type: AUTH_REGISTER
    };
}

export function registerRequest(username, password) {
    return (dispatch) => {

        // API is starting
        dispatch(register());

        // REQUEST
        return axios.post('/api/account/signup', {
            username, password
        }).then((response) => {
            console.log(response);
            return dispatch(registerSuccess(username));
        }).catch((error) => {
            console.log(error);
            return dispatch(registerFailure(error.data.code));
        });
    };
}

export function registerSuccess(username) {
    return {
        type: AUTH_REGISTER_SUCCESS,
        username
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}



/*
    LOGOUT
*/

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            return dispatch(logout());
        });
    };
}

/*
    GET STATUS
*/

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        // notify API is starting
        // set currentUser
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
        .then((response) => {
            return dispatch(getStatusSuccess(response.data.info.username));
        }).catch((error) => {
            return dispatch(getStatusFailure());
        });
    };
}

export function getStatusSuccess(username){
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}
