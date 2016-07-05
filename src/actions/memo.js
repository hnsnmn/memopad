import axios from 'axios';

import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_SUCCESS,
    MEMO_LIST_FAILURE
} from './ActionTypes';


/* MEMO POST */

export function memoPostRequest(contents) {
    return (dispatch) => {

        dispatch(memoPost());

        return axios.post('/api/memo/', {
            contents: contents
        }).then((response) => {
            return dispatch(memoPostSuccess());
        }).catch((error) => {
            return dispatch(memoPostFailure(error.data.code));
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


/* MEMO LIST */

export function memoListRequest(isInitial, listType, id){
    return (dispatch) => {

        dispatch(memoList());

        let url = '/api/memo/list';

        url = isInitial ? url : url + '/' + listType + '/' + id;

        return axios.get(url)
        .then((response) => {
            return dispatch(memoListSuccess(response.data, isInitial, listType));
        }).catch((error) => {
            return dispatch(memoListFailure(error));
        });
    };
}

export function memoList() {
    return {
        type: MEMO_LIST
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function memoListFailure(error) {
    return {
        type: MEMO_LIST_FAILURE,
        error
    };
}
