
import * as types from 'actions/ActionTypes';

const initialState = {
    post: {
        status: '',
        error: -1
    }
};

export default function memo(state, action) {
    if(typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        case types.MEMO_POST:
            return state;
        case types.MEMO_POST_SUCCESS:
            return state;
        case types.MEMO_POST_FAILURE:
            return state;
        default:
            return state;
    }
}
