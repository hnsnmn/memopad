import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: '',
        error: -1
    },
    list: {
        status: '',
        error: undefined,
        data: [],
        dataMap: [],
        isLast: false
    },
    remove: {
        status: '',
        error: undefined
    }
};

export default function memo(state, action) {
    if(typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        /* MEMO_POST */
        case types.MEMO_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: '-1' }
                }
            });
        case types.MEMO_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.MEMO_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'ERROR' },
                    error: { $set: action.error }
                }
            });

        /* MEMO_LIST */
        case types.MEMO_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: undefined }
                }
            });
        case types.MEMO_LIST_SUCCESS:
            let map = action.data.map(
                (memo) => {
                    return memo._id;
                }
            );

            if(action.isInitial) {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        dataMap: { $set: map },
                        isLast: { $set: action.data.length < 6 }
                    }
                });
            } else {
                if(action.listType === 'old' ) {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $push: action.data },
                            dataMap: { $push: map },
                            isLast: { $set: (action.data.length < 6)}
                        }
                    });
                } else {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $unshift: action.data },
                            dataMap: { $push: map }
                        }
                    });
                }
            }
            return state;

        case types.MEMO_REMOVE:
            return state;
        case types.MEMO_REMOVE_SUCCESS:
            return state;
        case types.MEMO_REMOVE_FAILURE:
            return state;
        default:
            return state;
    }
}
