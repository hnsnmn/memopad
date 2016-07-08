import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    show: false,
    status: '',
    usernames: []
};

export default function search(state, action) {
    if(typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        case types.SEARCH_TOGGLE:
            return update(state, {
                show: { $set: !state.show}
            });
        case types.SEARCH:
            return update(state, {
                status: { $set: 'WAITING' }
            });
        case types.SEARCH_SUCCESS:
            return update(state, {
                status: { $set: 'SUCCESS' },
                usernames: { $set: action.usernames }
            });
        case types.SEARCH_ERROR:
            return update(state, {
                status: { $set: 'ERROR' }
            });
        default:
            return state;
    }
}
