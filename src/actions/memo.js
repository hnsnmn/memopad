import axios from 'axios';

import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_SUCCESS,
    MEMO_LIST_FAILURE,
    MEMO_REMOVE,
    MEMO_REMOVE_SUCCESS,
    MEMO_REMOVE_FAILURE,
    MEMO_REMOVE_FROM_DATA,
    MEMO_EDIT,
    MEMO_EDIT_SUCCESS,
    MEMO_EDIT_FAILURE,
    MEMO_STAR,
    MEMO_STAR_SUCCESS,
    MEMO_STAR_FAILURE,
    MEMO_CLEAR
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

export function memoListRequest(isInitial, listType, id, user){
    return (dispatch) => {

        dispatch(memoList());

        let url = '/api/memo/list';

        if(typeof user === 'undefined')
            url = isInitial ? url : url + '/' + listType + '/' + id;
        else
            url = isInitial ? url + '/' + user : url + '/' + listType + '/' + user + '/' + id;


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


export function memoRemoveRequest(id) {
    return (dispatch) => {
        dispatch(memoRemove(id));
        return axios.delete('/api/memo/' + id).then(
            (response) => {
                return dispatch(memoRemoveSuccess(id));
            }
        ).catch(
            (error) => {
                return dispatch(memoRemoveFailure(error.data.code));
            }
        );
    };
}

export function memoRemove() {
    return {
        type: MEMO_REMOVE
    };
}

export function memoRemoveSuccess(id, memoPos) {
    return {
        type: MEMO_REMOVE_SUCCESS,
        id,
        memoPos
    };
}

export function memoRemoveFailure(error) {
    return {
        type: MEMO_REMOVE_FAILURE,
        error
    };
}

/* SEPARATED, BECAUSE WHEN MEMO IS REMOVED FROM MEMOREMOVE,
  COMPONENT CANNOT CHECK WHETHER THE REQUEST HAS SUCCEED OR NOT
  SINCE IT UNMOUNTS AS THE DATA GETS REMOVED FROM THE STATE */
export function memoRemoveFromData(id) {
    return {
        type: MEMO_REMOVE_FROM_DATA,
        id
    };
}


/* EDIT */
export function memoEditRequest(id, contents) {
    return (dispatch) => {
        return axios.put('/api/memo/' + id, {
            contents
        }).then(
            (response) => {
                dispatch(memoEditSuccess(id, response.data.memo));
            }
        ).catch(
            (error) => {
                dispatch(memoEditFailure(error.data.code));
            }
        );
    };
}

export function memoEdit() {
    return {
        type: MEMO_EDIT
    };
}

export function memoEditSuccess(id, memo) {
    return {
        type: MEMO_EDIT_SUCCESS,
        id,
        memo
    };
}

export function memoEditFailure(error) {
    return {
        type: MEMO_EDIT_FAILURE,
        error
    };
}

/* STAR */

export function memoStarRequest(id) {
    return (dispatch) => {
        dispatch(memoStar());

        return axios.post('/api/memo/star/' + id).then(
            (response) => {
                dispatch(memoStarSuccess(id, response.data.memo));
            }
        ).catch(
            (error) => {
                dispatch(memoStarFailure(error.data.code));
            }
        );

    };
}

export function memoStar() {
    return {
        type: MEMO_STAR
    };
}

export function memoStarSuccess(id, memo) {
    return {
        type: MEMO_STAR_SUCCESS,
        id,
        memo
    };
}

export function memoStarFailure(error) {
    return {
        type: MEMO_STAR_FAILURE,
        error
    };
}

export function memoClear() {
    return {
        type: MEMO_CLEAR
    };
}
