import axios from 'axios';

import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';


/* MEMO POST */

export function memoPostRequest(contents) {
    return (dispatch) => {

        dispatch(memoPost());

        return axios.post('/api/memo/', {
            contents: contents
        }).then((response) => {
            console.log(response);
            return dispatch(memoPostSuccess());
        }).catch((error) => {
            console.log(error);
            return dispatch(loginFailure(error.data.code));
        });
    };
}

export function memoPost() {
    return {
        type: MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}
