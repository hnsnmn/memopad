import { SEARCH_TOGGLE,
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from 'actions/ActionTypes';

import axios from 'axios';

export function searchToggle() {
    return {
        type: SEARCH_TOGGLE
    };
}


export function searchRequest(username) {
    return (dispatch) => {
        dispatch(search);

        if(username==='') {
            return new Promise((resolve, reject)=> {
                dispatch(searchSuccess([]));
                resolve();
            });
        }

        return axios.get('/api/account/search/' + username)
        .then(
            (response) => {
                dispatch(searchSuccess(response.data));
            }
        ).catch(
            (error) => {
                dispatch(searchError());
            }
        );


    };
}

export function search() {
    return {
        type: SEARCH
    };
}

export function searchSuccess(usernames) {
    return {
        type: SEARCH_SUCCESS,
        usernames
    };
}

export function searchError() {
    return {
        type: SEARCH_FAILURE
    };
}
