import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    show: false
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
        default:
            return state;
    }
}
