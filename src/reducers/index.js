import * as types from 'actions/ActionTypes';

const initialState = {
    loginResponse: null,
    registerResponse: null,
    currentUser: ''
};

export default function authentication(state, action) {
    if(typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        case types.AUTH_LOGIN_RCV:
            console.log(action.response);
            return Object.assign({}, state, {
                loginResponse: action.response
            });
        default:
            return state;
    }
}
